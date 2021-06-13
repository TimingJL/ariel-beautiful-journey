import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from './formLabel';

const useStyles = makeStyles(() => ({
  publishDescription: {
    color: '#676767',
    fontSize: 14,
  },
}));

const PublishSwitch = ({
  isPublished, handleTogglePublished,
}) => {
  const classes = useStyles();

  return (
    <div className="blog-publish-switch">
      <FormLabel label="顯示狀態" />
      <FormControlLabel
        control={<Switch checked={isPublished} onChange={handleTogglePublished} color="primary" />}
        label="公開並發佈文章"
      />
      <div className={classes.publishDescription}>
        {isPublished ? '您的文章將於儲存後立即公開發佈' : '您的文章將於儲存後設為隱私'}
      </div>
    </div>
  );
};

export default PublishSwitch;
