import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { toastShow } from 'src/components/toastShow';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import HeaderBar from './headerBar';
import TitleInput from './titleInput';
import PublishSwitch from './publishSwitch';
import TagsInput from './tagsInput';
import ContentEditor from './contentEditor';

const useStyles = makeStyles(() => ({
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
    marginTop: 8,
  },
  removeUploadButton: {
    marginTop: 8,
    marginRight: 8,
  },
  previewImage: {
    maxWidth: 300,
    maxHeight: 300,
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
  const [isPublished, setIsPublish] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const handleAddTagToList = () => {
    const editingTag = tagInputRef.current.value;
    if (editingTag.trim().length === 0) {
      return;
    }
    setTagList((prevTagList) => {
      const isExist = tagList.indexOf(editingTag) > -1;
      if (!isExist) {
        setIsDirty(true);
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
    setIsDirty(true);
  };

  const handleClickSaveButton = () => {
    if (isDirty) {
      toastShow({
        type: 'warn',
        message: 'It is dirty',
      });
    }
    toastShow({
      type: 'success',
      message: '儲存成功！',
    });
    setIsDirty(false);
  };

  const handleOnEditorChange = (textValue) => {
    setHtmlString(textValue);
    setIsDirty(true);
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
        setIsDirty(true);
      });
  };

  const handleClearCoverImageLink = () => {
    setCoverLink('');
    setIsDirty(true);
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <HeaderBar
        title={title}
        handleClose={handleClose}
        handleClickSaveButton={handleClickSaveButton}
      />
      <div className={classes.contentWrapper}>
        <div className={classes.formGroup}>
          <TitleInput />
          <div className="cover-image-upload">
            <div className={classes.label}>封面圖片：</div>
            {coverLink ? (
              <div>
                <div>
                  <img src={coverLink} alt="" className={classes.previewImage} />
                </div>
                <Button
                  className={classes.removeUploadButton}
                  onClick={handleClearCoverImageLink}
                  color="secondary"
                  variant="outlined"
                >
                  <ClearIcon />
                  清除目前圖片
                </Button>
                <Button
                  className={classes.resetUploadButton}
                  onClick={handleClickUploadButton}
                  color="primary"
                  variant="outlined"
                >
                  <RotateLeftIcon />
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
          <TagsInput
            tagInputRef={tagInputRef}
            tabText={tabText}
            tagList={tagList}
            handleAddTagToList={handleAddTagToList}
            handleRemoveTagFromList={handleRemoveTagFromList}
          />
          <ContentEditor
            htmlString={htmlString}
            handleOnEditorChange={handleOnEditorChange}
          />
          <PublishSwitch
            isPublished={isPublished}
            handleTogglePublished={() => setIsPublish((prev) => !prev)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default BlogFormDialog;
