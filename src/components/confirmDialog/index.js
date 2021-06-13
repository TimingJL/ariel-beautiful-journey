import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({
  title, description, isOpen, handleClose, handleConfirm,
}) => (
  <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        取消
      </Button>
      <Button onClick={handleConfirm} color="primary">
        確定
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
