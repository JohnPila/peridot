import PropTypes from 'prop-types';
import { Box, Grid, InputLabel, TextField } from "@mui/material";
import AppForm from "../../common/AppForm";
import Typography from "../../common/Typography";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';
import FormButton from '../../common/form/FormButton';
import InputAdornment from '@mui/material/InputAdornment';

function Enterdetails(props) {
  const {
    info,
    onNext,
  } = props;

  const [firstName, setFirstName] = useState(info?.firstName || "");
  const [lastName, setLastName] = useState(info?.lastName || "");
  const [address, setAddress] = useState(info?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(info?.phoneNumber || "");
  const [specialRequests, setSpecialRequests] = useState(info?.specialRequests || "");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      onNext({
        firstName,
        lastName,
        address,
        phoneNumber,
        specialRequests,
      });
    }
  };
  
  const isValid = () => {
    const errMsg = {};
    if (!firstName) {
      errMsg.firstName = "First name is required.";
    }
    if (!lastName) {
      errMsg.lastName = "Last name is required.";
    }
    if (!address) {
      errMsg.address = "Address is required.";
    }
    if (!phoneNumber) {
      errMsg.phoneNumber = "Phone number is required.";
    }
    if (Object.keys(errMsg).length > 0) {
      setError(errMsg);
      return false;
    }
    return true;
  };

  const setValue = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        setError((err) => ({...err, firstName: ""}));
        break;
      case "lastName":
        setLastName(value);
        setError((err) => ({...err, lastName: ""}));
        break;
      case "address":
        setAddress(value);
        setError((err) => ({...err, address: ""}));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        setError((err) => ({...err, phoneNumber: ""}));
        break;
      default:
        break;
    }
  };

  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Enter Info
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate >
        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          Personal Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs>
            <InputLabel sx={{mb: 1}}>First name *</InputLabel>
            <TextField error={!!error.firstName} autoFocus size="large" 
              fullWidth sx={{mb: 1}} 
              value={firstName}
              onChange={(e) => setValue("firstName", e.target.value)}
              helperText={error.firstName} />
          </Grid>
          <Grid item xs>
            <InputLabel sx={{mb: 1}}>Last name *</InputLabel>
            <TextField error={!!error.lastName} size="large" 
              fullWidth sx={{mb: 1}} 
              value={lastName}
              onChange={(e) => setValue("lastName", e.target.value)}
              helperText={error.lastName} />
          </Grid>
        </Grid>
        <InputLabel sx={{mt: 1, mb: 1}}>Address *</InputLabel>
        <TextField multiline rows={2} error={!!error.address} size="large" 
          fullWidth sx={{mb: 1}} 
          value={address}
          onChange={(e) => setValue("address", e.target.value)}
          helperText={error.address} />
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Contact Info
        </Typography>
        <InputLabel sx={{mb: 1}}>Phone number *</InputLabel>
        <TextField error={!!error.phoneNumber} size="large" 
          fullWidth sx={{mb: 1}} 
          value={phoneNumber}
          type="number"
          length="10"
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 10) {
              setValue("phoneNumber", value);
            }
          }}
          helperText={error.phoneNumber}
          InputProps={{startAdornment: (
            <InputAdornment position="start" sx={{mt: 0.4}}>
              +63
            </InputAdornment>
          )}}
        />
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Other Info
        </Typography>
        <InputLabel sx={{mt: 1, mb: 1}}>Special requests</InputLabel>
        <TextField multiline rows={2} size="large" 
          fullWidth sx={{mb: 1}} 
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)} />
        <Grid container>
          <Grid item xs textAlign="right">
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              <span style={{marginLeft: 15}}>Next</span> <NavigateNextIcon/>
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </AppForm>
  );
}

Enterdetails.propTypes = {
  info: PropTypes.object,
  onNext: PropTypes.func.isRequired,
};

export default Enterdetails;