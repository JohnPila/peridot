import { Card, CardContent, CardMedia, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Fragment} from "react";
import Typography from "../../../common/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import withLoggedUser from "../../../hocs/withLoggedUser";
import withDialog from "../../../hocs/withDialog";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  typo: {
    flexGrow: 1,
    textAlign: "center"
  }
}));

export function ViewCarRentals() {
  const classes = useStyles();
	return (
    <Grid container>
      <Typography variant="h2"className={classes.typo}>All Car Bookings</Typography>
		<Grid container spacing={2}>
			<Grid item md={6} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                        <Typography variant="body2">Booking ID: 1548054018</Typography>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2">10 Days</Typography>
                      </Grid>
                      </Grid>
                    
                    
                  
                </>
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item >
       
                    <CardMedia
                      component="img"  
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      //image={data.thumbnail.url}
                     
                    /> 

                </Grid>
                <Grid item xs>
   
                    <>
                      <Typography variant="body1">5 May 2022|09:00 → 15 May 2022|9:00</Typography>
                      <Typography variant="body2">
                        With Driver <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> 
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
      
                    <Typography variant="h6">Car Selection
                    :</Typography>
                </Grid>
                    <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Vehicle Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">SUV</Typography> 
                    </Grid>
                  
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Company :</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">MITSUBISHI</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Model:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">XPANDER</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Transmission:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">MANUAL</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Fuel Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">UNLEADED</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Plate No.:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">DSX 126</Typography> 
                    </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
			</Grid>
			<Grid item md={6} sm={12} xs={12}>
            <Card variant="outlined">
            <CardContent> 
                <>
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                        <Typography variant="body2">Booking ID: 1548054018</Typography>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2">10 Days</Typography>
                      </Grid>
                      </Grid>
                    
                    
                  
                </>
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item >
       
                    <CardMedia
                      component="img"  
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      //image={data.thumbnail.url}
                     
                    /> 

                </Grid>
                <Grid item xs>
   
                    <>
                      <Typography variant="body1">5 May 2022|09:00 → 15 May 2022|9:00</Typography>
                      <Typography variant="body2">
                        With Driver <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> 
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
      
                    <Typography variant="h6">Car Selection
                    :</Typography>
                </Grid>
                    <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Vehicle Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">VAN</Typography> 
                    </Grid>
                  
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Company :</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">TOYOTA</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Model:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">HIACE GRANDIA GL</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Transmission:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">AUTOMATIC</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Fuel Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">UNLEADED</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Plate No.:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">YTS 253</Typography> 
                    </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
			</Grid>
      <Grid item md={6} sm={12} xs={12}>
            <Card variant="outlined">
            <CardContent> 
                <>
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                        <Typography variant="body2">Booking ID: 1548054018</Typography>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2">10 Days</Typography>
                      </Grid>
                      </Grid>
                    
                    
                  
                </>
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item >
       
                    <CardMedia
                      component="img"  
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      //image={data.thumbnail.url}
                     
                    /> 

                </Grid>
                <Grid item xs>
   
                    <>
                      <Typography variant="body1">5 May 2022|09:00 → 15 May 2022|9:00</Typography>
                      <Typography variant="body2">
                        With Driver <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> 
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
      
                    <Typography variant="h6">Car Selection
                    :</Typography>
                </Grid>
                    <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Vehicle Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">PICK-UP</Typography> 
                    </Grid>
                  
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Company :</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">TOYOTA</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Model:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">HILUX CONQUEST</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Transmission:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">AUTOMATIC</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Fuel Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">DEISEL</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Plate No.:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">RNC 870</Typography> 
                    </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
			</Grid>
      <Grid item md={6} sm={12} xs={12}>
            <Card variant="outlined">
            <CardContent> 
                <>
                    <Grid container color="text.secondary" sx={{mt: 1}}>
                        <Typography variant="body2">Booking ID: 1548054018</Typography>
                      <Grid item xs textAlign="right">
                        <Typography variant="body2">10 Days</Typography>
                      </Grid>
                      </Grid>
                    
                    
                  
                </>
              <Divider sx={{my: 2}}/>
              <Grid container spacing={2}>
                <Grid item >
       
                    <CardMedia
                      component="img"  
                      sx={{ width: 120, height: 120, borderRadius: 2 }}
                      //image={data.thumbnail.url}
                     
                    /> 

                </Grid>
                <Grid item xs>
   
                    <>
                      <Typography variant="body1">5 May 2022|09:00 → 15 May 2022|9:00</Typography>
                      <Typography variant="body2">
                        With Driver <LocationOnIcon 
                          fontSize="small" color="error" sx={{position: "relative", bottom: -2}}/>
                      </Typography>
                    </> 
                </Grid>
              </Grid>
              <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2} color="text.secondary">
      
                    <Typography variant="h6">Car Selection
                    :</Typography>
                </Grid>
                    <Divider sx={{my: 2}}/>
              <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Vehicle Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">SEDAN</Typography> 
                    </Grid>
                  
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Company :</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">TOYOTA</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Model:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">VIOS</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Transmission:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">MANUAL</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Fuel Type:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">UNLEADED</Typography> 
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Plate No.:</Typography> 
                  </Grid>
                  <Grid item xs textAlign="center">
                    <Typography variant="body2">YTS 253</Typography> 
                    </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
			</Grid>
		</Grid>
    </Grid>
    
	);
}

export default withDialog(withLoggedUser(ViewCarRentals));