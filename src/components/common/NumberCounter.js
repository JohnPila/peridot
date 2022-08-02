import PropTypes from 'prop-types';
import Typography from './Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';
import FormButton from './form/FormButton';

function NumberCounter(props) {
  const {
    value = 0,
    onChange = () => {},
    min,
    max,
    disabled = false,
  } = props;

  return (
    <ButtonGroup>
      <FormButton
        sx={{px: 1}}
        aria-label="decrement"
        disabled={disabled || (!value || (null != min && min === value))}
        onClick={() => {
          onChange(Math.max(value - 1, 0));
        }}
        size="small"
        variant="outlined"
        type="button"
      >
        <RemoveIcon fontSize="small" />
      </FormButton>
      <Button
        aria-label="number"
        disabled
        size="small"
      >
        <Typography variant="h6">{value}</Typography>
      </Button>
      <FormButton
        sx={{px: 1}}
        aria-label="increment"
        disabled={disabled || (null != max && max === value)}
        onClick={() => {
          onChange(value + 1);
        }}
        size="small"
        variant="outlined"
        type="button"
      >
        <AddIcon fontSize="small" />
      </FormButton>
    </ButtonGroup>
  );
}

NumberCounter.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
};

export default NumberCounter;