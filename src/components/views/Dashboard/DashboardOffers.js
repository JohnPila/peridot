import * as React from 'react';
import { listenAllFeedback } from '../../../services/FeedbackService';
import { useEffect, useState, useRef } from 'react';
import Typography from '../../common/Typography';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import { Box } from '@mui/system';
import CardContent from 'semantic-ui-react/dist/commonjs/views/Card/CardContent';
import TestimonialCard from "material-testimonial-card";
import Container from '@mui/system/Container';
import { Grid } from '@mui/material';
//import Carousel from 'react-material-ui-carousel/dist/components/Carousel';

function DashboardOffers() {
  const unsubscribeRef = useRef(null);
  const [feedback,setFeedback] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getAllFeedback();
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const getAllFeedback = async () => {
    unsubscribeRef.current = await listenAllFeedback(setFeedback);
  };

  return (
    <Container component="section" sx={{ mt: 10, flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center' }}>
    <Grid container>
      <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'warning.main',
            py: 8,
            px: 3,
          }}
        >

          <Box component="form" sx={{ maxWidth: 400 }}>
          <Card>
            <CardContent sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, height: "100%" }}>
              {feedback ? feedback.map((data) => (
            <TestimonialCard
                  name={"John Smith"}
                  //image={"/path/to/image.jpg"}
                  content={data.feedback}
                  project={"Testimonial card"}
              />
            
              )): <Typography> empty</Typography>}
          </Box>
        </CardContent>
      </Card>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Container>
    // <Container component="section" sx={{ mt: 10, display: 'flex' }}>
    //   <Grid container>
    //   {feedback ? feedback.map((data) => (
    //       <Typography >{data.feedback}</Typography>
    //     )): <Typography> empty</Typography>}
    //   </Grid>
    // </Container>
  );
}

export default DashboardOffers;
