/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { AlertNotificationContext } from '../../../../elements/alert-notfication/alertState';
import ButtonWithLoader from '../../../../elements/buttonWithLoader';
import { USER_DETAILS, CURRENT_STEP, PROFILE_IMAGE } from '../../../../actions/authAction';
import * as authAction from '../../../../actions/authAction';
import {
  FlGrid, FlAvatar, FlTextField, FlTypography, FlIconButton, FlCircularProgress,
} from '../../../../elements/index';

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const loading = useSelector((state) => state.auth.loading);
  const progressBar = useSelector((state) => state.auth.progressBar);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const { setAlert } = useContext(AlertNotificationContext);
  const [handleSelected, setHandleSelected] = useState('');

  const handleOnChange = (key, value) => {
    const newData = { ...userDetails };
    if (key) {
      newData[key] = value;
      dispatch({ type: USER_DETAILS, payload: newData });
      return newData;
    }
    dispatch({ type: USER_DETAILS, payload: newData });
    return newData;
  };

  const handleProfileImage = async (data) => {
    if (data?.size > 5000000) {
      setAlert('warning', 'Image size must be less than 5MB');
      return;
    }
    if (data?.type === 'image/png' || data?.type === 'image/jpeg' || data?.type === 'image/webp') {
      dispatch({ type: PROFILE_IMAGE, payload: data });
      dispatch({ type: CURRENT_STEP, payload: 4 });
    } else {
      setAlert('warning', 'Upload only images on png or jpeg or webp format');
    }
  };

  const fieldNameAndValue = (label, value, selected, ref) => (
    <FlGrid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      onClick={(e) => {
        e.preventDefault();
        setHandleSelected(selected);
        setTimeout(() => {
          document.getElementById(ref).focus();
        }, 10);
      }}
      className="profile-input-div"
    >
      <FlGrid item md={4} xs={12}>
        <FlTypography className="profile-input-label">{label}</FlTypography>
      </FlGrid>
      <FlGrid item md={8} xs={12}>
        <FlTypography className="profile-input-value">{value}</FlTypography>
      </FlGrid>
    </FlGrid>
  );
  const handleNextStep = () => {
    if (!userDetails?.displayName) {
      setAlert('warning', 'Please enter your display name');
      return;
    }
    const userData = {
      name: userDetails?.displayName || '',
      email: userDetails?.email || '',
      profileImage: userDetails?.photoURL || '',
      about: userDetails?.about || '',
      socialID: userDetails?.uid || '',
    };
    dispatch(authAction.handleProfileUpdate(userData, setAlert));
  };

  return (
    <FlGrid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        padding: '10px 30px', width: '100%', height: 'auto', margin: '0px !important',
      }}
    >
      <FlGrid item md={12} xs={12}>
        <FlTypography className="profile-main-label">Welcome!</FlTypography>
      </FlGrid>
      <FlGrid item md={12} xs={12}>
        <FlTypography className="profile-sub-label">
          You may change your profile inforamtion
        </FlTypography>
      </FlGrid>
      <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
        <input
          style={{ display: 'none' }}
          id="profile-image"
          type="file"
          accept=".jpeg, .png, .webp"
          onClick={(e) => { e.target.value = ''; }}
          onChange={(e) => handleProfileImage(e.target.files[0])}
        />
        <label htmlFor="profile-image">
          <FlIconButton className="profile-avatar-div">
            {progressBar ? <FlCircularProgress variant="determinate" value={Boolean(progressBar)} className="profile-avatar-progress" /> : ''}
            <FlAvatar shape="circle" className="profile-avatar" src={typeof (userDetails?.photoURL) === 'object' ? URL.createObjectURL(userDetails?.photoURL) : userDetails.photoURL || ''} />
          </FlIconButton>
          <FlTypography className="profile-take-photo-label">
            <FlGrid container direction="row" justifyContent="center" alignItems="center">
              <CameraAltOutlinedIcon />
          &nbsp;&nbsp;Change Picture
            </FlGrid>
          </FlTypography>
        </label>
      </FlGrid>
      <FlGrid item md={12} xs={12} className="profile-input-field-div">
        {handleSelected === 'displayName'
          ? (
            <FlTextField
              id="nameRef"
              className="profile-input-field"
              variant="standard"
              color="primary"
              value={userDetails?.displayName || ''}
              onChange={(e) => handleOnChange('displayName', e.target.value.trimLeft())}
              onBlur={() => setHandleSelected('')}
              fullWidth
              inputProps={{
                min: 0,
                maxLength: 25,
                autoComplete: 'off',
                style: {
                  font: isMobile ? 'normal normal 20px "SF Pro Rounded", sans-serif' : 'normal normal 18px "SF Pro Rounded", sans-serif',
                  lineHeight: 'initial',
                  borderBottom: '1px solid #949494',
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="Display Name"
              label="Display Name"
            />
          ) : fieldNameAndValue('Display Name', userDetails?.displayName || '', 'displayName', 'nameRef') }
      </FlGrid>
      <FlGrid item md={12} xs={12} className="profile-input-field-div">
        {handleSelected === 'about'
          ? (
            <FlTextField
              id="aboutRef"
              className="profile-input-field"
              variant="standard"
              color="primary"
              value={userDetails?.about || ''}
              onBlur={() => setHandleSelected('')}
              onChange={(e) => e?.target?.value?.length < 101 && handleOnChange('about', e.target.value.trimLeft())}
              fullWidth
              multiline
              maxLength={100}
              inputProps={{
                min: 0,
                autoComplete: 'off',
                maxLength: 100,
                style: {
                  font: isMobile ? 'normal normal 20px "SF Pro Rounded", sans-serif' : 'normal normal 18px "SF Pro Rounded", sans-serif',
                  lineHeight: 'initial',
                  paddingBottom: '5px',
                  borderBottom: '1px solid #949494',
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="About"
              label="About"
            />
          )
          : fieldNameAndValue('About', userDetails?.about || '', 'about', 'aboutRef') }
      </FlGrid>
      <FlGrid item md={12} xs={12} className="profile-submit-button-div">
        <ButtonWithLoader loading={loading} disabled={loading || Boolean(progressBar)} fullWidth className="intrest-select-confirm-button" variant="contained" color="primary" onClick={handleNextStep}>Looks Good</ButtonWithLoader>
      </FlGrid>
    </FlGrid>
  );
};

export default ProfileUpdate;
