import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import FirebaseConfig from '../config/FirebaseConfig';

export default function HeaderDrawer() {
    const [isOpen, setIsOpen] = React.useState(false);
    const isLoggedIn = useSelector(state => !!state.loggedUser.user);
  
    const signOut = () => {
      FirebaseConfig.signOut();
    };
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setIsOpen(open);
    };
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
              {['Packages', 'Reviews'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <TravelExploreIcon /> : <ReviewsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Contact Us', 'About Us'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <MailIcon /> : <PeopleAltIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
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