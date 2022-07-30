import * as React from 'react';
import Typography from '@mui/material/Typography';
import Feed from "@mui/material/Popover";
import FormButton from '../../../common/form/FormButton';
import { Box, Grid, InputLabel, TextField} from "@mui/material";
//import AppForm from "../../common/AppForm";
function Feedback() {
	return(
    <Grid container>
        <Box>
            <Grid item xs>
                <Typography variant="h3" gutterBottom marked="center" align="center">Comments and Feedback *</Typography>
                        <TextField  autoFocus size="large" 
                        fullWidth sx={{mb: 1}} 
                        />
            </Grid>
        
                <FormButton
                sx={{ mt: 3, mb: 2 }}
                align="center"
                color="secondary"   
                
            >
                <span style={{marginRight: 15}}>Submit</span>
             
            </FormButton>
        </Box>
    </Grid>   
    )
}
export default Feedback;