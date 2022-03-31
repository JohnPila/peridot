import { Chip, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Typography from "../../common/Typography";
import { useEffect } from "react";
import { BOOKING_STATUS } from "../../../utils/constants";

export default function BookResult() {
  const location = useLocation();
  const navigate = useNavigate();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!location.state) {
      navigate("/packages", {replace: true});
    }
  }, []);

  const goToBookingDetails = () => {
    navigate("/bookings/" + id, {replace: true});
  };

  if (!location.state) {
    return null;
  }

  const {state: {
    id,
    // method,
    result: {
      status,
      // success,
      message,
      amount,
      // referenceNumber,
      // timestamp,
    },
  }} = location;
  return (
    <Grid container>
      <Grid item xs={12} textAlign="center">
        {BOOKING_STATUS.PAID === status && 
          <>
            <CheckCircleIcon sx={{fontSize: 150}} color="success" />
            <Typography variant="h3">Thank you for your payment</Typography>
            <Typography variant="h6">
              Your booking ID is <Chip label={id} color="secondary" size="small" onClick={goToBookingDetails} />
            </Typography>
            <br/>
            <Typography variant="body2">You will receive your booking confirmation via email.</Typography>
          </>
        }
        {BOOKING_STATUS.PAYMENT_FAILED === status && 
          <>
            <CancelIcon sx={{fontSize: 150}} color="error" />
            <Typography variant="h3">Payment failed</Typography>
            <Typography variant="h6" color="text.secondary">
              You have failed to pay the amount of ₱{amount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {message}
            </Typography>
            <br/>
            <Typography variant="body2">You can also contact our customer support for assistance.</Typography>
          </>
        }
        {BOOKING_STATUS.PAYMENT_VERIFICATION === status && 
          <>
            <HourglassTopIcon sx={{fontSize: 150}} color="info" />
            <Typography variant="h3">Payment verification</Typography>
            <Typography variant="h6" color="text.secondary">
              Your booking ID is <Chip label={id} color="secondary" size="small" onClick={goToBookingDetails} />
            </Typography>
            <Typography variant="body1">Kindly wait while we verify your payment.</Typography>
            <br/>
            <Typography variant="body2">You can also contact our customer support for assistance.</Typography>
          </>
        }
      </Grid>
    </Grid>
  );
}