/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const createMarkup = (htmlString) => ({ __html: htmlString });

const useStyles = makeStyles({
  root: {

  },
  imageWrapper: {
    width: '100%',
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px 4px 0px 0px',
  },
  coverImage: {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    maxHeight: 400,
  },
  title: {
    padding: '12px 20px',
    fontSize: 24,
    fontWeight: 500,
    color: '#101010',
  },
  tags: {
    padding: '12px 20px',
    marginTop: -4,
    '& > *': {
      marginTop: 4,
    },
    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
  },
  content: {
    padding: '12px 20px',
  },
});

const DetailPageContent = ({ blog }) => {
  const {
    coverLink, title, content, tags,
  } = blog;
  const classes = useStyles({ coverLink });

  return (
    <div className={classes.root}>
      <div className={classes.imageWrapper}>
        <img src={coverLink} className={classes.coverImage} alt="" />
      </div>
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.tags}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color="primary"
            size="small"
            variant="outlined"
          />
        ))}
      </div>
      <div className={classes.content}>
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
    </div>
  );
};

export default DetailPageContent;
