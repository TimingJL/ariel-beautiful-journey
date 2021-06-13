import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { toastShow } from 'src/components/toastShow';
import RichTextEditor from 'src/components/richTextEditor';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#8b8bff',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  contentWrapper: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 900,
    marginTop: 32,
    marginBottom: 12,
  },
  formGroup: {
    width: '100%',
    maxWidth: 992,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const BlogFormDialog = ({ title, isOpen, handleClose }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleClickSaveButton = () => {
    console.log('value: ', value);
    toastShow({
      type: 'success',
      message: '儲存成功！',
    });
  };

  const handleOnEditorChange = (textValue) => {
    setValue(textValue);
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
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
      <div className={classes.contentWrapper}>
        <div className={classes.formGroup}>
          <div>
            <div className={classes.label}>標題：</div>
            <TextField
              autoFocus
              label="標題"
              fullWidth
              variant="outlined"
              onChange={() => null}
            />
          </div>
          <div>
            <div className={classes.label}>內容：</div>
            <RichTextEditor handleOnChange={handleOnEditorChange} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BlogFormDialog;
