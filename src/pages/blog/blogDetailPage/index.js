import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    padding: '20px 8px',
    display: 'flex',
    justifyContent: 'center',
  },
  contentPaper: {
    background: 'white',
    width: '100%',
    maxWidth: 900,
    borderRadius: 4,
    minHeight: 400,
    boxShadow: '0px 0px 12px 0px #0000001F',
  },
});

const BlogDetailPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.contentPaper}>
        BlogDetailPage
      </div>
    </Container>
  );
};

export default BlogDetailPage;
