import { Divider, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import GeoapifyConfig from '../../../config/GeoapifyConfig';
import { formatDate, formatTime } from '../../../utils/HelperUtils';
import MapRoute from '../../common/MapRoute';
import Typography from '../../common/Typography';
import PackageDetailsOptionSkeleton from '../Admin/Packages/PackageDetailsOptionSkeleton';

function BookAirportTransferReview(props) {
  const {
    info,
    data: {
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      routeData,
    },
  } = props;
  const totalCost = useMemo(() => routeData?.features?.length > 0 ? GeoapifyConfig.computeCost(
    routeData.features[0].properties.distance) : 0, [routeData]);

  return (routeData ?
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
        Booking info
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Pick-up location</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{pickupLocation?.properties?.formatted}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Drop-off location</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{dropoffLocation?.properties?.formatted}</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{mt: 2}}>
        <Grid item xs>
          <MapRoute
            routeData={routeData}
            fromValue={pickupLocation}
            toValue={dropoffLocation}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Personal info
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Full name</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{info.firstName} {info.lastName}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Phone number</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">+63{info.phoneNumber}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Address</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{info.address}</Typography>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Additional info
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Special requests</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{info.specialRequests}</Typography>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Summary
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Booking date & time</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{formatDate(pickupDate)} @ {formatTime(pickupTime)}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{mt: 3, mb: 2}}/>
      <Grid container>
        <Grid item xs={2}>
          <Typography color="text.secondary">Base fare</Typography>
        </Grid>
        <Grid item xs={10} textAlign="right">
          <Typography>₱{GeoapifyConfig.baseFare}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color="text.secondary">Fare by distance</Typography>
        </Grid>
        <Grid item xs={10} textAlign="right">
          <Typography>₱{GeoapifyConfig.farePerKilometer} x {routeData.features[0].properties.distance / 1000} km = ₱{Math.ceil(routeData.features[0].properties.distance / 1000) * GeoapifyConfig.farePerKilometer}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="h6" color="text.secondary">Total</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="h6">₱{totalCost}</Typography>
        </Grid>
      </Grid>
    </> : 
    <>
      <Skeleton animation="wave" height={40} width="40%" sx={{mb: 2}} />
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
        </Grid>
        <Grid item xs>
          <Skeleton height={35} animation="wave" width="80%" />
          <Skeleton height={30} animation="wave" width="40%" />
        </Grid>
      </Grid>
      <Divider sx={{mt: 3, mb: 2}}/>
      <PackageDetailsOptionSkeleton />
      <PackageDetailsOptionSkeleton />
      <PackageDetailsOptionSkeleton />
      <Divider sx={{mt: 3, mb: 2}}/>
      <PackageDetailsOptionSkeleton innerProps={{height: 35}}/>
    </>
  );
}

BookAirportTransferReview.propTypes = {
  data: PropTypes.object,
  info: PropTypes.object.isRequired,
};

export default BookAirportTransferReview; 