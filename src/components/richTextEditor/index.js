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
    />
  );
};

export default RichTextEditor;
