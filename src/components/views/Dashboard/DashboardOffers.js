import * as React from 'react';
import { listenAllFeedback } from '../../../services/FeedbackService';
import { useEffect, useState, useRef } from 'react';
import Typography from '../../common/Typography';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import { Box } from '@mui/system';
import CardContent from 'semantic-ui-react/dist/commonjs/views/Card/CardContent';
import { CardActionArea } from '@mui/material';

function DashboardOffers() {
  const unsubscribeRef = useRef(null);
  const [setFeedback] = useState(null);

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
    <Card sx={{ display: 'flex' }}>
      <CardActionArea sx={{ display: 'flex' }} >
        <Box sx={{ flex: 1, height: "100%" }}>
          <CardContent sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
      
              <>
                <Typography component="div" variant="h5">
                  afsdf
                </Typography>
                <Typography variant="body1" color="text.secondary" component="div">
                 asdfa
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
             
                </Typography>
              </>:
        
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
    // <Card>
    //   <CardContent sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
    //   <Box sx={{ flex: 1, height: "100%" }}>
    //     {feedback ? feedback.map((data) => (
    //     <TestimonialCard
    //         name={"John Smith"}
    //         image={"/path/to/image.jpg"}
    //         content={data.feedback}
    //         project={"Testimonial card"}
    //     />
        
    //     )): <Typography> empty</Typography>}
    //     </Box>
    //   </CardContent>
    // </Card>
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
