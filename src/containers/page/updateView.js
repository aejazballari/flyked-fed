/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useContext, useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import DateFnUtils from '@date-io/date-fns';
// import moment from 'moment';
import NativeSelect from '@material-ui/core/NativeSelect';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import PageLayout from '../../layouts/createLayout';
import * as profileAction from '../../actions/profileAction';
import ProfileImageCrop from './profileImageCropModel';
import PageMetaTags from '../../elements/pageMetaTags';
import {
  FlGrid,
  FlKeyboardDatePicker,
  FlFormControl,
  FlInputLabel,
  FlMuiPickersUtilsProvider,
  FlTextField,
  FlButton,
  FlTypography,
  FlIconButton,
  FlAvatar,
  FlCircularProgress,
} from '../../elements';
import './updateView.css';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import BackArrow from '../../assets/backArrow.svg';

const UpdateView = () => {
  const userDetails = useSelector((state) => state.profile.userDetails);
  const dispatch = useDispatch();
  // const userDetails = userInfo?.user;
  const [switchState, setSwitchState] = useState(false);
  const [progressBar] = useState(0);

  const [values, setValues] = useState(userDetails);
  // const [date, setDate] = useState(null);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  // const userDetails = {};
  const { setAlert } = useContext(AlertNotificationContext);
  const [selectedImage, setSelectedImage] = useState('');
  const [openCropModel, setOpenCropModel] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setLoader(true);
      dispatch(profileAction.viewProfile(() => setLoader(false)));
    }
  }, []);

  useEffect(() => {
    setValues(userDetails);
  }, [userDetails]);

  useEffect(() => {
    setSwitchState(userDetails.emailNotification);
  }, [userDetails]);

  const handleOnChange = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  const handleProfileImage = async (data) => {
    if (data?.size > 5000000) {
      setAlert('warning', 'Image size must be less than 5MB');
      return;
    }
    if (data?.type === 'image/png' || data?.type === 'image/jpeg' || data?.type === 'image/webp') {
      setSelectedImage(data);
      setOpenCropModel(true);
    } else {
      setAlert('warning', 'Upload only images on png or jpeg or webp format');
    }
  };

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
    setValues({
      ...values, emailNotification: event.target.checked,
    });
  };

  const updateValues = (term) => {
    const { name, value } = term;
    setValues({
      ...values, [name]: value,
    });
  };

  const updateDate = (value) => {
    // console.log('value123', value);
    // const d = moment(value).format('DD-MM-YYYY');
    // console.log('value1234', d);

    // setDate(value);
    setValues({
      ...values, dob: value,
    });
    // console.log('value12345', values.dob);
  };

  const handleRefresh = () => {
    dispatch(profileAction.viewProfile());
  };

  const handleValidation = () => {
    const error = {};
    let formIsValid = true;
    if (values.name === '') {
      formIsValid = false;
      error.title = 'Cannot be empty';
    }
    // if (values.about === '') {
    //   formIsValid = false;
    //   error.title = 'Cannot be empty';
    // }
    if (values.dob === '') {
      formIsValid = false;
      error.title = 'Cannot be empty';
    }
    if (values.profileImage === '') {
      formIsValid = false;
      error.title = 'Cannot be empty';
    }
    return formIsValid;
  };

  const updateUserProfileHandler = () => {
    const userData = {
      name: values?.name || '',
      email: values?.email || '',
      profileImage: values?.profileImage || '',
      gender: values?.gender,
      about: values?.about || '',
      socialID: values?.socialID || '',
      dob: values?.dob,
      email_notification: values.emailNotification,
    };

    if (handleValidation()) {
      dispatch(profileAction.handleUpdateView(userData, setAlert, handleRefresh));
    } else {
      setAlert('error', 'Please fill all the fields');
    }
  };

  const Loader = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <FlCircularProgress />
    </div>
  );

  const handleProgresBar = () => (<FlCircularProgress variant="determinate" value={progressBar} className="profile-avatar-progress" />);

  return (
    <>
      <PageMetaTags title="Flyked - Profile Update" image="" description="Profile Update" currentUrl={window?.location?.href || ''} />
      {loader
        ? (<Loader />)
        : (
          <PageLayout pageName="Settings" className="update-profile-view" footer={false}>
            <FlGrid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="updateProfile-section"
            >
              <FlGrid item md={4} xs={12} />
              <FlGrid item md={4} xs={12} style={{ marginTop: isMobile ? '40px' : '0px' }}>
                <FlGrid item md={12} xs={12} className="backArrow">
                  <FlButton onClick={() => history.push('/user/profile')}>
                    <img src={BackArrow} alt="back arrow" />
                    {' '}
&nbsp; &nbsp;
                    <FlTypography>Back</FlTypography>
                  </FlButton>
                </FlGrid>
                <FlGrid item md={12} xs={12} className="profile-avatar-div">
                  <FlIconButton>
                    {progressBar ? handleProgresBar() : ''}
                    <FlAvatar shape="circle" className="profile-avatar" src={typeof (values?.profileImage) === 'object' ? URL.createObjectURL(values?.profileImage) : values.profileImage || ''} />
                  </FlIconButton>
                </FlGrid>
                <FlGrid item md={12} xs={12} style={{ textAlign: 'center', position: 'relative' }}>
                  <FlGrid item md={12} xs={12}>
                    <input
                      style={{ display: 'none' }}
                      id="profile-image"
                      type="file"
                      accept=".jpeg, .png, .webp"
                      onChange={(e) => handleProfileImage(e.target.files[0])}
                      onClick={(e) => { e.target.value = ''; }}
                    />
                    <label htmlFor="profile-image">
                      <FlTypography className="profile-take-photo-label profileText-info">
                        <FlGrid container direction="row" justifyContent="center" alignItems="center" className="changePhoto-text">
                          <CameraAltOutlinedIcon />
          &nbsp;&nbsp;Change Picture
                        </FlGrid>
                      </FlTypography>
                    </label>
                  </FlGrid>
                </FlGrid>

                <FlGrid>
                  <div className="profile-details-block">
                    <div className="">
                      <FlTextField
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          min: 0,
                          autoComplete: 'off',
                          maxLength: 52,
                          style: {
                            font: isMobile ? 'normal normal 15px "SF Pro Rounded", sans-serif' : 'normal normal 18px "SF Pro Rounded", sans-serif',
                            lineHeight: 'initial',
                            borderBottom: '1px solid #949494',
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        className="uv-input-width dName"
                        id="standard-basic"
                        name="name"
                        label="Display Name *"
                        value={values?.name}
                        onChange={(e) => handleOnChange('name', e.target.value.trimLeft())}
                      />
                    </div>
                    <div>
                      <FlTextField
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          maxLength: 250,
                          style: {
                            font: isMobile ? 'normal normal 15px "SF Pro Rounded", sans-serif' : 'normal normal 18px "SF Pro Rounded", sans-serif',
                            lineHeight: 'initial',
                            borderBottom: '1px solid #949494',
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        className="uv-input-width about"
                        id="standard-basic1"
                        name="about"
                        label="About"
                        value={values?.about}
                        onChange={(e) => handleOnChange('about', e.target.value.trimLeft())}
                      />
                    </div>
                    <div>
                      <FlGrid
                        container
                        direction="row"
                        className="gender-row"
                      >
                        <FlGrid item md={6} xs={6}>
                          <FlFormControl fullWidth className="gender-block">
                            <FlInputLabel htmlFor="uncontrolled-native" className="gender-label">Gender</FlInputLabel>
                            <NativeSelect
                              value={values?.gender}
                              onChange={(e) => updateValues(e.target)}
                              inputProps={{
                                name: 'gender',
                                id: 'uncontrolled-native',
                              }}
                              defaultValue="male"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Others</option>
                            </NativeSelect>
                          </FlFormControl>

                        </FlGrid>
                        <FlGrid spacing={2} item md={6} xs={6} className="bob-field">
                          <FlMuiPickersUtilsProvider utils={DateFnUtils}>
                            <FlKeyboardDatePicker
                              fullWidth
                              autoOk
                              disableFeature
                              placeholder="Start Date"
                        // helperText="Select Date"
                              value={values?.dob}
                              onChange={(data, value) => updateDate(value)}
                        // onError={console.log}
                              inputVariant="standard"
                              maxDate={new Date()}
                              format="yyyy/MM/dd"
                              label="Date of Birth"
                              className="dob-inputField dob"
                            />
                            {/* <FlKeyboardDatePicker
                        fullWidth
                        name="dob"
                        required
                        value={values?.dob}
                        onChange={updateDate}
                        label="Date of Birth"
                        format="dd / MM / yyyy"
                        inputVariant="standard"
                        className="dob-inputField dob"
                        maxDate={new Date()}
                        emptyLabel="DOB"
                      /> */}
                          </FlMuiPickersUtilsProvider>
                        </FlGrid>
                      </FlGrid>
                    </div>
                    <div>
                      <FlTextField
                        InputLabelProps={{ shrink: true }}
                        className="uv-input-width email"
                        id="standard-basic4"
                        name="email"
                        label="Email"
                        disabled
                        value={values?.email}
                        onChange={(e) => handleOnChange('email', e.target.value.trimLeft())}
                      />
                    </div>
                  </div>
                  <div className="notification-block">
                    <FlTypography variant="h4" className="notification-header">Email Notifications</FlTypography>
                    <div className="notification-line">
                      <FlTypography variant="h5">Receive Email Notifications</FlTypography>
                      <Switch
                        checked={switchState}
                        onChange={handleSwitchChange}
                        name="checkedA"
                        value={values?.emailNotification}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    </div>
                  </div>
                  {
            isMobile ? (
              <div className="mbl-updateBtns">
                <FlButton variant="outlined" className="cancelBtn" onClick={() => history.push('/')}>Cancel</FlButton>
                <FlButton variant="contained" color="primary" onClick={updateUserProfileHandler}>Save</FlButton>
              </div>
            ) : (
              <div className="button-block">
                <FlButton variant="outlined" className="cancelBtn" onClick={() => history.push('/')}>Cancel</FlButton>
                <FlButton variant="contained" color="primary" onClick={updateUserProfileHandler}>Save</FlButton>
              </div>
            )
          }

                </FlGrid>
              </FlGrid>
              <FlGrid item md={4} xs={12} />
            </FlGrid>
          </PageLayout>
        )}
      {openCropModel ? (
        <ProfileImageCrop
          openModel={openCropModel}
          selectedImage={selectedImage}
          handleSelectedImage={(value) => {
            handleOnChange('profileImage', value);
            setOpenCropModel(false);
            setSelectedImage('');
          }}
          handleBackProfile={() => {
            setOpenCropModel(false);
            setSelectedImage('');
          }}
        />
      ) : null}
    </>
  );
};

export default UpdateView;
