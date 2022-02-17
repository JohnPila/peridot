import * as React from 'react';
import Button from '../../common/Button';
import Typography from '../../common/Typography';
import DashboardBannerLayout from './DashboardBannerLayout';

const backgroundImage =
  'https://www.travelingcebu.com/images/kawasan-falls-aerial-view.jpg';

export default function DashboardBanner() {
  return (
    <DashboardBannerLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Experience the impossible
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Enjoy secret offers up to 30% off the best tourist spot in Cebu.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Book now
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </DashboardBannerLayout>
  );
}
