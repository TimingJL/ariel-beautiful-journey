import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// Ref:
// https://weianofsteel.medium.com/10minutes-handle-react-draft-wysiwyg-97278ff899a4

// Upload using imgur
// https://codingshiksha.com/react/react-js-wysiwyg-rich-text-editor-with-image-upload-of-imgur-api-using-draft-js-full-tutorial/

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

const useStyles = makeStyles({
  container: {
    padding: '20px 0px',
  },
  toolbarClassName: {
    border: 'none',
    borderBottom: '1px solid #eee',
  },
  wrapperClassName: {
    border: '1px solid #eee',
  },
  editorClassName: (props) => ({
    padding: '0px 20px',
    height: props.editorHeight,
  }),
});

const RichTextEditor = ({ htmlString = '', handleOnChange }) => {
  const contentBlock = htmlToDraft(htmlString);
  const [editorState, setEditorState] = useState(() => {
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });
  const theme = useTheme();
  const isSmallUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeUp = useMediaQuery(theme.breakpoints.up('lg'));
  const editorHeight = getEditorHeight({
    isSmallUp, isMediumUp, isLargeUp,
  });
  const classes = useStyles({ editorHeight });

  const handleUploadImageCallBack = (file) => new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`);
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );

  return (
    <Editor
      editorState={editorState}
      toolbarClassName={classes.toolbarClassName}
      wrapperClassName={classes.wrapperClassName}
      editorClassName={classes.editorClassName}
      onEditorStateChange={(editingState) => {
        handleOnChange(draftToHtml(convertToRaw(editingState.getCurrentContent())));
        setEditorState(editingState);
      }}
      toolbar={{
        image: {
          uploadCallback: handleUploadImageCallBack,
          alt: { present: false, mandatory: false },
        },
      }}
    />
  );
};

export default RichTextEditor;
