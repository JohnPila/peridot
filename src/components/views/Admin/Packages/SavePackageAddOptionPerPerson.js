import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import FormButton from '../../../common/form/FormButton';

function SavePackageAddOptionPerPerson(props) {
    const {
      show = false,
      setShow,
      onConfirm,
      disabled = false,
    } = props;
    
    const [perPerson, setPerPerson] = useState("");
    const [price, setPrice] = useState(0);
    const [error, setError] = useState({
      perPerson: "",
      price: "",
    });
  
    useEffect(() => {
      if (!show) {
        setPerPerson("");
        setPrice(0);
      }
    }, [show]);
  
    const confirm = () => {
      if (isValid()) {
        onConfirm({perPerson, price});
      }
    };
  
    const isValid = () => {
      const errMsg = {};
      if (!perPerson) {
        errMsg.perPerson = "Per person is required.";
      }
      if (!price) {
        errMsg.price = "Price is required.";
      }
      if (Object.keys(errMsg).length > 0) {
        setError(errMsg);
        return false;
      }
      return true;
    };
  
    const setValue = (field, event) => {
      const value = event.target.value;
      switch (field) {
        case "perPerson":
          setPerPerson(value);
          setError((err) => ({...err, perPerson: ""}));
          break;
        case "price":
          setPrice(parseInt(value));
          setError((err) => ({...err, price: ""}));
          break;
        default:
          break;
      }
    };
  
    return (
      <Grid container spacing={1}>
        {show && 
          <>
            <Grid item xs>
              <TextField error={!!error.perPerson} autoFocus fullWidth disabled={disabled} label="Per Person" 
                variant="outlined" value={perPerson}
                helperText={error.perPerson}
                onChange={(e) => setValue("perPerson", e)} />
            </Grid>
            <Grid item xs={2}>
              <TextField error={!!error.price} fullWidth disabled={disabled} label="Price" 
                variant="outlined" type="number" value={price} 
                helperText={error.price}
                onChange={(e) => setValue("price", e)} />
            </Grid>
            <Grid item xs={1} sx={{textAlign: "center"}}>
              <FormButton aria-label="save" title="Save per person" color="success" type="button" disabled={disabled}
                onClick={confirm}>
                <CheckCircleIcon htmlColor="white" />
              </FormButton>
            </Grid>
          </>
        }
        <Grid item xs={12}>
          <FormButton color="warning" sx={{mb: 1, mt: 1}} 
            onClick={() => setShow(true)}
            disabled={show || disabled}>
            <AddBoxIcon sx={{mr: 1}} /> Add per person
          </FormButton>
        </Grid>
      </Grid>
    );
  }
  
  SavePackageAddOptionPerPerson.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  
  export default SavePackageAddOptionPerPerson;