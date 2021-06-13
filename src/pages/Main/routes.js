import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'src/pages/home';
import Blog from 'src/pages/blog';
import {
  TAB_MAKEUP,
  TAB_TRAVEL,
  TAB_AROMATHERAPY,
  TAB_LIFE,
} from './const';
import { withBlogPage } from './withBlogPage';

export default () => (
  <Switch>
    <Route exact path={['/', '/ariel-beautiful-journey']} component={Home} />
    <Route path={`/${TAB_MAKEUP}`} component={withBlogPage(Blog, { blogKey: TAB_MAKEUP, title: '彩妝' })} />
    <Route path={`/${TAB_TRAVEL}`} component={withBlogPage(Blog, { blogKey: TAB_TRAVEL, title: '旅行' })} />
    <Route path={`/${TAB_AROMATHERAPY}`} component={withBlogPage(Blog, { blogKey: TAB_AROMATHERAPY, title: '芳療' })} />
    <Route path={`/${TAB_LIFE}`} component={withBlogPage(Blog, { blogKey: TAB_LIFE, title: '生活日誌' })} />
  </Switch>
);
