import React, { useState, useRef } from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    color: 'white',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  contentWrapper: {
    padding: 20,
    paddingBottom: 80,
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
  uploadButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: 160,
    height: 90,
    borderRadius: 4,
    border: '2px dotted #ddd',
    '&:hover': {
      background: '#eee',
    },
  },
  resetUploadButton: {
    border: '1px solid #8b8bff',
    color: '#8b8bff',
    marginTop: 8,
  },
  previewImage: {
    maxWidth: 300,
    maxHeight: 300,
  },
  addTagBox: {
    border: '1px solid #eee',
    borderRadius: 4,
    padding: '8px 16px',
    display: 'flex',
  },
  addTagInput: {
    border: 'none',
    outline: 'none',
    fontSize: 18,
    width: '100%',
  },
  addTagButton: {
    color: 'white',
    marginLeft: 8,
    whiteSpace: 'nowrap',
  },
  chipsWrapper: {
    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
  },
  chip: {
    marginTop: 8,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const BlogFormDialog = ({
  title, tabText, isOpen, handleClose,
}) => {
  const classes = useStyles();
  const inputFileRef = useRef(null);
  const tagInputRef = useRef(null);
  const [htmlString, setHtmlString] = useState('');
  const [coverLink, setCoverLink] = useState('');
  const [tagList, setTagList] = useState([tabText]);

  const handleAddTagToList = () => {
    const editingTag = tagInputRef.current.value;
    if (editingTag.trim().length === 0) {
      return;
    }
    setTagList((prevTagList) => {
      const isExist = tagList.indexOf(editingTag) > -1;
      if (!isExist) {
        tagInputRef.current.value = '';
        return [...prevTagList, editingTag];
      }
      toastShow({
        type: 'warn',
        message: '標籤重複！',
      });
      return prevTagList;
    });
  };

  const handleRemoveTagFromList = (tagName) => {
    setTagList((prevTagList) => prevTagList.filter((tag) => tag !== tagName));
  };

  const handleClickSaveButton = () => {
    toastShow({
      type: 'success',
      message: '儲存成功！',
    });
  };

  const handleOnEditorChange = (textValue) => {
    setHtmlString(textValue);
  };

  const handleClickUploadButton = () => {
    inputFileRef.current.click();
  };

  const handleOnSelectImage = (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    // Note: Imgur blocks all requests from localhost.
    fetch('https://api.imgur.com/3/image/', {
      method: 'post',
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        const { data: { link } } = response;
        setCoverLink(link);
      });
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
          <div className="blog-title">
            <div className={classes.label}>標題：</div>
            <TextField
              autoFocus
              label="標題"
              fullWidth
              variant="outlined"
              onChange={() => null}
            />
          </div>
          <div className="cover-image-upload">
            <div className={classes.label}>封面圖片：</div>
            {coverLink ? (
              <div>
                <div>
                  <img src={coverLink} alt="" className={classes.previewImage} />
                </div>
                <Button
                  className={classes.resetUploadButton}
                  onClick={handleClickUploadButton}
                >
                  <AddIcon />
                  重新上傳
                </Button>
              </div>
            ) : (
              <Button
                className={classes.uploadButton}
                onClick={handleClickUploadButton}
              >
                <AddIcon />
                上傳圖片
              </Button>
            )}
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleOnSelectImage}
              style={{ display: 'none' }}
            />
            {coverLink && <a href={coverLink}>{coverLink}</a>}
          </div>
          <div className="blog-tags">
            <div className={classes.label}>標籤：</div>
            <div className={classes.addTagBox}>
              <input type="text" ref={tagInputRef} className={classes.addTagInput} />
              <Button
                className={classes.addTagButton}
                onClick={handleAddTagToList}
                color="primary"
                variant="contained"
              >
                <AddIcon />
                新增標籤
              </Button>
            </div>
            <div className={classes.chipsWrapper}>
              {tagList.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={tag === tabText ? null : () => handleRemoveTagFromList(tag)}
                  color="primary"
                  variant="outlined"
                  className={classes.chip}
                />
              ))}
            </div>
          </div>
          <div className="blog-content">
            <div className={classes.label}>內容：</div>
            <RichTextEditor htmlString={htmlString} handleOnChange={handleOnEditorChange} />
          </div>
          <div style={{ display: 'none' }}>{htmlString}</div>
        </div>
      </div>
    </Dialog>
  );
};

export default BlogFormDialog;
