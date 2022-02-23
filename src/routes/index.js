/* eslint-disable linebreak-style */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import React, { lazy, Suspense } from 'react';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import Header from '../components/commonComponents/headder';
import SignUpSteps from '../containers/profile/signUpAuthentication/signUpSteps';
import '../layouts/style.css';
import MainRoutes from '../containers/homePage';

const Main = () => {
  const { path } = useRouteMatch();
  // const MainRoutes = lazy(() => import('../containers/homePage'));
  const PostRoutes = lazy(() => import('./postRoute'));
  const PageRoutes = lazy(() => import('./pageRoute'));
  const UserRoutes = lazy(() => import('./userRoute'));
  const SettingsRoutes = lazy(() => import('./settingsRoute'));
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  // console.log('PATH<hhfwehdjh>', path, useRouteMatch());

  return (
    <div className="main-layout">
      {isMobile
        ? null
        : (
          <div className="main-layout-header">
            <Header />
          </div>
        )}
      <Suspense fallback={<div style={{ height: '100vh', width: '100%', background: '#f7f7f8' }} />}>
        <Switch>
          <Route path={`${path}`} exact component={MainRoutes} />
          <Route path={`${path}user`} component={UserRoutes} />
          <Route path={`${path}page`} component={PageRoutes} />
          <Route path={`${path}post`} component={PostRoutes} />
          <Route path={`${path}settings`} component={SettingsRoutes} />
        </Switch>
      </Suspense>
      <SignUpSteps />
    </div>
  );
};

export default Main;
