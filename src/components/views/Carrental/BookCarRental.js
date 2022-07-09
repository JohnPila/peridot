import { Box, FormHelperText, Grid, InputLabel, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MapLocationPicker from "../../common/picker/MapLocationPicker";
import MapRoute from "../../common/MapRoute";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { styled } from '@mui/material/styles';
import GeoapifyConfig from "../../../config/GeoapifyConfig";
import Typography from "../../common/Typography";
import { BOOKING_TYPE } from "../../../utils/constants";

const RouteTotalLayout = styled('div')(({ theme }) => ({
  display: "flex",
  "h3": {
    fontWeight: "bold",
    fontSize: 25,
  },
  "h3:last-child": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  }
}));


function BookCarRental() {
  const navigate  = useNavigate();
  const [DateStart, setPickupDate] = useState(new Date());
  const [DateEnd, PickupDate] = useState(new Date());
  const [TimeStart, setPickupTime] = useState(new Date());
  const [TimeEnd, PickupTime] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState({
    DateEnd: "",
    TimeStart: "",
    DateStart: "",
    TimeEnd: "",
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitting && isValid()) {
      save();
    }
  };
  
  const save = async () => {
    try {
      setSubmitting(true);
      goToBookPage();
    } catch (error) {
      console.error("Failed to book airport transfer.", error);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = () => {
    const errMsg = {};
    if (!DateStart) {
      errMsg.DateStart = "Date start location is required.";
    }
    if (!DateEnd) {
      errMsg.DateEnd = "Date end location is required.";
    }
    if (!TimeStart) {
      errMsg.TimeStart = "Time start date is required.";
    }
    if (!TimeEnd) {
      errMsg.TimeEnd = "Time end is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };
  
  const setValue = (field, value) => {
    switch (field) {
      case "DateStart":
        setPickupDate(value);
        setError((err) => ({...err, Datestart: ""}));
        break;
      case "DateEnd":
        PickupDate(value);
        setError((err) => ({...err, DateEnd: ""}));
        break;
      case "TimeStart":
        setPickupTime(value);
        setError((err) => ({...err, TimeStart: ""}));
        break;
      case "TimeEnd":
        PickupTime(value);
        setError((err) => ({...err, TimeEnd: ""}));
        break;
      default:
        break;
    }
  };

  const goToBookPage = () => {
    navigate("book", {
      state: {
        type: BOOKING_TYPE.AIRPORT_TRANSFER,
        data: {
          DateEnd,
          TimeStart,
          DateStart,
          TimeEnd,
        },
      },
    });
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Book Car Rental
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
          <InputLabel sx={{mt: 1, mb: 1}}>Rental Date Start *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={DateStart}
                onChange={(v) => setValue("DateStart", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.DateEnd && 
                <FormHelperText error>
                  {error.DateStart}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Date End *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={DateEnd}
                onChange={(v) => setValue("DateEnd", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.DateEnd && 
                <FormHelperText error>
                  {error.DateEnd}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6}>
          <InputLabel sx={{mt: 1, mb: 1}}>Rental Time Start *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={TimeStart}
                onChange={(v) => setValue("TimeStart", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.TimeStart && 
                <FormHelperText error>
                  {error.TimeStart}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Time End *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={TimeEnd}
                onChange={(v) => setValue("TimeEnd", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.TimeEnd && 
                <FormHelperText error>
                  {error.TimeEnd}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={9} />
        </Grid>
        <FormButton
          sx={{ mt: 3, mb: 2 }}
          disabled={submitting}
          size="large"
          color="secondary"
          fullWidth
        >
          {submitting ? 'Booking...' : 'Book Now'}
        </FormButton>
      </Box>
    </AppForm>
  );
}

export default BookCarRental;