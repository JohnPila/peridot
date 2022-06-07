import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../../common/Typography';
import TextField from '../../common/TextField'; 

function DashboardContact() {
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>
      <Typography variant="h4" component="h4" align="center" gutterBottom>
          Contact Us
      </Typography>
      <Box
        component="img"
        src="/images/producBuoy.svg"
        alt="buoy"
        sx={{ width: 60 }}
      />
      <Box component="form" sx={{ maxWidth: 400 }}>
        <TextField
          noBorder
          placeholder="Your name"
          variant="outlined"
          sx={{ width: '100%', mt: 3, mb: 2 }}
        />
        <TextField
          noBorder
          placeholder="Your email"
          variant="outlined"
          sx={{ width: '100%', mt: 1, mb: 2 }}
        />
        <TextField
          noBorder
          placeholder="Your message"
          variant="outlined"
          sx={{ width: '100%', mt: 1, mb: 4 }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: '100%' }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default DashboardContact;
