import React, { useState } from 'react';
import VerticalCard from 'src/components/cards/verticalCard';
import HorizontalCard from 'src/components/cards/horizontalCard';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BlogFormDialog from 'src/pages/blog/blogFormDialog';

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
  const classes = useStyles();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const Card = isSmUp ? VerticalCard : HorizontalCard;
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
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
              handleEdit={() => handleOpenDialog(id)}
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
    </>
  );
};

export default Cards;
