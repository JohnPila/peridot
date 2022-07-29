import { Grid, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";
import PropTypes from 'prop-types';
import FormButton from "../../../common/form/FormButton";

function SaveCarAddOption(props) {
    const {
      onConfirm,
      disabled = false,
    } = props;
  
    const [duration, setDuration] = useState("");
    const [rate, setRate] = useState(0);
    const [error, setError] = useState({
      duration: "",
      rate: "",
    });
  
    const confirm = () => {
      if (isValid()) {
        const data = {
          duration,
          rate,
        };
        onConfirm(data);
      }
    };
  
    const isValid = () => {
      const errMsg = {};
      if (!duration) {
        errMsg.duration = "Duration is required.";
      }
      if (!rate) {
        errMsg.rate = "Rate is required.";
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
        case "duration":
          setDuration(value);
          setError((err) => ({...err, duration: ""}));
          break;
        case "rate":
          setRate(parseInt(value));
          setError((err) => ({...err, rate: ""}));
          break;
        default:
          break;
      }
    };

    return (
      <Grid container spacing={1} sx={{mt: 0}}>
        <Grid item xs>
          <TextField error={!!error.duration} autoFocus fullWidth disabled={disabled} label="Duration" 
            variant="outlined" value={duration}
            helperText={error.duration}
            onChange={(e) => setValue("duration", e)} />
        </Grid>
        <Grid item xs={2}>
          <TextField error={!!error.rate} fullWidth disabled={disabled} label="Rate" 
            variant="outlined" type="number" value={rate} 
            helperText={error.rate}
            onChange={(e) => setValue("rate", e)} />
        </Grid>
        <Grid item xs={1} sx={{textAlign: "center"}}>
          <FormButton aria-label="save" title="Save option" color="success" type="button" disabled={disabled}
            onClick={confirm}>
            <CheckCircleIcon htmlColor="white" />
          </FormButton>
        </Grid>
      </Grid>
    );
  }
  
  SaveCarAddOption.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  export default SaveCarAddOption;