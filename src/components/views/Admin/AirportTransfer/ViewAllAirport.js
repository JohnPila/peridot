import { Card, CardContent, Divider, Grid, Stack } from "@mui/material";
import Typography from "../../../common/Typography";
import withLoggedUser from "../../../hocs/withLoggedUser";
import withDialog from "../../../hocs/withDialog";
import FormButton from '../../../common/form/FormButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(theme => ({
  typo: {
    flexGrow: 1,
    textAlign: "center"
  }
}));
export function ViewAllAirport() {
  const classes = useStyles();
	return (
    <Grid container>
     <Typography variant="h2"className={classes.typo}>Booking Details</Typography>
		<Grid container spacing={1}>
			<Grid item md={12} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Booking Id:1234587980</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Booking Created May 1, 2022</Typography>
              </Grid>
            </Grid>
                </>
              <Divider sx={{my: 2}}/>
              
              <Grid container spacing={2}>
                <Grid item>
                </Grid>
                <Grid item xs>
                  <>
                      <Typography variant="body1">Mactan Cebu International Airport Terminal</Typography>
                      <Typography variant="body2">Bai Hotel Cebu</Typography>
                      <Typography variant="body2">2 May 2022 | 09:00</Typography>
                    </>
                </Grid>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    type="button"
                    size="small"
                    variant="outlined"
                    >
                    <span style={{marginLeft: 5}}>Accept</span>
                    </FormButton>
                </Grid>
                <Typography>------</Typography>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    type="button"
                    size="small"
                    >
                    <span style={{marginRight: 15}}>Reject</span>
                    </FormButton>
                </Grid>
            </Grid>
              
              <Divider sx={{my: 2}}/>
              
            </CardContent>
            
          </Card>
          
              <Divider sx={{my: 2}}/>
        </Stack>
			</Grid>
		</Grid>
        <Grid container spacing={1}>
			<Grid item md={12} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Booking Id:1234587980</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Booking Created May 1, 2022</Typography>
              </Grid>
            </Grid>
                </>
              <Divider sx={{my: 2}}/>
              
              <Grid container spacing={2}>
                <Grid item>
                </Grid>
                <Grid item xs>
                  <>
                      <Typography variant="body1">Mactan Cebu International Airport Terminal</Typography>
                      <Typography variant="body2">Bai Hotel Cebu</Typography>
                      <Typography variant="body2">2 May 2022 | 09:00</Typography>
                    </>
                </Grid>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    type="button"
                    size="small"
                    variant="outlined"
                    >
                    <span style={{marginLeft: 5}}>Accept</span>
                    </FormButton>
                </Grid>
                <Typography>------</Typography>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    type="button"
                    size="small"
                    >
                    <span style={{marginRight: 15}}>Reject</span>
                    </FormButton>
                </Grid>
            </Grid>
              
              <Divider sx={{my: 2}}/>
              
            </CardContent>
            
          </Card>
          
              <Divider sx={{my: 2}}/>
        </Stack>
			</Grid>
		</Grid>
        <Grid container spacing={1}>
			<Grid item md={12} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Booking Id:1234587980</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Booking Created May 1, 2022</Typography>
              </Grid>
            </Grid>
                </>
              <Divider sx={{my: 2}}/>
              
              <Grid container spacing={2}>
                <Grid item>
                </Grid>
                <Grid item xs>
                  <>
                      <Typography variant="body1">Mactan Cebu International Airport Terminal</Typography>
                      <Typography variant="body2">Bai Hotel Cebu</Typography>
                      <Typography variant="body2">2 May 2022 | 09:00</Typography>
                    </>
                </Grid>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    type="button"
                    size="small"
                    variant="outlined"
                    >
                    <span style={{marginLeft: 5}}>Accept</span>
                    </FormButton>
                </Grid>
                <Typography>------</Typography>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    type="button"
                    size="small"
                    >
                    <span style={{marginRight: 15}}>Reject</span>
                    </FormButton>
                </Grid>
            </Grid>
              
              <Divider sx={{my: 2}}/>
              
            </CardContent>
            
          </Card>
          
              <Divider sx={{my: 2}}/>
        </Stack>
			</Grid>
		</Grid>
        <Grid container spacing={1}>
			<Grid item md={12} sm={12} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent> 
                <>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Booking Id:1234587980</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1">Booking Created May 1, 2022</Typography>
              </Grid>
            </Grid>
                </>
              <Divider sx={{my: 2}}/>
              
              <Grid container spacing={2}>
                <Grid item>
                </Grid>
                <Grid item xs>
                  <>
                      <Typography variant="body1">Mactan Cebu International Airport Terminal</Typography>
                      <Typography variant="body2">Bai Hotel Cebu</Typography>
                      <Typography variant="body2">2 May 2022 | 09:00</Typography>
                    </>
                </Grid>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    type="button"
                    size="small"
                    variant="outlined"
                    >
                    <span style={{marginLeft: 5}}>Accept</span>
                    </FormButton>
                </Grid>
                <Typography>------</Typography>
                <Grid>
                    <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    type="button"
                    size="small"
                    >
                    <span style={{marginRight: 15}}>Reject</span>
                    </FormButton>
                </Grid>
            </Grid>
              
              <Divider sx={{my: 2}}/>
              
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
              <span style={{marginLeft: 15}}>Next</span> <NavigateNextIcon/>
            </FormButton>
          </Grid>
        </Grid>
        
        </Stack>
			</Grid>
		</Grid>
    </Grid>
    
	);
}

export default withDialog(withLoggedUser(ViewAllAirport));