import { IconButton, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
function DropdownMenu(props) {
  const {
    value,
    onChange = () => {},
    options = [],
    disabled = false,
    ...otherProps
  } = props;
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event, option) => {
    event.preventDefault();
    event.stopPropagation();
    onChange(option);
    handleClose();
  };

  return (
    <div {...otherProps}>
      <IconButton 
        aria-label="Options"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disabled={disabled}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} 
            selected={option.id === value?.id}
            onClick={(e) => handleSelect(e, option)}>
            {option.content}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

DropdownMenu.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
};

export default DropdownMenu;