/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
// eslint-disable-next-line import/no-cycle
import { AlertNotificationContext } from './alertState';
import './style.css';

const AlertNotification = () => {
  const { message, type, isShown } = useContext(AlertNotificationContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  return (
    <>
      {isShown && (
        <Alert variant="filled" severity={type} className={isMobile ? 'alert__container-mobile' : 'alert__container-deskTop'}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertNotification;
