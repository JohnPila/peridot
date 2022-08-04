import { CardMedia, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../common/Typography';
import DriverIcon from '@mui/icons-material/BadgeSharp';
import { useEffect, useState } from 'react';
import { STORAGE_FOLDERS } from '../../../utils/constants';
// import { getPackage } from '../../../services/PackageService';
import { getImages } from '../../../services/FileService';
import { getCar } from '../../../services/CarRentalService';

function BookingDetailsCarRental(props) {
  const {
    data
  } = props;

  const [carRentalDetails, setCarRentalDetails] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getDetails(); 
  }, []);

  const getDetails = async () => {
    const details = await getCar(data.car);
    const images = await getImages(details.id, STORAGE_FOLDERS.CAR_RENTALS);
    details.thumbnail = images?.[0] || {
      url: "/images/peridotLogo.jpg",
      name: "Default image",
    };
    setCarRentalDetails(details);
  };

  return (
    <>
      <Grid item>
        {carRentalDetails ?
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120, borderRadius: 2 }}
            image={carRentalDetails.thumbnail.url}
            alt={carRentalDetails.thumbnail.name}
          /> :
          <Skeleton sx={{ width: 120, height: 120 }} animation="wave" variant="rectangular" />
        }
      </Grid>
      <Grid item xs>
        {carRentalDetails ? 
          <>
            <Typography variant="body1">
              {carRentalDetails.make} {carRentalDetails.model}
            </Typography>
            <Typography variant="body2">
              {carRentalDetails.transmission} {carRentalDetails.fuel}
            </Typography>
          </> :
          <>
            <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
            <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
          </>
        }
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3} color="text.secondary">
            {carRentalDetails ? 
              <Typography variant="body2">Passenger Capacity</Typography> :
              <Skeleton animation="wave" width="100%" />  
            }
          </Grid>
          <Grid item xs={9} textAlign="right">
            {carRentalDetails ? 
              <Typography variant="body2">{carRentalDetails.capacity}</Typography> :
              <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />  
            }
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} color="text.secondary">
            {carRentalDetails ? 
              <Typography variant="body2">Driver Option</Typography> :
              <Skeleton animation="wave" width="100%" />  
            }
          </Grid>
          <Grid item xs={10} textAlign="right">
            {carRentalDetails ? 
              <Typography variant="body2">{data.driverOption}</Typography> :
              <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />  
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

BookingDetailsCarRental.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BookingDetailsCarRental;