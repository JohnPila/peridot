import { useMemo } from "react";
import PropTypes from 'prop-types';
import { Box } from "@mui/material";

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

function IconButtonBox(props) {
  const {
    children,
    color = "warning",
    sx,
    ...otherProps
  } = props;
  const newStyle = useMemo(() => ({
    ...iconStyle,
    backgroundColor: `${color}.main`,
    '&:hover': {
      bgcolor: `${color}.dark`,
    },
    ...sx
  }), [color, sx]);

  return (
    <Box component="a" href="#" sx={newStyle} {...otherProps}>
      {children}
    </Box>
  );
}

IconButtonBox.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default IconButtonBox;