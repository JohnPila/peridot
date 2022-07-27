import PropTypes from 'prop-types';
import { Card, CardContent, Skeleton, Chip, CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "../../common/Typography";
import { useEffect, useState } from 'react';
import { BOOKING_STATUS, BOOKING_STATUS_LABEL } from '../../../utils/constants';
import { formatDate, formatTime } from '../../../utils/HelperUtils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import { getPlaceDetails } from '../../../services/LocationService';
import SouthIcon from '@mui/icons-material/South';

function ViewBookingsCarRentalItem(props) {
  const {
    data,
  } = props;

  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const pickupData = await getPlaceDetails(data.pickupLocation);
    const dropoffData = await getPlaceDetails(data.dropoffLocation);
    setLocation({
      pickup: pickupData.features[0],
      dropoff: dropoffData.features[0],
    });
  };

  const getStatus = () => {
    let color = "default";
    switch (data.status) {
      case BOOKING_STATUS.PAID:
        color = "success";
        break;
      case BOOKING_STATUS.PAYMENT_FAILED:
      case BOOKING_STATUS.CANCELLED:
      case BOOKING_STATUS.DECLINED:
        color = "error";
        break;
      case BOOKING_STATUS.PAYMENT_VERIFICATION:
      case BOOKING_STATUS.PENDING_CANCELLATION:
        color = "warning";
        break;
      case BOOKING_STATUS.PENDING_PAYMENT:
        color = "info";
        break;
      default:
        break;
    }
    return (
      <div style={{ display: "flex", flex: 1, alignItems: "self-end" }}>
        <Chip size="small"
          label={BOOKING_STATUS_LABEL[data.status] || "Unknown"} 
          color={color}
        />
      </div>
    )
  }
  
  const onSelectBooking = (e) => {
    navigate("/bookings/" + data.id);
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea sx={{ display: 'flex' }} onClick={onSelectBooking}>
        <Box sx={{ flex: 1, height: "100%" }}>
          <CardContent sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
            {!location ? 
              <>
                <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
                <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
              </> : 
              <>
                <Typography variant="body1" color="text.secondary" component="div">
                  <LocationOnIcon htmlColor="red" sx={{fontSize: 18, position: "relative", bottom: -2}} /> {location.pickup.properties.formatted}
                </Typography>
                <div style={{width: "100%", textAlign: "center"}}>
                  <SouthIcon sx={{ mt: 1, mb: 1, fontSize: 20 }} />
                </div>
                <Typography variant="body1" color="text.secondary" component="div">
                  <LocationOnIcon htmlColor="red" sx={{fontSize: 18, position: "relative", bottom: -2}}/> {location.dropoff.properties.formatted}
                </Typography>
              </>
            }
            <Typography variant="body2" color="text.secondary" component="div" sx={{mt: 1, mb: 3}}>
              <DateRangeIcon sx={{fontSize: 18, position: "relative", bottom: -3}} /> {formatDate(data.pickupDate.toDate())} | {formatTime(data.pickupTime)}
            </Typography>
            {getStatus()}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

ViewBookingsCarRentalItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ViewBookingsCarRentalItem;