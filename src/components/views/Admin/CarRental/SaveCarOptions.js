import { FormHelperText, Grid, TextField } from "@mui/material";
import { useState } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveCarAddOption from "./SaveCarAddOption";
import PropTypes from 'prop-types';
import FormButton from "../../../common/form/FormButton";

function SaveCarOptions(props) {
  const {
    options = [],
    onChange,
    error,
    disabled = false,
  } = props;

  const [showAdd, setShowAdd] = useState(false);

  const addOption = (option) => {
    setShowAdd(false);
    onChange([...options, option]);
  };

  const removeOption = (index) => {
    options.splice(index, 1);
    onChange([...options]);
  };

  return (
    <>
      {options.map((option, index) => (
        <Grid container spacing={1} sx={{mb: index === options.length - 1 ? 0 : 1}} key={index}>
          <Grid item xs>
            <TextField fullWidth label="Duration" disabled={disabled} 
              variant="outlined" value={option.duration}
              InputProps={{readOnly: true}} />
          </Grid>
          {!option.subOptions &&
            <Grid item xs={2}>
              <TextField fullWidth label="Rate" disabled={disabled} 
                variant="outlined" type="number" value={option.rate} 
                InputProps={{readOnly: true}} />
            </Grid>
          }
          <Grid item xs={1} sx={{textAlign: "center"}}>
            <FormButton aria-label="delete" title="Remove option" color="error" disabled={disabled}
              onClick={() => removeOption(index)}>
              <RemoveCircleIcon htmlColor="white"/>
            </FormButton>
          </Grid>
          <Grid item xs={12}>
            <hr/>
          </Grid>
        </Grid>
      ))}
      {showAdd && 
        <SaveCarAddOption onConfirm={addOption} disabled={disabled} />
      }
      <FormButton color="warning" sx={{mb: 1, mt: 1}} 
        onClick={() => setShowAdd(true)}
        disabled={showAdd || disabled}>
        <AddBoxIcon sx={{mr: 1}} /> Add option
      </FormButton>
      {error && 
        <FormHelperText error>
          {error}
        </FormHelperText>
      }
    </>
  );
}

SaveCarOptions.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SaveCarOptions;