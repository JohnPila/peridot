import * as React from 'react';
import Box from '@mui/material/Box';
import { Alert, Collapse, IconButton, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import FirebaseConfig from '../../config/FirebaseConfig';
import { setShowBanner } from '../../store/reducers/common';

export default function HeaderBanner() {
  const isEmailVerified = useSelector(state => state.loggedUser.user?.emailVerified);
  const showBanner = useSelector(state => state.common.showBanner);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (dispatch) {
      dispatch(setShowBanner(!isEmailVerified));
    }
  }, [isEmailVerified, dispatch]);

  const resendEmailConfirmation = (e) => {
    e.preventDefault();
    FirebaseConfig.sendEmailVerification();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={showBanner}>
        <Alert
          variant="filled"
          severity="error"
          color="error"
          action={
            <IconButton
              aria-label="close"
              color="default"
              size="small"
              onClick={() => {
                dispatch(setShowBanner(false));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{borderRadius: 0, fontWeight: "normal"}}
        >
          Your email is not verified yet. Kindly check your email or click <Link href="#" onClick={resendEmailConfirmation}>here</Link> to resend.
        </Alert>
      </Collapse>
    </Box>
  );
}