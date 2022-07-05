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

const MACTAIN_AIRPORT_PLACE_ID = "51e0e44b08b8fe5e4059597fc0e9d79e2440f00101f901a8a53d00000000009203234d616374616ee280934365627520496e7465726e6174696f6e616c20416972706f7274";
function BookAirportTransfer() {
  const navigate  = useNavigate();
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState(MACTAIN_AIRPORT_PLACE_ID);
  const [dropoffLocation, setDropoffLocation] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState({
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropoffLocation: "",
  });
  const totalCost = useMemo(() => routeData?.features?.length > 0 ? GeoapifyConfig.computeCost(
    routeData.features[0].properties.distance) : 0, [routeData]);

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
    if (!pickupLocation) {
      errMsg.pickupLocation = "Pick-up location is required.";
    }
    if (!dropoffLocation) {
      errMsg.dropoffLocation = "Drop-off location is required.";
    }
    if (!pickupDate) {
      errMsg.pickupDate = "Pick-up date is required.";
    }
    if (!pickupTime) {
      errMsg.pickupTime = "Pick-up time is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };
  
  const setValue = (field, value) => {
    switch (field) {
      case "pickupLocation":
        setPickupLocation(value);
        setError((err) => ({...err, pickupLocation: ""}));
        break;
      case "dropoffLocation":
        setDropoffLocation(value);
        setError((err) => ({...err, dropoffLocation: ""}));
        break;
      case "pickupDate":
        setPickupDate(value);
        setError((err) => ({...err, pickupDate: ""}));
        break;
      case "pickupTime":
        setPickupTime(value);
        setError((err) => ({...err, pickupTime: ""}));
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
          pickupDate,
          pickupTime,
          pickupLocation,
          dropoffLocation,
          routeData,
        },
      },
    });
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Book Airport Transfer
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <InputLabel sx={{mt: 1, mb: 1}}>Pick up location *</InputLabel>
            <MapLocationPicker 
              otherProps={{readOnly: pickupLocation?.properties?.place_id === MACTAIN_AIRPORT_PLACE_ID}}
              value={pickupLocation} 
              onChange={(v) => setValue("pickupLocation", v)} 
              error={error.pickupLocation}
            />
          </Grid>
          <Grid item xs={2} sx={{display: "flex", flexDirection: "column-reverse", 
            alignSelf: "center"}}>
            <FormButton
              type="button"
              sx={{ borderRadius: 1 }}
              disabled={submitting}
              size="small"
              color="secondary"
              fullWidth
              onClick={() => {
                setPickupLocation(dropoffLocation);
                setDropoffLocation(pickupLocation);
              }}
            >
              <SwapHorizIcon fontSize="large" />
            </FormButton>
          </Grid>
          <Grid item xs={5}>
            <InputLabel sx={{mt: 1, mb: 1}}>Drop off location *</InputLabel>
            <MapLocationPicker 
              otherProps={{readOnly: dropoffLocation?.properties?.place_id === MACTAIN_AIRPORT_PLACE_ID}}
              value={dropoffLocation} 
              onChange={(v) => setValue("dropoffLocation", v)} 
              error={error.dropoffLocation}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Pick up date *</InputLabel>
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
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Pick up time *</InputLabel>
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
          <Grid item xs={12} sx={{pt: 1, pb: 1}}>
            <MapRoute 
              fromValue={pickupLocation}
              toValue={dropoffLocation}
              onChange={setRouteData}
            />
          </Grid>
          <Grid item xs={9} />
          <Grid item xs={3}>
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

export default BookAirportTransfer;