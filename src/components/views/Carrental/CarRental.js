import * as React from 'react';
//import { Field, Form, FormSpy } from 'react-final-form';
//import Box from '@mui/material/Box';
//import Link from '@mui/material/Link';
import Typography from '../../common/Typography';
import AppForm from '../../common/AppForm';
//import { email, required } from '../../common/form/validation';
//import RFTextField from '../../common/form/RFTextField';
//import FormButton from '../../common/form/FormButton';
//import FormFeedback from '../../common/form/FormFeedback';
//import FirebaseConfig from '../../../config/FirebaseConfig';
//import IconButtonBox from '../../common/IconButtonBox';
//import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';



export default function CarRental(){
    return(
        <AppForm sx={{backgroundImage: "url(https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg)"}}
      paperSx={{backgroundColor: "rgba(255, 245, 248, 0.8)"}}>
        <>
            <Typography variant="h3" gutterBottom marked="center" align="center">
            Car Rental Booking
            </Typography>
        </>
        
           
      </AppForm>
    )
}
