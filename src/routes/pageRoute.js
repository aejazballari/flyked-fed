/* eslint-disable linebreak-style */
import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from './privateRoute';

const Search = lazy(() => import('../containers/page/search'));
const Create = lazy(() => import('../containers/page/create'));
const Success = lazy(() => import('../containers/page/success'));
const PageView = lazy(() => import('../containers/pageView'));

const PageRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${path}/search`} component={Search} />
        <PrivateRoute exact path={`${path}/create`} component={Create} />
        <Route exact path={`${path}/create/success`} component={Success} />
        <Route exact path={`${path}/details/:page`} component={PageView} />
      </Switch>
    </>
  );
};
export default PageRoutes;
