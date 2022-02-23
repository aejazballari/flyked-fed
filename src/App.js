/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ThemeConfig from './config/theme';
import { FlCreateTheme, FlThemeProvider } from './elements';
import Routes from './routes';
import store from './store';
import AlertNotificationProvider from './elements/alert-notfication/alertState';

const flykedTheme = FlCreateTheme(ThemeConfig);

const ProviderConfig = () => (
  <FlThemeProvider theme={flykedTheme}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" component={Routes} />
      </Switch>
    </Router>
  </FlThemeProvider>
);

function App() {
  // React.useEffect(() => {
  //   window.addEventListener('load', () => {
  //     setTimeout(() => {
  //       // This hides the address bar:
  //       window.scrollTo(0, 1);
  //     }, 0);
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <AlertNotificationProvider>
        <ProviderConfig />
      </AlertNotificationProvider>
    </Provider>
  );
// function App() {
//   return (
//     <Provider store={store}>
//       <ProviderConfig />
//     </Provider>
//   );
}

export default hot(App);
