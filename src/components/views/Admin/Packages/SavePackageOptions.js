import { FormHelperText, Grid, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SavePackageAddOption from "./SavePackageAddOption";
import PropTypes from 'prop-types';
import FormButton from "../../../common/form/FormButton";

function SavePackageOptions(props) {
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

  const removeSubOption = (optIndex, index) => {
    const option = {...options[optIndex]};
    option.subOptions.splice(index, 1);
    options.splice(optIndex, 1, option);
    onChange([...options]);
  };
  
  return (
    <>
      {options.map((option, index) => (
        <Grid container spacing={1} sx={{mb: index === options.length - 1 ? 0 : 1}} key={index}>
          <Grid item xs>
            <TextField fullWidth label="Group Size" disabled={disabled} 
              variant="outlined" value={option.name}
              InputProps={{readOnly: true}} />
          </Grid>
          {!option.subOptions &&
            <Grid item xs={2}>
              <TextField fullWidth label="Price" disabled={disabled} 
                variant="outlined" type="number" value={option.price} 
                InputProps={{readOnly: true}} />
            </Grid>
          }
          <Grid item xs={1} sx={{textAlign: "center"}}>
            <FormButton aria-label="delete" title="Remove option" color="error" disabled={disabled}
              onClick={() => removeOption(index)}>
              <RemoveCircleIcon htmlColor="white"/>
            </FormButton>
          </Grid>
          {option.subOptions?.length > 0 && 
            <Grid item xs={12}>
              <InputLabel sx={{mb: 1}}>Per Persons</InputLabel>
              {option.subOptions.map((subOption, ppIndex) => (
                <Grid container spacing={1} sx={{mb: ppIndex === option.subOptions.length - 1 ? 0 : 1}} key={`${index}-${ppIndex}`}>
                  <Grid item xs={9}>
                    <TextField autoFocus fullWidth label="Sub option" 
                      variant="outlined" value={subOption.name}
                      InputProps={{readOnly: true}} />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField fullWidth label="Price" 
                      variant="outlined" type="number" value={subOption.price} 
                      InputProps={{readOnly: true}} />
                  </Grid>
                  <Grid item xs={1} sx={{textAlign: "center"}}>
                    <FormButton aria-label="delete" title="Remove sub option" color="error"
                      disabled={1 === option.subOptions.length || disabled}
                      onClick={() => removeSubOption(index, ppIndex)}>
                      <RemoveCircleIcon htmlColor="white" />
                    </FormButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          }
          <Grid item xs={12}>
            <hr/>
          </Grid>
        </Grid>
      ))}
      {showAdd && 
        <SavePackageAddOption onConfirm={addOption} disabled={disabled} />
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

SavePackageOptions.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SavePackageOptions;