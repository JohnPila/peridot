import { Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MapRoute from "../../common/MapRoute";
import Typography from '../../common/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SouthIcon from '@mui/icons-material/South';
import { getPlaceDetails } from '../../../services/LocationService';

function BookingDetailsAirportTransfer(props) {
  const {
    data,
    onRouteData,
  } = props;

  const [locationDetails, setLocationDetails] = useState(null);
  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const pickupData = await getPlaceDetails(data.pickupLocation);
    const dropoffData = await getPlaceDetails(data.dropoffLocation);
    setLocationDetails({
      pickup: pickupData.features[0],
      dropoff: dropoffData.features[0],
    });
  };

  return (
    <>
      <Grid item xs>
        {locationDetails ? 
          <>
            <Grid container>
              <Grid item xs={3} color="text.secondary">
                {data ? 
                  <Typography variant="body2">Pickup Location</Typography> :
                  <Skeleton animation="wave" width="100%" />  
                }
              </Grid>
              <Grid item xs={9} textAlign="right">
                {data ? 
                  locationDetails.pickup.properties.formatted :
                  <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />  
                }
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3} color="text.secondary">
                {data ? 
                  <Typography variant="body2">Dropoff Location</Typography> :
                  <Skeleton animation="wave" width="100%" />  
                }
              </Grid>
              <Grid item xs={9} textAlign="right">
                {data ? 
                  locationDetails.dropoff.properties.formatted :
                  <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />  
                }
              </Grid>
            </Grid>
          </> :
          <>
            <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
            <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
          </>
        }
      </Grid>
      <Grid item xs={12}>
        {locationDetails ?
          <MapRoute
            fromValue={locationDetails.pickup}
            toValue={locationDetails.dropoff}
            onChange={onRouteData}
          /> :
          <Skeleton sx={{ width: 120, height: 120 }} animation="wave" variant="rectangular" />
        }
      </Grid>
    </>
  );
}

BookingDetailsAirportTransfer.propTypes = {
  data: PropTypes.object.isRequired,
  onRouteData: PropTypes.func.isRequired,
};

export default BookingDetailsAirportTransfer;