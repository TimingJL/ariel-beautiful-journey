import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormLabel from './formLabel';

const useStyles = makeStyles(() => ({
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
  startIcon: {
    marginRight: 8,
  },
  removeUploadButton: {
    marginTop: 8,
    marginRight: 8,
    '& > span > svg': {
      marginRight: 4,
    },
  },
  previewImage: {
    maxWidth: 300,
    maxHeight: 300,
  },
}));

const CoverImageUploader = ({
  inputFileRef,
  isRequired,
  coverLink,
  isUploadLoading,
  handleClickUploadButton,
  handleOnSelectImage,
  handleClearCoverImageLink,
}) => {
  const classes = useStyles();

  return (
    <div className="cover-image-upload">
      <FormLabel label="封面圖片" isRequired={isRequired} />
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
            {isUploadLoading ? (
              <CircularProgress size={24} className={classes.startIcon} />
            ) : <RotateLeftIcon className={classes.startIcon} />}
            重新上傳
          </Button>
        </div>
      ) : (
        <Button
          className={classes.uploadButton}
          onClick={handleClickUploadButton}
        >
          {isUploadLoading ? (
            <CircularProgress />
          ) : (
            <>
              <AddIcon />
              上傳圖片
            </>
          )}
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
  );
};

export default CoverImageUploader;
