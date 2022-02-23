/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleButton } from '../../../../elements/socialMediaButtons';
import * as authAction from '../../../../actions/authAction';
import { AlertNotificationContext } from '../../../../elements/alert-notfication/alertState';
import { FlGrid, FlTypography } from '../../../../elements/index';

const LoginCard = () => {
  const { setAlert } = useContext(AlertNotificationContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const appTheme = useTheme();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const intrestList = useSelector((state) => state.category.categories);

  return (
    <>
      <FlGrid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          width: window.innerWidth > 1400 ? '360px' : '100%',
          marginBottom: isMobile ? 40 : 0,
        }}
      >
        <FlGrid item md={12} xs={12} className="login-card-main">
          <FlGrid container spacing={2}>
            <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
              <FlTypography
                className="login-card-main-logo"
                style={{ display: isMobile ? 'none' : '' }}
              >
                Life is all about
                <br />
                {' '}
                interesting bits
              </FlTypography>
              <FlTypography
                className="login-card-main-logo"
                style={{ display: isMobile ? '' : 'none' }}
              >
                Flyked
              </FlTypography>
              <FlTypography
                className="login-card-main-label"
                style={{ display: isMobile ? '' : 'none' }}
              >
                Welcome to Flyked
              </FlTypography>
              <FlTypography
                align="center"
                className="login-card-main-sub-label"
                style={{ display: isMobile ? '' : 'none' }}
              >
                Delightful fact in
                {' '}
                <br />
                bite size
              </FlTypography>
              <FlTypography className="login-card-sub-label">
                Sign in / Sign up
              </FlTypography>
            </FlGrid>
            <FlGrid item md={12} xs={12} className="socialAuth-login-btn-div">
              <GoogleButton
                style={{ minHeight: '42px', padding: '8px', height: 'auto' }}
                fullWidth
                loading={loading}
                disabled={loading}
                onClick={() => {
                  dispatch(authAction.loginWithGoogle(history, setAlert, setLoading, intrestList));
                }}
              />
            </FlGrid>
            {/* <FlGrid item md={12} xs={12} className="socialAuth-login-btn-div">
              <FaceBookButton
                style={{ height: '42px' }}
                fullWidth
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </FlGrid> */}
            <FlGrid
              item
              md={12}
              xs={12}
              style={{ display: isMobile ? '' : 'none' }}
            >
              <FlTypography align="center" className="login-card-footer-label">
                By continuing, you agree to Flyked&apos;s
                {' '}
                <span
                  style={{ color: '#EF613B', cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(authAction.CloseLoginModel());
                    history.push('/settings/terms_and_conditions');
                  }}
                >
                  Terms of Service
                </span>
                {' '}
                and acknowledge that
                you&apos;ve read our
                {' '}
                <span
                  style={{ color: '#EF613B', cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(authAction.CloseLoginModel());
                    history.push('/settings/privacy_policy');
                  }}
                >
                  Privacy Policy
                </span>
              </FlTypography>
            </FlGrid>
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </>
  );
};

export default LoginCard;
