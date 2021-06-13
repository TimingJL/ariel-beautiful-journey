import React from 'react';

import BlogLayout from 'src/pages/blog/blogLayout';
import EmptyInfo from './emptyInfo';

const Blog = ({ title }) => (
  <BlogLayout title={title}>
    <EmptyInfo title={title} />
  </BlogLayout>
);

export default Blog;
