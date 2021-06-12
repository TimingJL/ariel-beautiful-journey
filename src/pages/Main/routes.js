import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'src/pages/home';
import Makeup from 'src/pages/makeup';
import Travel from 'src/pages/travel';
import Aromatherapy from 'src/pages/aromatherapy';
import Life from 'src/pages/life';

export default () => (
  <Switch>
    <Route exact path={['/', '/ariel-beautiful-journey']} component={Home} />
    <Route path="/makeup" component={Makeup} />
    <Route path="/travel" component={Travel} />
    <Route path="/aromatherapy" component={Aromatherapy} />
    <Route path="/life" component={Life} />
  </Switch>
);
