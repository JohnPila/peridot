import { CardMedia, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../common/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import { STORAGE_FOLDERS } from '../../../utils/constants';
import { getPackage } from '../../../services/PackageService';
import { getImages } from '../../../services/FileService';

function BookingDetailCarRental(props) {
  const {data} = props;

  const [carRentalDetails, setPackageDetails] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getDetails();
  }, []);


  return (
    <>
      <Grid item>
        {packageDetails ?
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120, borderRadius: 2 }}
            image={packageDetails.thumbnail.url}
            alt={packageDetails.thumbnail.name}
          /> :
          <Skeleton sx={{ width: 120, height: 120 }} animation="wave" variant="rectangular" />
        }
      </Grid>
      <Grid item xs>
        {packageDetails ? 
          <>
            <Typography variant="body1">{packageDetails.name}</Typography>
            <Typography variant="body2">
              {packageDetails.barangay.label}, {packageDetails.city.label} <LocationOnIcon 
                fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
            </Typography>
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

BookingDetailCarRental.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BookingDetailCarRental;