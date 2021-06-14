import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import VerticalCard from 'src/components/cards/verticalCard';
import HorizontalCard from 'src/components/cards/horizontalCard';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BlogFormDialog from 'src/pages/blog/blogFormDialog';
import ConfirmDialog from 'src/components/confirmDialog';
import { removeBlog, getBlogs } from 'src/services/blogs';
import { useDispatch } from 'react-redux';
import { getBlogsDone, getBlogsCall, getBlogsFail } from 'src/store/actions/blog';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px 20px 60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: 20,
    [theme.breakpoints.up('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
}));

const Cards = ({ tabText, blogs }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const Card = isSmUp ? VerticalCard : HorizontalCard;
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const selectedBlog = blogs.find((blog) => blog.id === selectedCardId) || {};
  const blogTitle = `編輯${tabText}文章`;

  const handleOpenDialog = (blogId) => {
    setSelectedCardId(blogId);
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setSelectedCardId(null);
  };

  const handleClickCard = (blogId) => {
    history.push(`/blogs/${blogId}`);
  };

  const handleClickDeleteButton = (blogId) => {
    setSelectedCardId(blogId);
    setIsOpenConfirm(true);
  };

  const handleSubmitDeleteBlog = () => {
    removeBlog({
      blogId: selectedCardId,
      onSuccess: () => {
        getBlogs({
          onStartWith: () => {
            dispatch(getBlogsCall());
          },
          onSuccess: ({ response }) => {
            const formattedBlogs = Object.keys(response).map((key) => response[key]);
            dispatch(getBlogsDone({ blogs: formattedBlogs }));
          },
          onError: () => {
            dispatch(getBlogsFail());
          },
        });
      },
    });
    setIsOpenConfirm(false);
  };

  return (
    <>
      <div className={classes.root}>
        {blogs.map((blog) => {
          const {
            id,
            title,
            coverLink,
            tags,
          } = blog;

          return (
            <Card
              key={id}
              title={title}
              coverLink={coverLink}
              tags={tags}
              handleClickCard={() => handleClickCard(id)}
              handleEdit={() => handleOpenDialog(id)}
              handleDelete={() => handleClickDeleteButton(id)}
            />
          );
        })}
      </div>
      {(isOpenDialog && selectedCardId) && (
      <BlogFormDialog
        dialogTitle={blogTitle}
        tabText={tabText}
        isOpen={isOpenDialog}
        blog={selectedBlog}
        handleClose={handleCloseDialog}
      />
      )}
      {(isOpenConfirm && selectedCardId) && (
      <ConfirmDialog
        title="刪除確認"
        description={`確認是否刪除「${selectedBlog.title}」?`}
        isOpen={isOpenConfirm}
        handleClose={() => {
          setIsOpenConfirm(false);
          setSelectedCardId(null);
        }}
        handleConfirm={handleSubmitDeleteBlog}
      />
      )}
    </>
  );
};

export default Cards;
