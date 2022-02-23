/* eslint-disable linebreak-style */
import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const UserSignUp = lazy(() => import('../containers/profile/signUpAuthentication/signUpSteps'));
const UpdateView = lazy(() => import('../containers/page/updateView'));
const Profile = lazy(() => import('../containers/profile/profileCard/index'));
const PublicProfile = lazy(() => import('../containers/userPublicView'));

const UserRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/login`} component={UserSignUp} />
      <Route exact path={`${path}/updateView`} component={UpdateView} />
      <Route exact path={`${path}/profile`} component={Profile} />
      <Route exact path={`${path}/userProfile/:user`} component={PublicProfile} />
    </Switch>
  );
};

export default UserRoutes;
