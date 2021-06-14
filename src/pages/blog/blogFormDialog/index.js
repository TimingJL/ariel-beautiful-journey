/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { toastShow } from 'src/components/toastShow';

import HeaderBar from './headerBar';
import TextInput from './textInput';
import PublishSwitch from './publishSwitch';
import TagsInput from './tagsInput';
import ContentEditor from './contentEditor';
import CoverImageUploader from './coverImageUploader';

const youtubeLinkRegex = /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)(?:&(?:amp;)?[\w\?=]*)?/;

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
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const getErrorFieldList = ({
  blogTitle, htmlString, coverLink, videoLink,
}) => {
  let errorFieldList = [];
  const isValidVideoLink = youtubeLinkRegex.test(videoLink);

  if (!blogTitle || blogTitle.trim().length === 0) {
    errorFieldList = [
      ...errorFieldList,
      '標題',
    ];
  }
  if (!htmlString || htmlString.trim().length === 0) {
    errorFieldList = [
      ...errorFieldList,
      '內容',
    ];
  }
  if (!coverLink || coverLink.trim().length === 0) {
    errorFieldList = [
      ...errorFieldList,
      '封面圖片',
    ];
  }
  if (videoLink.trim().length > 0 && !isValidVideoLink) {
    errorFieldList = [
      ...errorFieldList,
      'Youtube 影片連結',
    ];
  }

  return errorFieldList;
};

const BlogFormDialog = ({
  title, tabText, isOpen, handleClose,
}) => {
  const classes = useStyles();
  const inputFileRef = useRef(null);
  const tagInputRef = useRef(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [htmlString, setHtmlString] = useState('');
  const [coverLink, setCoverLink] = useState('');
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [tagList, setTagList] = useState([tabText]);
  const [isPublished, setIsPublish] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const handleOnBlogTitleChange = (event) => {
    const editingTitle = event.target.value;
    setBlogTitle(editingTitle);
    setIsDirty(true);
  };

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
    const errorFieldList = getErrorFieldList({
      blogTitle, htmlString, coverLink, videoLink,
    });
    if (errorFieldList.length > 0) {
      toastShow({
        type: 'warn',
        message: `請檢查下列欄位：「${errorFieldList.join('、')}」`,
      });
      return;
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
    setIsUploadLoading(true);
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
        setIsUploadLoading(false);
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
        isDirty={isDirty}
        handleClose={handleClose}
        handleClickSaveButton={handleClickSaveButton}
      />
      <div className={classes.contentWrapper}>
        <div className={classes.formGroup}>
          <TextInput
            autoFocus
            label="標題"
            isRequired
            value={blogTitle}
            handleOnChange={handleOnBlogTitleChange}
          />
          <CoverImageUploader
            isRequired
            inputFileRef={inputFileRef}
            coverLink={coverLink}
            isUploadLoading={isUploadLoading}
            handleClickUploadButton={handleClickUploadButton}
            handleOnSelectImage={handleOnSelectImage}
            handleClearCoverImageLink={handleClearCoverImageLink}
          />
          <TextInput
            label="Youtube 影片連結"
            value={videoLink}
            handleOnChange={(event) => setVideoLink(event.target.value)}
          />
          <TagsInput
            tagInputRef={tagInputRef}
            tabText={tabText}
            tagList={tagList}
            handleAddTagToList={handleAddTagToList}
            handleRemoveTagFromList={handleRemoveTagFromList}
          />
          <ContentEditor
            isRequired
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
