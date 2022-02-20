import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../common/AppBar';
import Toolbar from '../common/Toolbar';
import HeaderDrawer from './HeaderDrawer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from '@mui/material';
import { ROLES } from '../../utils/constants';
import HeaderBanner from './HeaderBanner';
import VerifiedIcon from '@mui/icons-material/Verified';

const rightLink = {
  fontSize: 15,
  color: 'common.white',
  ml: 3,
};

function Header() {
  const location = useLocation();
  const path = React.useMemo(() => 
    location.pathname.replaceAll(/^\/|\/$/gi, ""),
  [location]);
  const loggedUser = useSelector(state => state.loggedUser.user);
  const isLoggedIn = !!loggedUser;
  const initializedLoggedUser = loggedUser !== undefined;
  const isAdmin = isLoggedIn && ROLES.ADMIN === loggedUser.role;
  const isEmailVerified = isLoggedIn && loggedUser.emailVerified;
  return (
    <div>
      <AppBar position="fixed">
        {isLoggedIn && 
          <HeaderBanner/>
        }
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <HeaderDrawer/>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Peridot 4ever Travel and Tours inc'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {initializedLoggedUser && 
              <>
                {!isLoggedIn && path !== "sign-in" &&
                  <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    href="/sign-in/"
                    sx={rightLink}
                  >
                    {'Sign In'}
                  </Link>
                }
                {!isLoggedIn && path !== "sign-up" &&
                  <Link
                    variant="h6"
                    underline="none"
                    href="/sign-up/"
                    sx={{ ...rightLink, color: 'secondary.main' }}
                  >
                    {'Sign Up'}
                  </Link>
                }
                {isLoggedIn && 
                  <>
                    {isAdmin ?
                      <Avatar alt={loggedUser.displayName} sx={{ bgcolor: "blue.main" }}>A</Avatar>:
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={isEmailVerified &&
                          <VerifiedIcon color="success" fontSize="small"/>
                        }
                      >
                        <Avatar alt={loggedUser.displayName} src={loggedUser.photoURL} />
                      </Badge>
                    }
                  </>
                }
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Header;
