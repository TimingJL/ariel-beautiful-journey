import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { selectUser } from 'src/store/selectors/user';

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
    color: 'white',
  },
});

const BlogLayout = ({ children, title }) => {
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const blogTitle = `新增${title}文章`;
  const isEditable = !!currentUser;

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <Container className={classes.container}>
        {isEditable && (
        <div className={classes.createButtonWrapper}>
          <Button
            className={classes.createButton}
            onClick={handleOpenDialog}
            size="large"
            startIcon={<AddIcon />}
            color="primary"
            variant="contained"
          >
            {blogTitle}
          </Button>
        </div>
        )}
        {children}
      </Container>
      {isOpenDialog && (
      <BlogFormDialog
        dialogTitle={blogTitle}
        tabText={title}
        isOpen={isOpenDialog}
        handleClose={handleCloseDialog}
      />
      )}
    </>
  );
};

export default BlogLayout;
