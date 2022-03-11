import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import FormButton from '../../../common/form/FormButton';

function SavePackageAddSubOption(props) {
    const {
      show = false,
      setShow,
      onConfirm,
      disabled = false,
    } = props;
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [error, setError] = useState({
      name: "",
      price: "",
    });
  
    useEffect(() => {
      if (!show) {
        setName("");
        setPrice(0);
      }
    }, [show]);
  
    const confirm = () => {
      if (isValid()) {
        onConfirm({name, price, isSubOption: true});
      }
    };
  
    const isValid = () => {
      const errMsg = {};
      if (!name) {
        errMsg.name = "Name is required.";
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
        case "name":
          setName(value);
          setError((err) => ({...err, name: ""}));
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
              <TextField error={!!error.name} autoFocus fullWidth disabled={disabled} label="Sub option" 
                variant="outlined" value={name}
                helperText={error.name}
                onChange={(e) => setValue("name", e)} />
            </Grid>
            <Grid item xs={2}>
              <TextField error={!!error.price} fullWidth disabled={disabled} label="Price" 
                variant="outlined" type="number" value={price} 
                helperText={error.price}
                onChange={(e) => setValue("price", e)} />
            </Grid>
            <Grid item xs={1} sx={{textAlign: "center"}}>
              <FormButton aria-label="save" title="Save sub option" color="success" type="button" disabled={disabled}
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
            <AddBoxIcon sx={{mr: 1}} /> Add sub option
          </FormButton>
        </Grid>
      </Grid>
    );
  }
  
  SavePackageAddSubOption.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  
  export default SavePackageAddSubOption;