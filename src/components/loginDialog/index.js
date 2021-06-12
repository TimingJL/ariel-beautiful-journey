import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { auth } from 'src/firebase';
import { toastShow } from 'src/components/toastShow';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  dialogTitle: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0px',
    fontSize: 24,
    fontWeight: 500,
    color: '#9999FF',
  },
  loginButton: {
    background: '#9999FF',
    width: '100%',
    height: 48,
    margin: '40px 0px 20px',
    color: 'white',
    fontSize: 18,
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#9999FF',
      opacity: 0.7,
      transition: 'opacity 0.2s ease-in-out',
    },
  },
});

const LoginDialog = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLoginButton = () => {
    setIsLoading(true);
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // response is userCredential
        toastShow({
          type: 'success',
          message: '登入成功！',
        });
        handleClose();
        setIsLoading(false);
      })
      .catch((error) => {
        toastShow({
          type: 'error',
          message: error.message,
        });
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div className={classes.dialogTitle}>
          登入
        </div>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            label="密碼"
            type="password"
            fullWidth
            variant="outlined"
            style={{ marginTop: 16 }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            className={classes.loginButton}
            onClick={handleClickLoginButton}
            size="large"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : '登入'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
