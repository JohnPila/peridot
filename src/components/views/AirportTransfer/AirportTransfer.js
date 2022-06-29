import { Box, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MapLocationPicker from "../../common/picker/MapLocationPicker";
import MapRoute from "../../common/MapRoute";

const MACTAIN_AIRPORT_PLACE_ID = "51e0e44b08b8fe5e4059597fc0e9d79e2440f00101f901a8a53d00000000009203234d616374616ee280934365627520496e7465726e6174696f6e616c20416972706f7274";
function AirportTransfer() {
  const navigate  = useNavigate();
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState(MACTAIN_AIRPORT_PLACE_ID);
  const [dropoffLocation, setDropoffLocation] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({
    name: "",
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
      // const packageRef = await addPackage({
      //   name,
      //   description,
      //   city,
      //   barangay,
      //   options: packageOptions,
      // });
      // await uploadImages(images, `${STORAGE_FOLDERS.PACKAGES}/${packageRef.id}`);
      // navigate("/admin/packages");
    } catch (error) {
      console.error("Failed to save package.", error);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = () => {
    const errMsg = {};
    if (!error.name) {
      errMsg.name = "Name is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Book Airport Transfer
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Pick up location *</InputLabel>
            <MapLocationPicker 
              otherProps={{readOnly: true}}
              value={pickupLocation} 
              onChange={setPickupLocation} 
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Drop off location *</InputLabel>
            <MapLocationPicker 
              value={dropoffLocation} 
              onChange={setDropoffLocation} 
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
                onChange={setPickupDate}
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Pick up time *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={pickupTime}
                onChange={setPickupTime}
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sx={{pt: 1, pb: 1}}>
            <MapRoute 
              fromValue={pickupLocation} 
              toValue={dropoffLocation} 
            />
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

export default AirportTransfer;