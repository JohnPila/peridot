import { Box, Grid, InputLabel, TextField, Typography } from "@mui/material";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
import { useState } from 'react';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InputAdornment from '@mui/material/InputAdornment';  

function EnterDetails(props) {
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
    return(
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Enter Info
      </Typography>

      <Typography variant="h3" gutterBottom marked="center" align="left">
        Personal Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate >
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <InputLabel>First Name *</InputLabel>
            <Box component="form" sx={{ maxWidth: 600 }} >
                <TextField error={!!error.firstName} autoFocus size="large" 
                noBorder
                placeholder="Your name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setValue("firstName", e.target.value)}
                helperText={error.firstName} 
                sx={{ width: '100%', mt: 2, mb: 1 }}
                />
                
            </Box>
                    
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Last Name *</InputLabel>
            <Box component="form" sx={{ maxWidth: 600 }}>
                <TextField error={!!error.lastName} autoFocus size="large"
                fullWidth
                noBorder
                placeholder="Your last name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setValue("lastName", e.target.value)}
                helperText={error.lastName} 
                sx={{ width: '100%', mt: 2, mb: 1 }}
                />
                
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
            <InputLabel >Address *</InputLabel>
            <Box component="form" sx={{ maxWidth: 900 }}>
                <TextField error={!!error.address} autoFocus size="large"
                fullWidth
                noBorder
                placeholder="Your Address"
                variant="outlined"
                value={address}
                onChange={(e) => setValue("address", e.target.value)}
                helperText={error.address} 
                sx={{ width: '190%', mt: 2, mb: 1 }}
                />
                
            </Box>
          </Grid>
          <Typography variant="h3" gutterBottom marked="center" align="left">
             Contact Info
         </Typography>
          <Grid item xs={6}>
            <InputLabel >Phone number *</InputLabel>
            <Box component="form" sx={{ maxWidth: 600 }}>
                <TextField error={!!error.phoneNumber} autoFocus size="large"
                fullWidth
                noBorder
                placeholder="Your number"
                variant="outlined"
                value={phoneNumber}
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
                sx={{ width: '100%', mt: 2, mb: 1 }}
                />
                
            </Box>
          </Grid>
          <Typography variant="h3" gutterBottom marked="center" align="left">
             Other Info
         </Typography>
         <Grid item xs={6}>
            <InputLabel>Special request*</InputLabel>
            <Box component="form" sx={{ maxWidth: 900 }}>
                <TextField
                size="large"
                fullWidth
                noBorder
                placeholder="Your request"
                variant="outlined"
                sx={{ width: '190%', mt: 2, mb: 1 }}
                />
                
            </Box>
          </Grid>
          <Grid container>
          <Grid item xs>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              type="button"
              variant="outlined"
              href="/car-rental"
            >
             <span style={{marginRight: 15}}>Back</span>
            </FormButton>
          </Grid>
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
        </Grid>
      </Box>
    </AppForm>
    );
  };
  
  EnterDetails.propTypes = {
    info: PropTypes.object,
    // onNext: PropTypes.func.isRequired,
  };

export default EnterDetails;