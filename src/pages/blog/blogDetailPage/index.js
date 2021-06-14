import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { selectBlog } from 'src/store/selectors/blog';
import { isEmpty } from 'lodash';
import { getBlog } from 'src/services/blogs';
import { getBlogCall, getBlogDone, getBlogFail } from 'src/store/actions/blog';
import {
  STATE_SUCCESS,
  STATE_LOADING,
} from 'src/const/common';
import CircularProgress from '@material-ui/core/CircularProgress';

import DetailPageContent from './detailPageContent';
import EmptyInfo from './emptyInfo';

const useStyles = makeStyles({
  container: {
    padding: '20px 8px',
    display: 'flex',
    justifyContent: 'center',
  },
  isLoading: {
    display: 'flex',
    justifyContent: 'center',
  },
  circularProgress: {
    marginTop: 60,
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { blogId } = useParams();
  const { currentBlog, currentBlogSideEffect } = useSelector(selectBlog);
  const isBlogEmpty = isEmpty(currentBlog);
  const isLoading = currentBlogSideEffect === STATE_LOADING;
  const isSuccess = currentBlogSideEffect === STATE_SUCCESS;

  useEffect(() => {
    getBlog({
      blogId,
      onStartWith: () => {
        dispatch(getBlogCall());
      },
      onSuccess: ({ response }) => {
        dispatch(getBlogDone({ blog: response }));
      },
      onError: () => {
        dispatch(getBlogFail());
      },
    });
  }, []);

  return (
    <Container className={classes.container}>
      <div className={classes.contentPaper}>
        {isLoading && (
        <div className={classes.isLoading}>
          <CircularProgress className={classes.circularProgress} />
        </div>
        )}
        {(isSuccess && !isBlogEmpty) && (
        <DetailPageContent blog={currentBlog} />
        )}
        {(isSuccess && isBlogEmpty) && (
        <EmptyInfo />
        )}
      </div>
    </Container>
  );
};

export default BlogDetailPage;
