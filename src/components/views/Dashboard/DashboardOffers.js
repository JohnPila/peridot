import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../../common/Typography';
import TextField from '../../common/TextField';
import Snackbar from '../../common/Snackbar';
import Button from '../../common/Button';
import { getAllFeedback, listenAllFeedback } from '../../../services/FeedbackService';
import { useEffect, useState, useRef } from 'react';

function DashboardOffers() {
  const [open, setOpen] = React.useState(false);
  const unsubscribeRef = useRef(null);
  const [feedback, setFeedback] = useState(null);

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
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
      {feedback ? feedback.map((data) => (
          <Typography >{data.feedback}</Typography>
        )): <Typography> empty</Typography>}
      </Grid>
    </Container>
  );
}

export default DashboardOffers;
