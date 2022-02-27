import { FormControlLabel, FormHelperText, Grid, InputLabel, Switch, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SavePackageAddOptionPerPerson from "./SavePackageAddOptionPerPerson";
import { useState } from "react";
import PropTypes from 'prop-types';
import FormButton from "../../../common/form/FormButton";

function SavePackageAddOption(props) {
    const {
      onConfirm,
      disabled = false,
    } = props;
  
    const [groupSize, setGroupSize] = useState("");
    const [perPersons, setPerPersons] = useState([]);
    const [price, setPrice] = useState(0);
    const [usePerPerson, setUsePerPerson] = useState(false);
    const [showPerPerson, setShowPerPerson] = useState(false);
    const [error, setError] = useState({
      groupSize: "",
      price: "",
      perPersons: "",
    });
  
    const confirm = () => {
      if (isValid()) {
        const data = {
          groupSize,
        };
        if (usePerPerson) {
          data.perPersons = perPersons;
        } else {
          data.price = price;
        }
        onConfirm(data);
      }
    };
  
    const isValid = () => {
      const errMsg = {};
      if (!groupSize) {
        errMsg.groupSize = "Group size is required.";
      }
      if (!usePerPerson && !price) {
        errMsg.price = "Price is required.";
      }
      if (usePerPerson && 0 === perPersons.length) {
        errMsg.perPersons = "Per person is required.";
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
        case "groupSize":
          setGroupSize(value);
          setError((err) => ({...err, groupSize: ""}));
          break;
        case "perPerson":
          setPerPersons((val) => ([...val, value]));
          setShowPerPerson(false);
          setError((err) => ({...err, perPersons: ""}));
          break;
        case "price":
          setPrice(parseInt(value));
          setError((err) => ({...err, price: ""}));
          break;
        default:
          break;
      }
    };
    
    const removePerPerson = (index) => {
      setPerPersons((per) => {
        per.splice(index, 1);
        return [...per];
      });
    };
  
    return (
      <Grid container spacing={1} sx={{mt: 0}}>
        <Grid item xs>
          <TextField error={!!error.groupSize} autoFocus fullWidth disabled={disabled} label="Group Size" 
            variant="outlined" value={groupSize}
            helperText={error.groupSize}
            onChange={(e) => setValue("groupSize", e)} />
        </Grid>
        {!usePerPerson && 
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
            <Switch checked={usePerPerson} color="blue" disabled={disabled}
              onChange={(e) => setUsePerPerson(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }} />
          } label={<InputLabel sx={{mt: 1, mb: 1}}>Per Person</InputLabel>}/>
          {error.perPersons && 
            <FormHelperText error>
              {error.perPersons}
            </FormHelperText> 
          }
        </Grid>
        {usePerPerson &&
          <>
            {perPersons.length > 0 &&
              <Grid item xs={12}>
                {perPersons.map((per, index) => (
                  <Grid container spacing={1} sx={{mb: index === perPersons.length - 1 ? 0 : 1}}>
                    <Grid item xs>
                      <TextField fullWidth label="Per Person" variant="outlined" value={per.perPerson}
                        InputProps={{readOnly: true}} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Price" variant="outlined" type="number" value={per.price} 
                        InputProps={{readOnly: true}} />
                    </Grid>
                    <Grid item xs={1} sx={{textAlign: "center"}}>
                      <FormButton aria-label="delete" title="Remove option" color="error" disabled={disabled}
                        onClick={() => removePerPerson(index)}>
                        <RemoveCircleIcon htmlColor="white"/>
                      </FormButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            }
            <Grid item xs={12}>
              <SavePackageAddOptionPerPerson 
                show={showPerPerson} 
                setShow={setShowPerPerson} 
                onConfirm={(v) => setValue("perPerson", v)} 
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