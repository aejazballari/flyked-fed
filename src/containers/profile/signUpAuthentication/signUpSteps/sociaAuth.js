/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable linebreak-style */
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FlykedLogo from '../../../../assets/FlykedLogo.svg';
import { GoogleButton } from '../../../../elements/socialMediaButtons';
// import { CURRENT_STEP } from '../../../../actions/authAction';
import * as authAction from '../../../../actions/authAction';
import { AlertNotificationContext } from '../../../../elements/alert-notfication/alertState';
import { FlTypography, FlGrid } from '../../../../elements/index';

const SocialAuth = () => {
  const { setAlert } = useContext(AlertNotificationContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const intrestList = useSelector((state) => state.category.categories);

  return (
    <FlGrid container spacing={2} className="login-body">
      <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
        <img className="socialAuth-signup-logo" src={FlykedLogo} alt="Flyked Logo" />
      </FlGrid>
      <FlGrid item md={12} xs={12}>
        <FlTypography align="center" className="socialAuth-text-header">
          Delightful fact in
          {' '}
          <br />
          bite size
        </FlTypography>
        <FlTypography variant="h4" align="center" className="socialAuth-signin-text">
          Sign in / Sign up
        </FlTypography>
      </FlGrid>
      <FlGrid item md={12} xs={12} className="socialAuth-login-btn-div">
        <GoogleButton
          fullWidth
          loading={loading}
          disabled={loading}
          onClick={() => dispatch(authAction.loginWithGoogle(history,
            setAlert, setLoading, intrestList))}
        />
      </FlGrid>
      {/* <FlGrid item md={12} xs={12} className="socialAuth-login-btn-div">
        <FaceBookButton
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: CURRENT_STEP, payload: 2 });
          }}
        />
      </FlGrid> */}
      <FlGrid item md={12} xs={12}>
        <FlTypography align="center" className="socialAuth-termsCondition">
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
          and acknowledge that you&apos;ve read our
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
  );
};

export default SocialAuth;
