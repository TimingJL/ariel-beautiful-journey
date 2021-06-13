/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable max-len */
import React from 'react';
import ReactQuill, { Quill } from 'react-quill'; // ES6
import { ImageUpload } from 'quill-image-upload';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageUpload', ImageUpload);

const getEditorHeight = ({ isSmallUp, isMediumUp, isLargeUp }) => {
  if (isLargeUp) {
    return 800;
  }
  if (isMediumUp) {
    return 500;
  }
  if (isSmallUp) {
    return 300;
  }
  return 300;
};

const useStyles = makeStyles(() => createStyles({
  root: (props) => ({
    '& > .ql-toolbar': {
      borderRadius: '4px 4px 0px 0px',
      background: '#FFFFFFdd',
    },
    '& > .ql-container': {
      borderRadius: '0px 0px 4px 4px',
      height: props.editorHeight,
    },
    '& > .ql-container > .ql-editor': {
      height: props.editorHeight,
    },
  }),
}));

const RichTextEditor = ({ handleOnChange }) => {
  const theme = useTheme();
  const isSmallUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeUp = useMediaQuery(theme.breakpoints.up('lg'));
  const editorHeight = getEditorHeight({
    isSmallUp, isMediumUp, isLargeUp,
  });
  const classes = useStyles({ editorHeight });

  const handleOnEditorChange = (editingValue) => {
    if (editingValue === '<p><br></p>') {
      handleOnChange('');
    } else {
      handleOnChange(editingValue);
    }
  };

  return (
    <ReactQuill
      className={classes.root}
      onChange={handleOnEditorChange}
      modules={{
        imageUpload: {
          url: 'https://api.imgur.com/3/image', // server url. If the url is empty then the base64 returns
          method: 'POST', // change query method, default 'POST'
          name: 'image', // custom form name
          withCredentials: false, // withCredentials
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
          },
          // personalize successful callback and call next function to insert new url to the editor
          callbackOK: (serverResponse, next) => {
            next(serverResponse.data.link);
          },
          // personalize failed callback
          callbackKO: (serverError) => {
            alert(serverError);
          },
          // optional
          // add callback when a image have been chosen
          checkBeforeSend: (file, next) => {
            console.log(file);
            next(file); // go back to component and send to the server
          },
        },
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'color', 'background',
        'link', 'image', 'video',
      ]}
    />
  );
};

export default RichTextEditor;
