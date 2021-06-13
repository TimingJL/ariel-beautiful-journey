import React from 'react';
import ReactQuill from 'react-quill';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import 'react-quill/dist/quill.snow.css';

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

  const handleOnEditorChange = (value) => {
    if (value === '<p><br></p>') {
      handleOnChange('');
    } else {
      handleOnChange(value);
    }
  };

  return (
    <ReactQuill
      className={classes.root}
      onChange={handleOnEditorChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'color', 'background',
        'link', 'image',
      ]}
    />
  );
};

export default RichTextEditor;
