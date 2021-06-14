import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'src/pages/home';
import Blog from 'src/pages/blog';
import BlogDetailPage from 'src/pages/blog/blogDetailPage';
import {
  TAB_MAKEUP,
  TAB_TRAVEL,
  TAB_AROMATHERAPY,
  TAB_LIFE,
  TAB_TEXT_MAKEUP,
  TAB_TEXT_TRAVEL,
  TAB_TEXT_AROMATHERAPY,
  TAB_TEXT_LIFE,
} from './const';
import { withBlogPage } from './withBlogPage';

export default () => (
  <Switch>
    <Route exact path={['/', '/ariel-beautiful-journey']} component={Home} />
    <Route path={`/blogs/${TAB_MAKEUP}`} component={withBlogPage(Blog, { blogKey: TAB_MAKEUP, title: TAB_TEXT_MAKEUP })} />
    <Route path={`/blogs/${TAB_TRAVEL}`} component={withBlogPage(Blog, { blogKey: TAB_TRAVEL, title: TAB_TEXT_TRAVEL })} />
    <Route path={`/blogs/${TAB_AROMATHERAPY}`} component={withBlogPage(Blog, { blogKey: TAB_AROMATHERAPY, title: TAB_TEXT_AROMATHERAPY })} />
    <Route path={`/blogs/${TAB_LIFE}`} component={withBlogPage(Blog, { blogKey: TAB_LIFE, title: TAB_TEXT_LIFE })} />
    <Route path="/blogs/:blogId" component={BlogDetailPage} />
  </Switch>
);
