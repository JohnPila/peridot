import { Card, CardContent, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment} from "react";
import Typography from "../../../common/Typography";
import withLoggedUser from "../../../hocs/withLoggedUser";
import withDialog from "../../../hocs/withDialog";
import FormButton from '../../../common/form/FormButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  typo: {
    flexGrow: 1,
    textAlign: "center"
  }
}));
export function AirportBooking() {
  const classes = useStyles();
	return (
    <Grid container>
     <Typography variant="h2"className={classes.typo}>Booking Details</Typography>
		<Grid container spacing={2}>
			<Grid item md={8} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                         <Typography variant="body2">Paid</Typography>
                    <Grid item xs={10} textAlign="right">
                        <Typography variant="body2">Booking Created: Apr 20, 2022</Typography>
                      </Grid>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2"></Typography>
                      </Grid>
                    </Grid>
                </>
                <Typography variant="body2">Booking Id: 1234587980</Typography>
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item>
                </Grid>
                <Grid item xs>
                  <>
                      <Typography variant="body1">Mactan Cebu International Airport Terminal</Typography>
                      <Typography variant="body2">24C Greyhound Subd. Pardo</Typography>
                      <Typography variant="body2">21 Apr 2022 | 06:45</Typography>
                      <Typography variant="body2">John Efren Pila</Typography>
                      <Typography variant="body2">+63 912 3125 154</Typography>
                    </>
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
                <Skeleton sx={{ width: 120, height: 120 }} animation="wave" variant="rectangular" />
                </Grid>      
              </Grid>
            </CardContent>
          </Card>
        </Stack>
			</Grid>
			<Grid item md={4} sm={12} xs={12}>
				<Card variant="outlined">
          <CardContent>
              <Typography variant="h6" textAlign="center" >Payment Summary</Typography> 
              <Typography variant="h11" textAlign="left" >PAID IN APRIL 20, 2022</Typography> 
            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
            <Fragment>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">Mode Of Payment</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2"></Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">Gcash</Typography>
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">Total of Kilometer</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2"></Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">19.3km</Typography>
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">Php 70 at starting point </Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2"></Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">₱70</Typography>
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">Php 4.00 every 300 meters</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2"></Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">19</Typography>
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">Php 4.00 every 2 minutes</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2"></Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">20</Typography>
                  </Grid>
                </Fragment>
                <>
                  <Grid item xs={6} textAlign="left">                 
                  </Grid>
                  <Grid item xs={4} textAlign="right">                   
                  </Grid>
                  <Grid item xs={2} textAlign="right">                 
                  </Grid>
                </>
            </Grid>  
            <Divider sx={{my: 2}}/>        
            <Grid container color="text.secondary">
              <Grid item xs={4}>
                  <Typography variant="body2">Sub total</Typography>                   
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2">70 + 258 + 40</Typography>          
              </Grid>             
            </Grid>     
            <Grid container>
              <Grid item xs={4}>
                  <Typography variant="body1">Total</Typography>                   
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body1">₱368</Typography>                   
              </Grid>
            </Grid>
            <Typography variant="h6" textAlign="center" >Reference  No. 2004520316614</Typography> 
          </CardContent>
				</Card>

        <Grid container>
          <Grid item xs>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              type="button"
              variant="outlined"
              
        
            >
              <NavigateBeforeIcon/> <span style={{marginRight: 15}}>Back</span>
            </FormButton>
          </Grid>
          <Grid item xs textAlign="right">
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              <span style={{marginLeft: 15}}>Delete</span> 
            </FormButton>
          </Grid>
        </Grid>
			</Grid>
		</Grid>
    </Grid>
	);
}

export default withDialog(withLoggedUser(AirportBooking));