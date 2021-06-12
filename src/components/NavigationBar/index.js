import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toastShow } from 'src/components/toastShow';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getCurrentUser } from 'src/store/selectors/user';
import LoginDialog from 'src/components/loginDialog';
import { auth } from '../../firebase';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: 52,
    width: '100%',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  },
  start: {},
  center: {},
  end: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 20px',
  },
});

const NavigationBar = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUser);

  const handleClickSignOutButton = () => {
    auth.signOut();
    toastShow({
      type: 'success',
      message: '登出成功！',
    });
  };

  const handleOpenLoginDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseLoginDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.start}>1</div>
        <div className={classes.center}>2</div>
        <div className={classes.end}>
          {currentUser ? (
            <Button color="primary" onClick={handleClickSignOutButton}>
              登出
            </Button>
          ) : (
            <Button color="primary" onClick={handleOpenLoginDialog}>
              登入
            </Button>
          )}
        </div>
      </div>
      <LoginDialog
        isOpen={isOpenDialog}
        handleClose={handleCloseLoginDialog}
      />
    </>
  );
};

export default NavigationBar;
