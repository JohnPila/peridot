import { Card, CardContent, CardMedia, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment} from "react";
import Typography from "../../../common/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import withLoggedUser from "../../../hocs/withLoggedUser";
import withDialog from "../../../hocs/withDialog";

export function ViewCarRental() {
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
              <Skeleton animation="wave" width="80%" sx={{ height: 50 }} />
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item>
       
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      //image={data.thumbnail.url}
                     
                    /> :
                    <Skeleton sx={{ width: 120, height: 120 }} animation="wave" variant="rectangular" />

                </Grid>
                <Grid item xs>
   
                    <>
                      <Typography variant="body1">Booking Id: 1548054018</Typography>
                      <Typography variant="body2">
                        With Driver <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> :
                    <>
                      <Skeleton animation="wave" width="80%" sx={{ height: 30 }} />
                      <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />
                    </>
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
      
                    <Typography variant="body2">Booking date:</Typography>
                    <Skeleton animation="wave" width="100%" />  
                </Grid>
                <Grid item xs={10} textAlign="right">
                    <Typography variant="body2">July 4, 2022</Typography>
                    <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />  
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Driver Information</Typography> :
                <Skeleton animation="wave" width="30%" sx={{ height: 30 }} />  
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Driver's Name: </Typography> :
                    <Skeleton animation="wave" width="100%" />  
                </Grid>
                <Grid item xs textAlign="right">
                    <Typography variant="body2">Daniel Padilla</Typography> :
                    <Skeleton animation="wave" width="60%" sx={{ marginLeft: "auto" }} />  
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Driver's Contact Number</Typography> :
                    <Skeleton animation="wave" width="100%" />  
            
                </Grid>
                <Grid item xs textAlign="right">
                    <Typography variant="body2">+63 945 5879</Typography> :
                    <Skeleton animation="wave" width="40%" sx={{ marginLeft: "auto" }} />  
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Address</Typography> :
                    <Skeleton animation="wave" width="100%" />  
                </Grid>
                <Grid item xs textAlign="right">
                    <Typography variant="body2">Tabunok Talisay</Typography> :
                    <Skeleton animation="wave" width="80%" sx={{ marginLeft: "auto" }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Car Selection</Typography> :
                <Skeleton animation="wave" width="30%" sx={{ height: 30 }} />  
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Vehicle Type: SUV</Typography> :
                    <Skeleton animation="wave" width="100%" />
                    <Typography variant="body2" color="text.secondary">Make: MITSUBISHI</Typography> :
                    <Skeleton animation="wave" width="100%" />
                    <Typography variant="body2" color="text.secondary">Model: XPANDER</Typography> :
                    <Skeleton animation="wave" width="100%" />
                    <Typography variant="body2" color="text.secondary">Transmission: MANUAL</Typography> :
                    <Skeleton animation="wave" width="100%" /> 
                    <Typography variant="body2" color="text.secondary">Fuel: UNLEADED</Typography> :
                    <Skeleton animation="wave" width="100%" />
                    <Typography variant="body2" color="text.secondary">Plate No. DSX 126</Typography> :
                    <Skeleton animation="wave" width="100%" />
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
              <Skeleton animation="wave" width="60%" sx={{ height: 30 }} />  

            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
              <Grid item xs>
                  <Typography variant="body2">Name:</Typography> :
                  <Skeleton animation="wave" width="70%" />  
              </Grid>
              <Grid item xs textAlign="right">
                  <Typography variant="body2">Katryn Bernardo</Typography> 
                  <Skeleton animation="wave" width="70%" sx={{ marginLeft: "auto" }} />  
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
                    <Skeleton animation="wave" width="80%" />  
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Skeleton animation="wave" width="70%" sx={{ marginLeft: "auto", marginRight: 1 }} />  
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Skeleton animation="wave" width="100%" sx={{ marginLeft: "auto" }} />  
                  </Grid>
                </>
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container color="text.secondary">
              <Grid item xs={4}>
                  <Typography variant="body2">Contact No.</Typography> :
                  <Skeleton animation="wave" width="100%" />    
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2"></Typography> :
                  <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />    
              </Grid>
              <Grid item xs={4}>
                  <Typography variant="body2">People Used</Typography> :
                  <Skeleton animation="wave" width="100%" />    
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2"></Typography> :
                  <Skeleton animation="wave" width="30%" sx={{ marginLeft: "auto" }} />    
              </Grid>
            </Grid>
            <Divider sx={{my: 2}}/>
            <Grid container>
              <Grid item xs={4}>
                  <Typography variant="body2">Booking End</Typography> :
                  <Skeleton animation="wave" width="100%" sx={{ height: 30 }} />    
              </Grid>
              <Grid item xs={8} textAlign="right">
                  <Typography variant="body2">July 6, 2022</Typography> :
                  <Skeleton animation="wave" width="40%" sx={{ height: 30, marginLeft: "auto" }} />    
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

export default withDialog(withLoggedUser(ViewCarRental));