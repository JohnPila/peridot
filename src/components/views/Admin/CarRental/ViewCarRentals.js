import { Card, CardContent, CardMedia, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment} from "react";
import Typography from "../../../common/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import withLoggedUser from "../../../hocs/withLoggedUser";
import withDialog from "../../../hocs/withDialog";

export function ViewCarRentals() {
	return (
		<Grid container spacing={2}>
			<Grid item md={8} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                         <Typography variant="body2">Booking</Typography>
                    <Grid item xs={10} textAlign="right">
                        <Typography variant="body2">Booking ID: 1548054018 10 Days</Typography>
                      </Grid>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2"></Typography>
                      </Grid>
                    </Grid>
                    
                  
                </>
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item>
       
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      //image={data.thumbnail.url}
                     
                    /> :

                </Grid>
                <Grid item xs>
   
                    <>
                      <Typography variant="body1">Booking Id: 1548054018</Typography>
                      <Typography variant="body2">
                        With Driver <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> :
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
      
                    <Typography variant="body2">Booking date:</Typography>
                </Grid>
                <Grid item xs={10} textAlign="right">
                    <Typography variant="body2">July 4, 2022</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Driver Information</Typography> :
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Driver's Name: </Typography> :
                </Grid>
                <Grid item xs textAlign="right">
                    <Typography variant="body2">Daniel Padilla</Typography> :
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Driver's Contact Number</Typography> :
            
                </Grid>
                <Grid item xs textAlign="right">
                    <Typography variant="body2">+63 945 5879</Typography> :
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Address</Typography> :
                </Grid>
                <Grid item xs textAlign="right">
                    <Typography variant="body2">Tabunok Talisay</Typography> :
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Car Selection</Typography> :
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Vehicle Type:</Typography> :
                  </Grid>
                  <Grid item xs textAlign="right">
                    <Typography variant="body2">SUV</Typography> :
                    </Grid>
                  
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Company :</Typography> :
                  </Grid>
                  <Grid item xs textAlign="right">
                    <Typography variant="body2">MITSUBISHI</Typography> :
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Model:</Typography> :
                  </Grid>
                  <Grid item xs textAlign="right">
                    <Typography variant="body2">XPANDER</Typography> :
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Transmission:</Typography> :
                  </Grid>
                  <Grid item xs textAlign="right">
                    <Typography variant="body2">MANUAL</Typography> :
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Fuel Type:</Typography> :
                  </Grid>
                  <Grid item xs textAlign="right">
                    <Typography variant="body2">UNLEADED</Typography> :
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Plate No.:</Typography> :
                  </Grid>
                  <Grid item xs textAlign="right">
                    <Typography variant="body2">DSX 126</Typography> :
                    </Grid>
                </Grid>
            </CardContent>
          </Card>
        </Stack>
			</Grid>
			<Grid item md={4} sm={12} xs={12}>
				<Card variant="outlined">
          <CardContent>
              <Typography variant="h6">User Information</Typography> :

            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
              <Grid item xs>
                  <Typography variant="body2">Name:</Typography> :
              </Grid>
              <Grid item xs textAlign="right">
                  <Typography variant="body2">Katryn Bernardo</Typography> 
              </Grid>
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
                <Fragment>
                  <Grid item xs={6} textAlign="left">
                    <Typography variant="body2">Age</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography variant="body2"></Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="body2">25</Typography>
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
                  <Typography variant="body2">Contact No.</Typography> :
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2"></Typography> :
              </Grid>
              <Grid item xs={4}>
                  <Typography variant="body2">People Used</Typography> :
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2"></Typography> :
              </Grid>
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container>
              <Grid item xs={4}>
                  <Typography variant="body2">Booking End</Typography> :
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2">July 14, 2022</Typography> :
              </Grid>
            </Grid>
              <>
               
              </>
          </CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default withDialog(withLoggedUser(ViewCarRentals));