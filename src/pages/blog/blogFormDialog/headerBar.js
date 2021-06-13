import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from 'src/components/confirmDialog';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    color: 'white',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const HeaderBar = ({
  title,
  isDirty,
  handleClose, handleClickSaveButton,
}) => {
  const classes = useStyles();
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleClickCloseButton = () => {
    if (!isDirty) {
      handleClose();
      return;
    }
    setIsOpenConfirm(true);
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClickCloseButton} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClickSaveButton}>
            儲存
          </Button>
        </Toolbar>
      </AppBar>
      {isOpenConfirm && (
      <ConfirmDialog
        title="確認是否離開？"
        description="是否捨棄尚未儲存的編輯內容？"
        isOpen={isOpenConfirm}
        handleClose={() => setIsOpenConfirm(false)}
        handleConfirm={handleClose}
      />
      )}
    </>
  );
};

export default HeaderBar;
