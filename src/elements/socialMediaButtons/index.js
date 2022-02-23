/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithLoader from '../buttonWithLoader';
import GoogleIcon from '../../assets/GoogleIcon.svg';
import FbIcon from '../../assets/FbIcon.svg';
import './style.css';
import { FlGrid } from '..';

export const FaceBookButton = (props) => (
  <ButtonWithLoader {...props} className="login-fb-btn" variant="contained">
    <FlGrid container direction="row" justifyContent="center" alignItems="center">
      <img src={FbIcon} alt="fbIcon" className="iconBtns" style={{ aspectRatio: '1/1', height: '1.5rem', objectFit: 'contain' }} />
      Continue with Facebook
    </FlGrid>
  </ButtonWithLoader>
);

export const GoogleButton = ({ ...props }) => (
  <ButtonWithLoader {...props} variant="contained" className="login-google-btn" style={props?.disabled ? { color: '#FFFFFF', background: 'lightgray' } : { color: '#737171', background: '#FFFFFF' }}>
    <FlGrid container direction="row" justifyContent="center" alignItems="center">
      <img
        src={GoogleIcon}
        alt="GoogleIcon"
        className="iconBtns"
        style={{ aspectRatio: '1/1', height: '1.5rem', objectFit: 'contain' }}
      />
      Continue with Google
    </FlGrid>
  </ButtonWithLoader>
);

GoogleButton.defaultProps = {
  disabled: false,
};

GoogleButton.propTypes = {
  disabled: PropTypes.bool,
};
