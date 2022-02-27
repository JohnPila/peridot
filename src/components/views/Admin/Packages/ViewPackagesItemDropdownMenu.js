import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function DropdownMenu(props) {
  const {
    onSelect,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (action) => {
    handleClose();
    onSelect(action);
  };

  return (
    <>
      <IconButton 
        id="packageItemDropdownButton"
        aria-controls={open ? 'packageItemDropdownMenu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="packageItemDropdownMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'packageItemDropdownButton',
          sx: { width: 150, maxWidth: '100%' }
        }}
      >
        <MenuItem onClick={() => handleSelect("update")}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Update</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSelect("delete")}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

DropdownMenu.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default DropdownMenu;