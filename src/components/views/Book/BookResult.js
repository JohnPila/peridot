import { Chip, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from "../../common/Typography";
import { useEffect } from "react";

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
      success,
      message,
      amount,
      // referenceNumber,
      // timestamp,
    },
  }} = location;
  return (
    <Grid container>
      <Grid item xs={12} textAlign="center">
        {success ? 
          <>
            <CheckCircleIcon sx={{fontSize: 150}} color="success" />
            <Typography variant="h3">Thank you for your payment</Typography>
            <Typography variant="h6">
              Your booking ID is <Chip label={id} color="secondary" size="small" onClick={goToBookingDetails} />
            </Typography>
            <br/>
            <Typography variant="body2">You will receive your booking confirmation via email.</Typography>
          </> : 
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
            <Typography variant="body2">Kindly contact our customer support for assistance.</Typography>
          </>
        } 
      </Grid>
    </Grid>
  );
}