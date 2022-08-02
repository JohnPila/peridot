import { Divider, Grid, Skeleton, CardMedia, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { formatDate, formatTime } from '../../../utils/HelperUtils';
import Typography from '../../common/Typography';
import PackageDetailsOptionSkeleton from '../Admin/Packages/PackageDetailsOptionSkeleton';
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useMemo, useState } from 'react';
import { getCar } from '../../../services/CarRentalService';
import { STORAGE_FOLDERS } from '../../../utils/constants';
import { getImages } from '../../../services/FileService';
import { Box } from '@mui/system';
import { getRateOptions } from '../../../services/CarRentalOptionService';

function BookCarRentalReview(props) {
  const {
    info,
    data: {
      id,
      pickupDate,
      pickupTime,
      passengerCapacity,
      driverOption,
      rateOptions,
    },
  } = props;

  const navigate = useNavigate();
  const {id: carId} = useParams();
  const [data, setData] = useState(null);
  const totalCost = useMemo(() => data ? 
    data.rateOptions.reduce((acc, opt) => acc + (opt.quantity * opt.rate), 0) : 
    0 , [data]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getCar(carId).then(async (d) => {
      try {
        const options = await getRateOptions(carId);
        const optionsMap = options.reduce((acc, opt) => {
          acc[opt.id] = opt;
          return acc;
        }, {})
        d.rateOptions = rateOptions.map((opt) => ({
          ...optionsMap[opt.id],
          ...opt,
        }));
        const images = await getImages(d.id, STORAGE_FOLDERS.CAR_RENTALS);
        d.image = images.length > 0 ? images[0] : {
          url: "/images/peridotLogo.jpg",
          name: "Default image",
        };
        setData(d);
      } catch (error) {
        console.error("Failed to get car rental info.", error);
      }
    }).catch(() => navigate("/errors/404", {replace: true}));
  }, []);

  return (
    data ?
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
        Booking info {id}
      </Typography>
      <Box sx={{ display: 'flex', background: "none" }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={data.image.url}
          alt={data.image.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {data.make} {data.model}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div" sx={{mt: 0.5}}>
              {data.transmission} {data.fuel}
            </Typography>
          </CardContent>
        </Box>
      </Box>
      <Grid container sx={{mt: 2}}>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Passenger Capacity</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{passengerCapacity}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Driver Option</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{driverOption}</Typography>
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
          <Typography variant="body1" color="text.secondary">Pickup date & time</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{formatDate(pickupDate)} @ {formatTime(pickupTime)}</Typography>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Return date & time</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="body1">{formatDate(DateEnd)} @ {formatTime(TimeEnd)}</Typography>
        </Grid>
      </Grid> */}
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="body1" color="text.secondary">Options</Typography>
        </Grid>
        {data.rateOptions.map((opt, i) => (
          <Fragment key={i}>
            {i > 0 && <Grid item xs={2}/>}
            <Grid item xs={8} textAlign="right">
              <Typography variant="body1">{opt.quantity} x {opt.duration} (₱{opt.rate})</Typography>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Typography variant="body1">₱{opt.quantity * opt.rate}</Typography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <Divider sx={{mt: 3, mb: 2}}/>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="h6" color="text.secondary">Total</Typography>
        </Grid>
        <Grid item xs textAlign="right">
          <Typography variant="h6">₱{totalCost}</Typography>
        </Grid>
      </Grid>
    </> 
    : 
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

BookCarRentalReview.propTypes = {
  data: PropTypes.object,
  info: PropTypes.object,
};

export default BookCarRentalReview; 