import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BlogFormDialog from './blogFormDialog';

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

const BlogLayout = ({ children, title }) => {
  const classes = useStyles();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const blogTitle = `新增${title}文章`;

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <Container className={classes.container}>
        <div className={classes.createButtonWrapper}>
          <Button
            className={classes.createButton}
            onClick={handleOpenDialog}
            size="large"
            startIcon={<AddIcon />}
          >
            {blogTitle}
          </Button>
        </div>
        {children}
      </Container>
      <BlogFormDialog
        title={blogTitle}
        isOpen={isOpenDialog}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default BlogLayout;