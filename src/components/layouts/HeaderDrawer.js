import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import FirebaseConfig from '../../config/FirebaseConfig';
import { ADMIN_ROUTES, GENERAL_ROUTES, USER_ROUTES } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import withLoggedUser from '../hocs/withLoggedUser';

function HeaderDrawer(props) {
  const {
    isLoggedIn,
    isAdmin,
  } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const signOut = () => {
    FirebaseConfig.signOut()
      .then(() => {
        navigate("/sign-in", {replace: true});
      });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };
  
  const paths = isAdmin ? ADMIN_ROUTES : USER_ROUTES;
  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {paths.map((path) => (
              <ListItem button component={Link} key={path.name} to={path.path}>
                <ListItemIcon>
                  {path.icon}
                </ListItemIcon>
                <ListItemText primary={path.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {GENERAL_ROUTES.map(path => (
              <ListItem button component={Link} key={path.name} to={path.path}>
                <ListItemIcon>
                  {path.icon}
                </ListItemIcon>
                <ListItemText primary={path.name} />
              </ListItem>
            ))}
          </List>
          {isLoggedIn && 
            <>
              <Divider />
              <List>
                <ListItem button onClick={signOut}>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItem>
              </List>
            </>
          }
        </Box>
      </Drawer>
    </div>
  );
}

export default withLoggedUser(HeaderDrawer);