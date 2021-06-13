import React from 'react';

export const withBlogPage = (
  WrappedComponent, blogProps,
) => {
  const BlogPage = (props) => <WrappedComponent {...props} {...blogProps} />;

  return BlogPage;
};
