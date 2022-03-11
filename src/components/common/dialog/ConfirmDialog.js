import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../../store/reducers/common';
import FormButton from '../form/FormButton';

function ConfirmDialog(props) {
  const {
    title,
    content,
    callback,
  } = props;
  
  const dispatch = useDispatch();

  const handleConfirm = (confirm) => {
    if (callback) {
      callback(confirm);
    }
    dispatch(closeDialog());
  };

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
            {content}
          </DialogContentText>
        </DialogContent>
      }
      <DialogActions>
        <FormButton onClick={() => handleConfirm(false)} size="small" variant="outlined">Cancel</FormButton>
        <FormButton onClick={() => handleConfirm(true)} autoFocus size="small" color="warning">
          Confirm
        </FormButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  data: PropTypes.object,
};

export default ConfirmDialog;