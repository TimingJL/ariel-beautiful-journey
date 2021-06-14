import update from 'immutability-helper';
import { handleActions } from 'redux-actions';
import {
  GET_BLOGS_CALL,
  GET_BLOGS_DONE,
  GET_BLOGS_FAIL,
  GET_BLOG_CALL,
  GET_BLOG_DONE,
  GET_BLOG_FAIL,
} from 'src/store/types/blog';
import {
  STATE_IDLE,
  STATE_SUCCESS,
  STATE_LOADING,
  STATE_FAIL,
} from 'src/const/common';

const initialState = {
  blogs: [],
  blogsSideEffect: STATE_IDLE,
  currentBlog: {},
  currentBlogSideEffect: STATE_IDLE,
};

export default handleActions({
  // get blogs
  [GET_BLOGS_CALL](state) {
    return update(state, {
      blogsSideEffect: { $set: STATE_LOADING },
    });
  },
  [GET_BLOGS_DONE](state, { payload: { blogs } }) {
    return update(state, {
      blogs: { $set: blogs },
      blogsSideEffect: { $set: STATE_SUCCESS },
    });
  },
  [GET_BLOGS_FAIL](state) {
    return update(state, {
      blogsSideEffect: { $set: STATE_FAIL },
    });
  },
  // get blog
  [GET_BLOG_CALL](state) {
    return update(state, {
      currentBlogSideEffect: { $set: STATE_LOADING },
    });
  },
  [GET_BLOG_DONE](state, { payload: { blog } }) {
    return update(state, {
      currentBlog: { $set: blog },
      currentBlogSideEffect: { $set: STATE_SUCCESS },
    });
  },
  [GET_BLOG_FAIL](state) {
    return update(state, {
      currentBlogSideEffect: { $set: STATE_FAIL },
    });
  },
}, initialState);
