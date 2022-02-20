import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from './Paper';

function AppForm(props) {
  const { 
    children,
    containerProps,
    paperSx,
    sx,
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundImage: 'url(/images/appCurvyLines.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        ...sx,
      }}
    >
      <Container maxWidth="sm" {...containerProps}>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Paper
            background="light"
            sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 }, ...paperSx }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
  containerProps: PropTypes.object,
  paperSx: PropTypes.object,
  sx: PropTypes.object,
};

export default AppForm;
