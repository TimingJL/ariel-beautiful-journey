import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  container: {
    padding: '20px 0px',
  },
  createButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0px 40px',
  },
  createButton: {
    background: '#9999FF',
    color: 'white',
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#9999FF',
      opacity: 0.7,
      transition: 'opacity 0.2s ease-in-out',
    },
  },
});

const BlogLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.createButtonWrapper}>
        <Button
          className={classes.createButton}
          onClick={() => null}
          size="large"
          startIcon={<AddIcon />}
        >
          新增文章
        </Button>
      </div>
      {children}
    </Container>
  );
};

export default BlogLayout;
