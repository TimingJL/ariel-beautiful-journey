import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'src/pages/home';
import Makeup from 'src/pages/makeup';

export default () => (
  <Switch>
    <Route exact path={['/', '/ariel-beautiful-journey']} component={Home} />
    <Route path="/makeup" component={Makeup} />
  </Switch>
);
