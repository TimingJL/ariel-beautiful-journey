import React from 'react';
import BlogLayout from 'src/components/blogLayout';

const Blog = ({ title }) => (
  <BlogLayout title={title}>
    {title}
  </BlogLayout>
);

export default Blog;
