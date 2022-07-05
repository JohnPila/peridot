import { Box, Grid,Typography,Radio, RadioGroup, FormControlLabel,FormHelperText, Divider } from "@mui/material";
import AppForm from "../../common/AppForm";
import FormButton from "../../common/form/FormButton";
import { PAYMENT_METHOD} from '../../../utils/constants';
import GCashConfig from '../../../config/GCashConfig';
import PackageDetailsOptionSkeleton from '../Admin/Packages/PackageDetailsOptionSkeleton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckIcon from '@mui/icons-material/Check';
function Payment() {
    return(
    <AppForm containerProps={{maxWidth: "xl"}}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        PAY
      </Typography>
      <Box component="form">
        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          Mode of Payment
        </Typography>
        <RadioGroup 
        
         >
          <FormControlLabel value={PAYMENT_METHOD.GCASH} control={<Radio color="info"/>} label="GCash" />
          <FormHelperText sx={{ml: 4, mt: -1.5}}>
            This will include a {GCashConfig.fee * 100}% surcharge fee.
          </FormHelperText>
        </RadioGroup>
        <Divider sx={{mt: 3, mb: 2}}/>
          <>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Sub total</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1"></Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary">Surcharge fee</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="body1"></Typography>
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item xs={2}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item xs textAlign="right">
                <Typography variant="h6"></Typography>
              </Grid>
            </Grid>
          </> :
          <PackageDetailsOptionSkeleton innerProps={{height: 35}}/>
        <Grid container>
          <Grid item xs>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              type="button"
              variant="outlined"
              href="/enter-details"
            >
              <NavigateBeforeIcon/> <span style={{marginRight: 15}}>Back</span>
            </FormButton>
          </Grid>
          <Grid item xs textAlign="right">
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              href = "view-carrental"
            >
              <span style={{marginLeft: 15}}>Pay Now</span> <CheckIcon fontSize="small" 
                sx={{mb: 0.3, ml: 0.3}}/>
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </AppForm>
    );
  };

export default Payment;