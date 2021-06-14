/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const createMarkup = (htmlString) => ({ __html: htmlString });

const useStyles = makeStyles({
  root: {
    '& img': {
      maxWidth: '100% !important',
    },
  },
});

const HtmlParser = ({ htmlString }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      dangerouslySetInnerHTML={createMarkup(htmlString)}
    />
  );
};

export default HtmlParser;
