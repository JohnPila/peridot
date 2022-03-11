import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { LOCATION_BASE_URL } from '../../../utils/constants';

const getPath = (category, parentValue) => {
  switch(category) {
    case "cities":
      return `/provinces/${parentValue}/cities-municipalities.json`;
    case "barangays":
      return `/cities-municipalities/${parentValue}/barangays.json`;
    default:
      return category;
  }
}

const getOptions = async (category, parentValue) => {
  try {
    const path = LOCATION_BASE_URL + getPath(category, parentValue);
    const result = await axios.get(path);
    return result.data;
  } catch(err) {
    console.error("Failed to get " + category + ".", err.message);
  }
};

function LocationPicker(props) {
  const {
    value,
    label = "City",
    category = "cities",
    // Cebu
    parentValue = "072200000",
    error,
    sx,
    onChange = () => {},
    disabled = false,
    ...otherProps
  } = props;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const _parentValue = useMemo(() => parentValue?.value || parentValue, [parentValue]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onChange("");
    if (_parentValue) {
      setLoading(true);
      getOptions(category, _parentValue)
        .then((data) => {
          setOptions(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setOptions([]);
    }
  }, [category, _parentValue]);

  const handleChange = (e, node) => {
    onChange({
      value: node.props.value,
      label: node.props.label,
    });
  };

  return(
    <FormControl sx={{flex: 1, ...sx}} error={!!error}>
      <InputLabel id={label.toLowerCase() + "Label"}>{label}</InputLabel>
      <Select
        labelId={label.toLowerCase() + "Label"}
        label={label}
        onChange={handleChange}
        disabled={loading || disabled}
        value={value?.value || value}
        {...otherProps}
      >
        {options.map((opt) => 
          <MenuItem key={opt.code} value={opt.code} label={opt.name}>{opt.name}</MenuItem>
        )}
      </Select>
      {error && 
        <FormHelperText error>{error}</FormHelperText>
      }
    </FormControl>
  );
}

LocationPicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  category: PropTypes.string,
  parentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  error: PropTypes.string,
  sx: PropTypes.object,
};

export default LocationPicker;