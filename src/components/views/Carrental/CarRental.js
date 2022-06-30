import { Box, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";


function CarRental() {
  /* eslint-disable no-unused-vars */
  const navigate  = useNavigate();
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({
    name: "",
  });
  /* eslint-disable react-hooks/exhaustive-deps */

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

  const handleRenderOption = (option, data, { inputValue }) => {
    const matches = match(data.properties.formatted, inputValue);
    const parts = parse(data.properties.formatted, matches);
  
    const highlightStyle = {
      fontWeight: 700,
      backgroundColor: "lightyellow",
      padding: "5px 2px"
    };
  
    return (
      <div {...option} style={{padding: "10px 15px"}}>
        {parts.map((part, index) => (
          <span key={index} style={part.highlight ? highlightStyle : {}}>
            {part.text}
          </span>
        ))}
      </div>
    );
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Book Car Rental
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
        <Grid container spacing={4}>
        <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Date Started *</InputLabel>
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
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Time Start *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={pickupTime}
                onChange={setPickupTime}
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Rental Date Ended *</InputLabel>
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
            <InputLabel sx={{mt: 1, mb: 1}}>Rental time end *</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={pickupTime}
                onChange={setPickupTime}
                renderInput={(params) => <TextField {...params} size="large" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <FormButton
          sx={{ mt: 3, mb: 2 }}
          disabled={submitting}
          size="large"
          color="secondary"
          fullWidth
          href="/enter-details/"
        >
          {submitting ? 'Booking...' : 'Book Now'}
        </FormButton>
      </Box>
    </AppForm>
  );
}

export default CarRental;