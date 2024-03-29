import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../../common/Typography';
import { email, required } from '../../common/form/validation';
import RFTextField from '../../common/form/RFTextField';
import FormButton from '../../common/form/FormButton';
import FormFeedback from '../../common/form/FormFeedback';
import AppForm from '../../common/AppForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FirebaseConfig from '../../../config/FirebaseConfig';

function SignUp() {
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
    const errors = required(['firstName', 'lastName', 'email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    FirebaseConfig.registerWithEmail(e)
      .then(() => {
        setSent(true);
      });
  };

  return (
    <AppForm sx={{backgroundImage: "url(https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg)"}}
      paperSx={{backgroundColor: "rgba(255, 245, 248, 0.8)"}}>
      <>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign Up
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/sign-in/" underline="always">
            Already have an account?
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  autoComplete="given-name"
                  fullWidth
                  label="First name"
                  name="firstName"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={RFTextField}
                  disabled={submitting || sent}
                  autoComplete="family-name"
                  fullWidth
                  label="Last name"
                  name="lastName"
                  required
                />
              </Grid>
            </Grid>
            <Field
              autoComplete="email"
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="new-password"
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
              color="secondary"
              fullWidth
            >
              {submitting || sent ? 'In progress…' : 'Sign Up'}
            </FormButton>
          </Box>
        )}
      </Form>
    </AppForm>
  );
}

export default SignUp;
