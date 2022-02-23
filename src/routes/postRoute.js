/* eslint-disable linebreak-style */
import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from './privateRoute';

const postCreating = lazy(() => import('../containers/createPosts'));
const PostDetails = lazy(() => import('../containers/postView'));

const PostRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/details/:url`} component={PostDetails} />
      <PrivateRoute exact path={`${path}/create`} component={postCreating} />
    </Switch>
  );
};
export default PostRoutes;
