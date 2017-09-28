/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import ArticleApp from './containers/ArticleApp/ArticleApp';
import userQuery from './queries/userQuery';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ArticleApp} queries={userQuery} />
  </Route>
);
