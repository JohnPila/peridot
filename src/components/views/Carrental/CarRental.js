import { Autocomplete, Box, CircularProgress, debounce, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { searchPlacesByText } from "../../../services/LocationService";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import MapRoute from "../../common/MapRoute"; 

function CarRental() {
  const navigate  = useNavigate();
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState();
  const [pickupLoading, setPickupLoading] = useState(false);
  const [pickupOptions, setPickupOptions] = useState([]);
  const [dropoffLocation, setDropoffLocation] = useState();
  const [dropoffLoading, setDropoffLoading] = useState(false);
  const [dropoffOptions, setDropoffOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({
    name: "",
  });
  /* eslint-disable react-hooks/exhaustive-deps */
  const getPickupLocationsDebounce = useCallback(debounce((text) => {
    getLocations(text, setPickupOptions, setPickupLoading);
  }, 200), []);
  const getDropoffLocationsDebounce = useCallback(debounce((text) => {
    getLocations(text, setDropoffOptions, setDropoffLoading);
  }, 200), []);

  const getLocations = async (text, setOptionsFn, setLoadingFn) => {
    try {
      setLoadingFn(true);
      setOptionsFn([]);
      const data = await searchPlacesByText(text);
      if (data?.features?.length > 0) {
        setOptionsFn(data.features);
      }
    } finally {
      setLoadingFn(false);
    }
  }

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
            <InputLabel sx={{mt: 1, mb: 1}}>Pick up location *</InputLabel>
            <Autocomplete
              fullWidth
              size="large"
              filterOptions={(x) => x}
              isOptionEqualToValue={(option, value) => option.properties.place_id === value.properties.place_id}
              getOptionLabel={(option) => option.properties.formatted}
              options={pickupOptions}
              loading={pickupLoading}
              value={pickupLocation}
              onChange={(event, newValue) => {
                setPickupLocation(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                getPickupLocationsDebounce(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {pickupLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
              renderOption={handleRenderOption}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{mt: 1, mb: 1}}>Drop off location *</InputLabel>
            <Autocomplete
              fullWidth
              size="large"
              filterOptions={(x) => x}
              isOptionEqualToValue={(option, value) => option.properties.place_id === value.properties.place_id}
              getOptionLabel={(option) => option.properties.formatted}
              options={dropoffOptions}
              loading={dropoffLoading}
              value={dropoffLocation}
              onChange={(event, newValue) => {
                setDropoffLocation(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                getDropoffLocationsDebounce(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {pickupLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
              renderOption={handleRenderOption}
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
        </Grid>
        <Grid item xs={12} sx={{pt: 1, pb: 1}}>
            <MapRoute 
              fromValue={pickupLocation} 
              toValue={dropoffLocation} 
            />
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