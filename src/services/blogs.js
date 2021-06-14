import { firebaseRequest } from 'src/utils/request';
import short from 'short-uuid';
import { blogTemplate, BLOG_CREATED_AT, BLOG_UPDATED_AT } from 'src/dataTemplate/blog';
import dayjs from 'dayjs';

export const getBlogs = ({
  onStartWith, onSuccess, onError,
}) => {
  firebaseRequest.getOnce({
    path: '/blogs',
    onStartWith,
    onSuccess,
    onError,
  });
};

export const getBlog = ({
  blogId, onStartWith, onSuccess, onError,
}) => {
  firebaseRequest.getOnce({
    path: `//blogs/${blogId}`,
    onStartWith,
    onSuccess,
    onError,
  });
};

export const createBlog = ({
  data,
  onStartWith, onSuccess, onError,
}) => {
  const newBlogId = short.generate();
  const currentAt = dayjs(new Date()).valueOf();
  firebaseRequest.update({
    path: '/blogs',
    data: {
      [newBlogId]: {
        ...blogTemplate,
        ...data,
        id: newBlogId,
        [BLOG_CREATED_AT]: currentAt,
        [BLOG_UPDATED_AT]: currentAt,
      },
    },
    onStartWith,
    onSuccess,
    onError,
  });
};

export const updateBlog = ({
  blogId, data, onStartWith, onSuccess, onError,
}) => {
  const currentAt = dayjs(new Date()).valueOf();
  firebaseRequest.update({
    path: '/blogs',
    data: {
      [blogId]: {
        ...blogTemplate,
        ...data,
        [BLOG_UPDATED_AT]: currentAt,
      },
    },
    onStartWith,
    onSuccess,
    onError,
  });
};

export const removeBlog = ({
  blogId, onStartWith, onSuccess, onError,
}) => {
  firebaseRequest.remove({
    path: `/blogs/${blogId}`,
    onStartWith,
    onSuccess,
    onError,
  });
};
