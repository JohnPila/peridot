import { Box, Grid, InputLabel, TextField, Typography } from "@mui/material";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
function EnterDetails() {
    return(
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Enter Info
      </Typography>
      <Typography variant="h3" gutterBottom marked="center" align="left">
        Personal Details
      </Typography>
      <Box component="form"  noValidate sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <InputLabel>First Name *</InputLabel>
            <Box component="form" sx={{ maxWidth: 600 }}>
                <TextField
                noBorder
                placeholder="Your name"
                variant="outlined"
                sx={{ width: '100%', mt: 2, mb: 1 }}
                />
                
            </Box>
                    
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Last Name *</InputLabel>
            <Box component="form" sx={{ maxWidth: 600 }}>
                <TextField
                size="large"
                fullWidth
                noBorder
                placeholder="Your last name"
                variant="outlined"
                sx={{ width: '100%', mt: 2, mb: 1 }}
                />
                
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
            <InputLabel >Address *</InputLabel>
            <Box component="form" sx={{ maxWidth: 900 }}>
                <TextField
                size="large"
                fullWidth
                noBorder
                placeholder="Your Address"
                variant="outlined"
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
                <TextField
                size="large"
                fullWidth
                noBorder
                placeholder="Your number"
                variant="outlined"
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
        <FormButton
          sx={{ mt: 2, mb: 1 }}
          size="large"
          color="secondary"
          halfWidth
          align="right"
        >
          {'Next'}
        </FormButton>
      </Box>
    </AppForm>
    );
  };

export default EnterDetails;