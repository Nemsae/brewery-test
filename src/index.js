import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import SampledPage from './components/SampledPage';
import NotSampledPage from './components/NotSampledPage';
// import WatchList from './components/WatchList';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='sampled' component={SampledPage} />
      <Route path='notsampled' component={NotSampledPage} />
      {/* <Route path='watchList' component={WatchList} /> */}
    </Route>
  </Router>,
  document.getElementById('root')
);
