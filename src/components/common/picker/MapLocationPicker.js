import { Autocomplete, CircularProgress, debounce, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { getPlaceDetails, searchPlacesByText } from '../../../services/LocationService';

const handleRenderOption = (option, data, { inputValue }) => {
  const matches = match(data.properties.formatted, inputValue);
  const parts = parse(data.properties.formatted, matches);

  const highlightStyle = {
    fontWeight: 700,
    backgroundColor: "lightyellow",
    padding: "5px 2px"
  };

  return (
    <div {...option} style={{padding: "10px 15px"}}>
      {parts.map((part, index) => (
        <span key={index} style={part.highlight ? highlightStyle : {}}>
          {part.text}
        </span>
      ))}
    </div>
  );
};

function MapLocationPicker(props) {
  const {
    value,
    onChange = () => {},
    otherProps,
  } = props;
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /* eslint-disable react-hooks/exhaustive-deps */
  const getLocationsDebounce = useCallback(debounce((text) => 
    getLocations(text), 200), []);

  useEffect(() => {
    if (value && typeof value === "string") {
      getLocationDetails(value);
    }
  }, [value]);

  const getLocations = async (text) => {
    try {
      setIsLoading(true);
      setOptions([]);
      const data = await searchPlacesByText(text);
      if (data?.features?.length > 0) {
        setOptions(data.features);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const getLocationDetails = async (placeId) => {
    try {
      setIsLoading(true);
      const data = await getPlaceDetails(placeId);
      if (data?.features?.length > 0) {
        onChange(data.features[0]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Autocomplete
      {...otherProps}
      fullWidth
      size="large"
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option?.properties?.place_id === value?.properties?.place_id}
      getOptionLabel={(option) => option?.properties?.formatted || ""}
      options={options}
      loading={isLoading}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        getLocationsDebounce(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={handleRenderOption}
    />
  );
}

MapLocationPicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  otherProps: PropTypes.object,
};
  
export default MapLocationPicker;