import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

import FormLabel from './formLabel';

const useStyles = makeStyles(() => ({
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

const TagsInput = ({
  tagInputRef, tabText, tagList, handleAddTagToList, handleRemoveTagFromList,
}) => {
  const classes = useStyles();

  return (
    <div className="blog-tags">
      <FormLabel label="標籤" />
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
  );
};

export default TagsInput;
