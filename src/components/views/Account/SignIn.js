import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../../common/Typography';
import AppForm from '../../common/AppForm';
import { email, required } from '../../common/form/validation';
import RFTextField from '../../common/form/RFTextField';
import FormButton from '../../common/form/FormButton';
import FormFeedback from '../../common/form/FormFeedback';
import FirebaseConfig from '../../../config/FirebaseConfig';
import IconButtonBox from '../../common/IconButtonBox';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => !!state.loggedUser.user);

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/", {replace: true});
    }
  }, [isLoggedIn]);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    FirebaseConfig.signInWithEmail(e.email, e.password)
      .then(() => {
        setSent(true);
      });
  };

  const loginWithFacebook = (e) => {
    e.preventDefault();
    FirebaseConfig.signInWithFacebook();
  };

  return (
    <AppForm sx={{backgroundImage: "url(https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg)"}}
      paperSx={{backgroundColor: "rgba(255, 245, 248, 0.8)"}}>
      <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign In
          </Typography>
          <Typography variant="body2" align="center">
          {'Not a member yet? '}
          <Link
              href="/sign-up/"
              align="center"
              underline="always"
          >
              Sign Up here
          </Link>
          </Typography>
      </>
      <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
      >
          {({ handleSubmit: handleSubmit2, submitting }) => (
          <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
              autoComplete="email"
              autoFocus
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
              size="large"
              />
              <Field
              fullWidth
              size="large"
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="current-password"
              label="Password"
              type="password"
              margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                  submitError ? (
                  <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                  </FormFeedback>
                  ) : null
              }
              </FormSpy>
              <FormButton
              sx={{ mt: 3, mb: 2 }}
              disabled={submitting || sent}
              size="large"
              color="secondary"
              fullWidth
              >
              {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
          </Box>
          )}
      </Form>
      <Typography variant="body2" align="center">
        or sign in using
      </Typography>
      <div style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <IconButtonBox color="blue" sx={{mt: 1}} onClick={loginWithFacebook} type="button">
          <img
            src="/images/appFooterFacebook.png"
            alt="Facebook"
          />
        </IconButtonBox>
      </div>
      <Typography sx={{mt: 2}}>
        <Link underline="always" href="/forgot-password/">
          Forgot password?
        </Link>
      </Typography>
    </AppForm>
  );
}

export default SignIn;
