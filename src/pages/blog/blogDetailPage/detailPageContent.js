/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import HtmlParser from 'src/components/htmlParser';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  commonPadding: {
    padding: '0px 8px',
    [theme.breakpoints.up('xs')]: {
      padding: '0px 20px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 28px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0px 40px',
    },
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
    [theme.breakpoints.up('xs')]: {
      maxHeight: 200,
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 300,
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 400,
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: '#101010',
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.up('xs')]: {
      fontSize: 18,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  tags: {
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: -4,
    '& > *': {
      marginTop: 4,
    },
    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
}));

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
      <div className={clsx(classes.commonPadding, classes.title)}>
        {title}
      </div>
      <div className={clsx(classes.commonPadding, classes.tags)}>
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
      <div className={clsx(classes.commonPadding, classes.content)}>
        <HtmlParser htmlString={content} />
      </div>
    </div>
  );
};

export default DetailPageContent;
