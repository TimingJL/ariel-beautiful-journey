import { createAction } from 'redux-actions';

import {
  GET_BLOGS_CALL,
  GET_BLOGS_DONE,
  GET_BLOGS_FAIL,
} from 'src/store/types/blog';

export const getBlogsCall = createAction(GET_BLOGS_CALL);
export const getBlogsDone = createAction(GET_BLOGS_DONE);
export const getBlogsFail = createAction(GET_BLOGS_FAIL);
