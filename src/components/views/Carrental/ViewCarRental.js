import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AppForm from '../../common/AppForm';
import Typography from '../../common/Typography';
import { Box } from '@mui/system';
import { CardContent, CardMedia, Divider, Grid} from '@mui/material';
import FormButton from '../../common/form/FormButton';
import { Fragment} from 'react';

function ViewCarRental() {
  return (
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Review
      </Typography>
      <Box component="form">
          <>
            <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
              Booking info
            </Typography>
            <Box sx={{ display: 'flex', background: "none" }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Booking Id: 1548054018
                  </Typography>
                  <Typography component="div" variant="h5">
                     Book Start: May 5, 2022 | 10:00 AM
                  </Typography>
                  <Typography component="div" variant="h5">
                     Book End: May 15, 2022 | 10:00 AM
                  </Typography>
                  <Typography component="div" variant="h5">
                     With Driver: Yes
                  </Typography>
                </CardContent>
              </Box>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Personal info info
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Full name</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Vince Samson</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Phone number</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">+63 9618855989</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Address</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Punta Princesa, Cebu City</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Additional info
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Special requests</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">anniversarry decorations</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Driver Information
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Driver's Name:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Harry Styles</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Driver's Contact Number:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">+63 9978747700</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Car Information
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Vehicle Type:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">SUV</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Car Brand:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">MITSUBISHI</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Model:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Xpander</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Transmission:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Manual</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Fuel:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Unleaded</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Plate No:</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">DSX 126</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Summary
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Booking date</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">April 30, 2022</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Options</Typography>
              </Grid>
                <Fragment >
                  
                  <Grid item xs={8} textAlign="right">
                    <Typography variant="body1">1 x  (₱1000)</Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body1">₱1000</Typography>
                  </Grid>
                </Fragment>
            </Grid>
            <Divider sx={{mt: 3, mb: 2}}/>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="h6" color="text.secondary">Total</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="h6">₱1000</Typography>
              </Grid>
            </Grid>
          </>
          <>
            
          </> 
        <Grid container>
          <Grid item xs>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              type="button"
              variant="outlined"
              href = "payment"
        
            >
              <NavigateBeforeIcon/> <span style={{marginRight: 15}}>Back</span>
            </FormButton>
          </Grid>
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


export default ViewCarRental;