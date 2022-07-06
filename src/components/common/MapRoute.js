import PropTypes from 'prop-types';
import { memo, useEffect, useMemo } from 'react';
import maplibre from "maplibre-gl";
import GeoapifyConfig from '../../config/GeoapifyConfig';
import { getRoute } from '../../services/LocationService';

export function toLonLatArray(value) {
  return value ? [value.properties.lon, value.properties.lat] : null;
}

function setMarker(map, from, to) {
  if (from) {
    // calculate and display routing:
    // from 38.937165,-77.045590 (1208 Hourglass Drive, Stowe, VT 05672, United States of America)
    new maplibre.Marker().setLngLat(toLonLatArray(from))
      .setPopup(new maplibre.Popup().setText(from?.properties?.formatted)).addTo(map);
  }
  if (to) {
    // to 38.881152,-76.990693 (Switchback, Stowe, VT 05672-5111, United States of America)
    new maplibre.Marker().setLngLat(toLonLatArray(to))
      .setPopup(new maplibre.Popup().setText(to?.properties?.formatted)).addTo(map);
  }
}

function processRoute(map, routeData) {
  const popup = new maplibre.Popup();
  const instructions = [];
  let middleLonLat = [0, 0];

  routeData.features[0].properties.legs.forEach((leg, legIndex) => {
    const legGeometry = routeData.features[0].geometry.coordinates[legIndex];
    const middleStep = Math.floor(leg.steps.length / 2);
    leg.steps.forEach((step, index) => {
      if (step.instruction) {
        instructions.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": legGeometry[step.from_index]
          },
          properties: {
            text: step.instruction.text,
          },
        });

      }

      if (index === middleStep) {
        middleLonLat = legGeometry[step.from_index]
      }

      if (step.from_index === step.to_index) {
        // destination point
        return;
      }
    });
  });

  const instructionsData = {
    type: "FeatureCollection",
    features: instructions,
  }

  map.addSource('route', {
    type: 'geojson',
    data: routeData,
  });

  map.addSource('points', {
    type: 'geojson',
    data: instructionsData,
  });

  showPopup(map, new maplibre.Popup(), {
    Distance: `${routeData.features[0].properties.distance / 1000} km`,
    Time: `${routeData.features[0].properties.time / 60} m`,
  }, middleLonLat);
  addLayerEvents(map, popup);
  drawRoute(map, routeData, instructionsData);
}

function drawRoute(map, routeData, instructionsData) {
  if (!routeData) {
    return;
  }

  if (map.getLayer('route-layer')) {
    map.removeLayer('route-layer')
  }

  if (map.getLayer('points-layer')) {
    map.removeLayer('points-layer')
  }

  map.getSource('route').setData(routeData);
  map.addLayer({
    'id': 'route-layer',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': "round",
      'line-cap': "round"
    },
    'paint': {
      'line-color': [
        'match',
        ['get', 'road_class'],
        'motorway',
        '#009933',
        'trunk',
        '#00cc99',
        'primary',
        '#009999',
        'secondary',
        '#00ccff',
        'tertiary',
        '#9999ff',
        'residential',
        '#9933ff',
        'service_other',
        '#ffcc66',
        'unclassified',
        '#666699',
        /* other */
        '#666699'
      ],
      'line-width': 8
    }
  });

  map.getSource('points').setData(instructionsData);
  map.addLayer({
    'id': 'points-layer',
    'type': 'circle',
    'source': 'points',
    'paint': {
      'circle-radius': 4,
      'circle-color': "#fff",
      'circle-stroke-color': "#aaa",
      'circle-stroke-width': 1,
    }
  });
}

function addLayerEvents(map, popup) {
  map.on('mouseenter', 'route-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'route-layer', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseenter', 'points-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('click', 'route-layer', (e) => {
    showPopup(map, popup, {
      Distance: `${e.features[0].properties.distance / 1000} km`,
      Time: `${e.features[0].properties.time / 60} m`,
    }, e.lngLat);
    e.preventDefault();
  })

  map.on('click', 'points-layer', (e) => {
    const properties = e.features[0].properties;
    const point = e.features[0].geometry.coordinates;

    if (properties.text) {
      popup.setText(properties.text);
      popup.setLngLat(point);
      popup.addTo(map);
      e.preventDefault();
    }
  });
}

function showPopup(map, popup, data, lngLat) {
  let popupHtml = `<div style="padding: 0 15px 0 8px">${Object.keys(data).map(key => {
    return `<div class="popup-property-container">
    					<span class="popup-property-label">${key}: </span>
              <span class="popup-property-value"><b>${data[key]}</b></span>
            </div>`
  }).join('')}</div>`;

  popup.setLngLat(lngLat).setHTML(popupHtml).addTo(map);
}

function MapRoute(props) {
  const {
    fromValue: _fromValue,
    toValue: _toValue,
    onChange = () => {},
  } = props;

  let mapContainer;
  const fromValue = useMemo(() => typeof _fromValue === "object" ? _fromValue : null, [_fromValue]);
  const toValue = useMemo(() => typeof _toValue === "object" ? _toValue : null, [_toValue]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(async () => {
    if (!mapContainer) {
      return;
    }

    const myAPIKey = GeoapifyConfig.apiKey; 
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    const mapData = {
      container: mapContainer,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
    };
    if (fromValue && toValue) {
      const offset1 = fromValue.properties.lat < toValue.properties.lat ? -0.035 : 0.035;
      const offset2 = fromValue.properties.lat < toValue.properties.lat ? 0.035 : -0.035;
      mapData.bounds = new maplibre.LngLatBounds(new maplibre.LngLat(fromValue.properties.lon || 0, fromValue.properties.lat + offset1 || 0), 
        new maplibre.LngLat(toValue.properties.lon || 0, toValue.properties.lat + offset2 || 0));
    } else {
      const hasValue = fromValue || toValue;
      mapData.center = new maplibre.LngLat(hasValue?.properties?.lon || 0, hasValue?.properties?.lat || 0);
      mapData.zoom = !hasValue ? 0 : 12;
    }
    const map = new maplibre.Map(mapData);
    map.addControl(new maplibre.NavigationControl());
    if (fromValue || toValue) {
      setMarker(map, fromValue, toValue);
    }
    if (fromValue && toValue) {
      const routeData = await getRoute(toLonLatArray(fromValue), toLonLatArray(toValue));
      onChange(routeData);
      processRoute(map, routeData);
    } else {
      onChange(null);
    }
  }, [mapContainer, fromValue, toValue]);

  return (
    <div className="map-container" 
      ref={el => mapContainer = el}
      style={{width: "100%", height: "500px"}}>
    </div>
  )
}

MapRoute.propTypes = {
  fromValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  toValue: PropTypes.object,
  onChange: PropTypes.func,
};

export default memo(MapRoute);