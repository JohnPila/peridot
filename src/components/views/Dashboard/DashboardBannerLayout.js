import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const DashboardBannerLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '90vh', //edited from 80vh
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

function DashboardBannerLayout(props) {
  const { sxBackground, children } = props;
  
  const showBanner = useSelector(state => state.common.showBanner);

  return (
    <DashboardBannerLayoutRoot>
      <Container
        sx={{
          mt: showBanner ? 14 : 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="/images/productHeroWonder.png"
          alt="wonder"
          width="147"
          height="80"
        />
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Box
          component="img"
          src="/images/productHeroArrowDown.png"
          height="16"
          width="12"
          alt="arrow down"
          sx={{ position: 'absolute', bottom: 32 }}
        />
      </Container>
    </DashboardBannerLayoutRoot>
  );
}

DashboardBannerLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DashboardBannerLayout;
