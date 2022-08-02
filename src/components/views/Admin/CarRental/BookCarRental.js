import { Box, FormHelperText, Grid, InputLabel, TextField, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppForm from "../../../common/AppForm";
import FormButton from "../../../common/form/FormButton";
import { LocalizationProvider, TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import MapLocationPicker from "../../common/picker/MapLocationPicker";
//import MapRoute from "../../common/MapRoute";
//import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { styled } from '@mui/material/styles';
//import GeoapifyConfig from "../../../config/GeoapifyConfig";
import Typography from "../../../common/Typography";
import { BOOKING_TYPE } from "../../../../utils/constants";
import CarRateOptions from "./CarRateOptions";

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
  const {id: carId} = useParams();
  const navigate  = useNavigate();
  const [pickupDate, setPickupDate] = useState(new Date());
  // const [dateEnd, PickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  // const [timeEnd, PickupTime] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [driverOption, setDriverOption] = useState('with driver');
  const [passengerCapacity, setPassengerCapacity] = useState('4 seater');
  const [rateOptions, setRateOptions] = useState([]);
  // const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState({
    // dateEnd: "",
    pickupDate: "",
    pickupTime: "",
    // timeEnd: "",
    rateOptions: "",
  });
  
  const totalCost = useMemo(() => rateOptions.reduce((acc, opt) => acc + (opt.rate * opt.quantity), 0), 
    [rateOptions]);

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
      console.error("Failed to book car rental.", error);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = () => {
    const errMsg = {};
    if (!pickupDate) {
      errMsg.pickupDate = "Pick up date is required.";
    }
    // if (!dateEnd) {
    //   errMsg.dateEnd = "Date end location is required.";
    // }
    if (!pickupTime) {
      errMsg.pickupTime = "Pick up time is required.";
    }
    // if (!timeEnd) {
    //   errMsg.timeEnd = "Time end is required.";
    // }
    if (!rateOptions.length) {
      errMsg.rateOptions = "Rate option(s) is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };
  
  const setValue = (field, value) => {
    switch (field) {
      case "pickupDate":
        setPickupDate(value);
        setError((err) => ({...err, pickupDate: ""}));
        break;
      // case "dateEnd":
      //   PickupDate(value);
      //   setError((err) => ({...err, dateEnd: ""}));
      //   break;
      case "pickupTime":
        setPickupTime(value);
        setError((err) => ({...err, pickupTime: ""}));
        break;
      // case "timeEnd":
      //   PickupTime(value);
      //   setError((err) => ({...err, timeEnd: ""}));
      //   break;
      case "rateOptions":
        setRateOptions(value);
        setError((err) => ({...err, rateOptions: ""}));
        break;
      default:
        break;
    }
  };

  const goToBookPage = () => {
    navigate("book", {
      state: {
        type: BOOKING_TYPE.CAR_RENTAL,
        data: {
          pickupDate,
          pickupTime,
          passengerCapacity,
          driverOption,
          rateOptions: rateOptions.map((opt) => ({
            id: opt.id,
            rate: opt.rate,
            quantity: opt.quantity,
          })),
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
          <Grid item xs={12}>
          <InputLabel sx={{mt: 1, mb: 1}}>Rental Start Date *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={pickupDate}
                onChange={(v) => setValue("pickupDate", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.pickupDate && 
                <FormHelperText error>
                  {error.pickupDate}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Date End *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={dateEnd}
                onChange={(v) => setValue("dateEnd", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.dateEnd && 
                <FormHelperText error>
                  {error.dateEnd}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid> */}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Start Time *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={pickupTime}
                onChange={(v) => setValue("pickupTime", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.pickupTime && 
                <FormHelperText error>
                  {error.pickupTime}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Time End *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={timeEnd}
                onChange={(v) => setValue("timeEnd", v)} 
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
              {error.timeEnd && 
                <FormHelperText error>
                  {error.timeEnd}
                </FormHelperText> 
              }
            </LocalizationProvider>
          </Grid> */}
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="capacity-radio-button-label">Passenger Capacity</FormLabel>
              <RadioGroup 
                row
                sx={{mt: 3, columnGap: 10}}
                aria-labelledby="capacity-radio-button-label"
                value={passengerCapacity}
                onChange={(e) => setPassengerCapacity(e.target.value)} >
                <FormControlLabel value="4 seater" control={<Radio color="info"/>} 
                  label="4 seater" />
                <FormControlLabel value="6 seater" control={<Radio color="info"/>} 
                  label="6 seater" />
                <FormControlLabel value="15 seater" control={<Radio color="info"/>} 
                  label="15 seater" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="driver-radio-button-label">Driver Option</FormLabel>
              <RadioGroup 
                row 
                sx={{mt: 3, columnGap: 10}}
                aria-labelledby="driver-radio-button-label"
                value={driverOption}
                onChange={(e) => setDriverOption(e.target.value)} >
                <FormControlLabel value="with driver" control={<Radio color="info"/>} 
                  label="with driver" />
                <FormControlLabel value="without driver" control={<Radio color="info"/>} 
                  label="without driver" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <FormLabel id="capacity-radio-button-label">Rate Options *</FormLabel>
            <CarRateOptions 
              carId={carId} 
              error={error.rateOptions}
              disabled={submitting} 
              onSelect={(v) => setValue("rateOptions", v)}
            />
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={4}>
            <RouteTotalLayout>
              <Typography variant="h5">
                Total Fare
              </Typography>
              <Typography variant="h5" color="darkgreen">
                ₱{totalCost}
              </Typography>
            </RouteTotalLayout>
          </Grid>
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