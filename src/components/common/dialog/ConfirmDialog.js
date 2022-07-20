import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../../store/reducers/common';
import { DIALOG_TYPE_VARIANT } from '../../../utils/constants';
import FormButton from '../form/FormButton';

function ConfirmDialog(props) {
  const {
    title,
    options: {
      variant,
      closeButtonTitle,
      confirmButtonTitle,
      fieldProps,
    },
    content,
    callback,
  } = props;
  
  const dispatch = useDispatch();
  const [text, setText] = useState();

  const handleConfirm = (confirm) => {
    if (callback) {
      callback(confirm, text);
    }
    dispatch(closeDialog());
  };

  const getColor = () => {
    switch (variant) {
      case DIALOG_TYPE_VARIANT.WARNING:
        return "warning";
      case DIALOG_TYPE_VARIANT.ERROR:
        return "error";
      case DIALOG_TYPE_VARIANT.SUCCESS:
        return "success";
      default:
        return "info";
    }
  }

  return (
    <Dialog
      open
      onClose={() => handleConfirm(false)}
      maxWidth="sm"
      fullWidth
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-content"
    >
      <DialogTitle id="confirm-dialog-title">
        {title}
      </DialogTitle>
      {content && 
        <DialogContent>
          <DialogContentText id="confirm-dialog-content">
            <div dangerouslySetInnerHTML={{__html: content}} />
          </DialogContentText>
          {fieldProps && 
            <TextField type="text" sx={{mt: 1}} fullWidth 
              {...fieldProps} 
              value={text} 
              onChange={(e) => setText(e.target.value)} />
          }
        </DialogContent>
      }
      <DialogActions>
        <FormButton onClick={() => handleConfirm(false)} size="small" variant="outlined">
          {closeButtonTitle || "Cancel"}
        </FormButton>
        <FormButton onClick={() => handleConfirm(true)} autoFocus size="small" color={getColor()}>
          {confirmButtonTitle || "Confirm"}
        </FormButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  data: PropTypes.object,
};

export default ConfirmDialog;