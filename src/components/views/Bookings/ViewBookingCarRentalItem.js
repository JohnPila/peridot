import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Skeleton, Chip, CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "../../common/Typography";
import { useEffect, useState } from 'react';
import { getImages } from '../../../services/FileService';
import { BOOKING_STATUS, BOOKING_STATUS_LABEL, STORAGE_FOLDERS } from '../../../utils/constants';
import { formatDate, formatTime } from '../../../utils/HelperUtils';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import { getCar } from '../../../services/CarRentalService';

function ViewBookingCarRentalItem(props) {
  const {
    data,
  } = props;

  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const [carRentalData, setCarRentalData] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getCar(data.car).then(setCarRentalData);
    getImages(data.car.id, STORAGE_FOLDERS.CAR_RENTALS).then(images => setThumbnail(images?.[0] || {
      url: "/images/peridotLogo.jpg",
      name: "Default image",
    }));
  }, []);

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
        {thumbnail ? 
          <CardMedia
            component="img"
            sx={{ width: 200, height: 200 }}
            image={thumbnail.url}
            alt={thumbnail.name}
          /> : 
          <Skeleton sx={{ width: 200, height: 200 }} animation="wave" variant="rectangular" />
        }
        <Box sx={{ flex: 1, height: "100%" }}>
          <CardContent sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
            {carRentalData ? 
              <>
                <Typography component="div" variant="h5">
                  {carRentalData.make} {carRentalData.model}
                </Typography>
                <Typography variant="body1" color="text.secondary" component="div">
                  {carRentalData.transmission} {carRentalData.fuel}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  <DateRangeIcon sx={{fontSize: 18, position: "relative", bottom: -3}} /> {formatDate(data.pickupDate.toDate())} | {formatTime(data.pickupTime.toDate())}
                </Typography>
                {getStatus()}
              </> :
              <>
                <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
                <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
                <Skeleton animation="wave" width="40%" sx={{ height: 30 }} />
                <Skeleton animation="wave" width="40%" sx={{ height: 30, position: "relative", top: 50 }} />
              </>
            }
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

ViewBookingCarRentalItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ViewBookingCarRentalItem;