import { firebaseRequest } from 'src/utils/request';
import short from 'short-uuid';
import { blogTemplate, BLOG_CREATED_AT, BLOG_UPDATED_AT } from 'src/dataTemplate/blog';
import dayjs from 'dayjs';

export const getBlogs = ({ onSuccess, onError }) => {
  firebaseRequest.getOnce({
    path: '/blogs',
    onSuccess,
    onError,
  });
};

export const getBlog = ({ blogId, onSuccess, onError }) => {
  firebaseRequest.getOnce({
    path: `//blogs/${blogId}`,
    onSuccess,
    onError,
  });
};

export const createBlog = ({
  data,
  onSuccess, onError,
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
    onSuccess,
    onError,
  });
};

export const updateBlog = ({
  blogId, data, onSuccess, onError,
}) => {
  firebaseRequest.update({
    path: '/blogs',
    data: {
      [blogId]: {
        ...blogTemplate,
        ...data,
      },
    },
    onSuccess,
    onError,
  });
};

export const removeBlog = ({
  blogId, onSuccess, onError,
}) => {
  firebaseRequest.remove({
    path: `/blogs/${blogId}`,
    onSuccess,
    onError,
  });
};
