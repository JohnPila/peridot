import { Container } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function withPage(Component) {
  function WithPage(props) {
    const showBanner = useSelector(state => state.common.showBanner);
    const isInitializedLoggedUser = useSelector(state => undefined !== state.loggedUser.user);

    return (
      <Container
        sx={{
          mt: showBanner ? 10 : 4,
          mb: 14,
        }}
      >
        {isInitializedLoggedUser && <Component {...props} />}
      </Container>
    );
  }

  return WithPage;
}
  