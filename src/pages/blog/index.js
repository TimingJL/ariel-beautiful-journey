import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import BlogLayout from 'src/pages/blog/blogLayout';
import { selectBlog } from 'src/store/selectors/blog';
import { STATE_IDLE, STATE_SUCCESS, STATE_LOADING } from 'src/const/common';
import { getBlogs } from 'src/services/blogs';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBlogsDone, getBlogsCall, getBlogsFail } from 'src/store/actions/blog';
import Divider from '@material-ui/core/Divider';

import EmptyInfo from './emptyInfo';
import Cards from './cards';

const useStyles = makeStyles({
  isLoading: {
    display: 'flex',
    justifyContent: 'center',
  },
  draftBlockTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 500,
  },
  draftBlockDescription: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    padding: '8px 0px 32px',
  },
  divider: {
    margin: '60px 0px',
  },
});

const Blog = ({ title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { blogs, blogsSideEffect } = useSelector(selectBlog);
  const isIdle = blogsSideEffect === STATE_IDLE;
  const isLoading = blogsSideEffect === STATE_LOADING;
  const isSuccess = blogsSideEffect === STATE_SUCCESS;
  const filteredBlogs = blogs
    .filter((blog) => blog.tags.indexOf(title) > -1)
    .filter((blog) => blog.isPublished);
  const filteredBlogDrafts = blogs
    .filter((blog) => blog.tags.indexOf(title) > -1)
    .filter((blog) => !blog.isPublished);
  const isBlogsEmpty = filteredBlogs.length === 0;
  const isBlogDraftsEmpty = filteredBlogDrafts.length === 0;

  useEffect(() => {
    if (isIdle) {
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
    }
  }, [isIdle]);

  return (
    <BlogLayout title={title}>
      {isLoading && (
      <div className={classes.isLoading}>
        <CircularProgress />
      </div>
      )}
      {isSuccess && isBlogsEmpty && <EmptyInfo title={title} />}
      {isSuccess && !isBlogsEmpty && (
      <Cards tabText={title} blogs={filteredBlogs} />
      )}
      {isSuccess && !isBlogDraftsEmpty && (
      <div>
        <Divider className={classes.divider} />
        <div className={classes.draftBlockTitle}>草稿</div>
        <div className={classes.draftBlockDescription}>未登入者將無法看見草稿區的內容</div>
        <Cards tabText={title} blogs={filteredBlogDrafts} />
      </div>
      )}
    </BlogLayout>
  );
};

export default Blog;
