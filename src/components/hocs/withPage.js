import { Container } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function withPage(Component) {
  function WithPage(props) {
    const showBanner = useSelector(state => state.common.showBanner);

    return (
      <Container
        sx={{
          mt: showBanner ? 10 : 4,
          mb: 14,
        }}
      >
        <Component {...props} />
      </Container>
    );
  }

  return WithPage;
}
  