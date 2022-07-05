import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "../../theme/theme";
import { useSelector } from 'react-redux';
import { ROLES } from '../../utils/constants';
import AdminThemeProvider from '../../theme/admin';
import ScrollToTop from '../common/ScrollToTop';
import { BaseOptionChartStyle } from '../chart/BaseOptionChart';

export default function withRoot(Component) {
  function WithRoot(props) {
    const loggedUser = useSelector(state => state.loggedUser.user);
    const isLoggedIn = !!loggedUser;
    const isAdmin = isLoggedIn && ROLES.ADMIN === loggedUser.role;
    return (
      <div>
      {isAdmin &&
        <AdminThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
        </AdminThemeProvider>
      }
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
      </div>
    );
  }

  return WithRoot;
}
  