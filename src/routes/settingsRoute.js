/* eslint-disable linebreak-style */
import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const Terms = lazy(() => import('../containers/otherPages/termsOfService'));
const Privacy = lazy(() => import('../containers/otherPages/privacyPolicy'));
const Cookies = lazy(() => import('../containers/otherPages/cookiesPolicy'));

const SettingsRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${path}/terms_and_conditions`} component={Terms} />
        <Route exact path={`${path}/privacy_policy`} component={Privacy} />
        <Route exact path={`${path}/cookies_policy`} component={Cookies} />
      </Switch>
    </>
  );
};
export default SettingsRoutes;
