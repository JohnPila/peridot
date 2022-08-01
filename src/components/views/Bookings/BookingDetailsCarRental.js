import { CardMedia, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../common/Typography';
import PeopleIcon from '@mui/icons-material/People';
import DriverIcon from '@mui/icons-material/BadgeSharp';
import { useEffect, useState } from 'react';
import { STORAGE_FOLDERS } from '../../../utils/constants';
// import { getPackage } from '../../../services/PackageService';
import { getImages } from '../../../services/FileService';
import { getBooking } from '../../../services/BookingsService';
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
    const details = await getCar(data.id);
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
            <Typography variant="body2">
              <DriverIcon color="info" sx={{position: "relative", bottom: -4}} /> {carRentalDetails.driverOption}
            </Typography>
            {/* <Typography variant="body2">
              <PeopleIcon color="error" sx={{position: "relative", bottom: -4}}/> {carRentalDetails.passengerCapacity}
            </Typography> */}
          </> :
          <>
            <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
            <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
          </>
        }
      </Grid>
    </>
  );
}

BookingDetailsCarRental.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BookingDetailsCarRental;