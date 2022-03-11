import { FormControlLabel, FormHelperText, Grid, InputLabel, Switch, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from "react";
import PropTypes from 'prop-types';
import FormButton from "../../../common/form/FormButton";
import SavePackageAddSubOption from "./SavePackageAddSubOption";

function SavePackageAddOption(props) {
    const {
      onConfirm,
      disabled = false,
    } = props;
  
    const [name, setName] = useState("");
    const [subOptions, setSubOptions] = useState([]);
    const [price, setPrice] = useState(0);
    const [useSubOption, setUseSubOption] = useState(false);
    const [showSubOption, setShowSubOption] = useState(false);
    const [error, setError] = useState({
      name: "",
      price: "",
      subOptions: "",
    });
  
    const confirm = () => {
      if (isValid()) {
        const data = {
          name,
          isSubOption: false,
          hasSubOptions: useSubOption,
        };
        if (useSubOption) {
          data.subOptions = subOptions;
        } else {
          data.price = price;
        }
        onConfirm(data);
      }
    };
  
    const isValid = () => {
      const errMsg = {};
      if (!name) {
        errMsg.name = "Name is required.";
      }
      if (!useSubOption && !price) {
        errMsg.price = "Price is required.";
      }
      if (useSubOption && 0 === subOptions.length) {
        errMsg.subOptions = "Sub option is required.";
      }
      if (Object.keys(errMsg).length > 0) {
        setError(errMsg);
        return false;
      }
      return true;
    };
  
    const setValue = (field, event) => {
      const value = null != event?.target?.value ? event.target.value : event;
      switch (field) {
        case "name":
          setName(value);
          setError((err) => ({...err, name: ""}));
          break;
        case "subOption":
          setSubOptions((val) => ([...val, value]));
          setShowSubOption(false);
          setError((err) => ({...err, subOptions: ""}));
          break;
        case "price":
          setPrice(parseInt(value));
          setError((err) => ({...err, price: ""}));
          break;
        default:
          break;
      }
    };
    
    const removeSubOption = (index) => {
      setSubOptions((option) => {
        option.splice(index, 1);
        return [...option];
      });
    };
  
    return (
      <Grid container spacing={1} sx={{mt: 0}}>
        <Grid item xs>
          <TextField error={!!error.name} autoFocus fullWidth disabled={disabled} label="Name" 
            variant="outlined" value={name}
            helperText={error.name}
            onChange={(e) => setValue("name", e)} />
        </Grid>
        {!useSubOption && 
          <Grid item xs={2}>
            <TextField error={!!error.price} fullWidth disabled={disabled} label="Price" 
              variant="outlined" type="number" value={price} 
              helperText={error.price}
              onChange={(e) => setValue("price", e)} />
          </Grid>
        }
        <Grid item xs={1} sx={{textAlign: "center"}}>
          <FormButton aria-label="save" title="Save option" color="success" type="button" disabled={disabled}
            onClick={confirm}>
            <CheckCircleIcon htmlColor="white" />
          </FormButton>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={
            <Switch checked={useSubOption} color="blue" disabled={disabled}
              onChange={(e) => setUseSubOption(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }} />
          } label={<InputLabel sx={{mt: 1, mb: 1}}>Per Person</InputLabel>}/>
          {error.subOptions && 
            <FormHelperText error>
              {error.subOptions}
            </FormHelperText> 
          }
        </Grid>
        {useSubOption &&
          <>
            {subOptions.length > 0 &&
              <Grid item xs={12}>
                {subOptions.map((subOption, index) => (
                  <Grid container spacing={1} sx={{mb: index === subOptions.length - 1 ? 0 : 1}} key={index}>
                    <Grid item xs>
                      <TextField fullWidth label="Name" variant="outlined" value={subOption.name}
                        InputProps={{readOnly: true}} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Price" variant="outlined" type="number" value={subOption.price} 
                        InputProps={{readOnly: true}} />
                    </Grid>
                    <Grid item xs={1} sx={{textAlign: "center"}}>
                      <FormButton aria-label="delete" title="Remove option" color="error" disabled={disabled}
                        onClick={() => removeSubOption(index)}>
                        <RemoveCircleIcon htmlColor="white"/>
                      </FormButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            }
            <Grid item xs={12}>
              <SavePackageAddSubOption 
                show={showSubOption} 
                setShow={setShowSubOption} 
                onConfirm={(v) => setValue("subOption", v)} 
                disabled={disabled}
              />
            </Grid>
          </>
        }
      </Grid>
    );
  }
  
  SavePackageAddOption.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  export default SavePackageAddOption;