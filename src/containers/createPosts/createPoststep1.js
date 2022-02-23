/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateFnUtils from '@date-io/date-fns';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import TodayIcon from '@material-ui/icons/Today';
import {
  FlGrid, FlTypography, FlDivider, FlButton, FlTextField,
} from '../../elements/index';
import {
  POST_TEXT,
  POST_IMAGE,
  DATE_OF_BIRTH,
  POST_CROPER_MODEL,
  CURRENT_STEP,
} from '../../actions/postAction';
import imageUpload from '../../assets/imageInput.svg';
import './style.css';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import ButtonWithLoader from '../../elements/buttonWithLoader';
import * as postAction from '../../actions/postAction';
import PostTypeSelection from './postTypeSelection';
import PostImageCroperModel from './postImageCroperModel';

const styles = makeStyles(() => ({
  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#5d5d5e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      font: 'normal normal 17px/25px "SF Pro Rounded", sans-serif !important',
    },
  },
  inputMobile: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'litegray',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      font: 'normal normal 16px/25px "SF Pro Rounded", sans-serif !important',
    },
  },
}));

const CreatePostStep1 = () => {
  const inputRef = useRef();
  const classes = styles();
  const history = useHistory();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const dispatch = useDispatch();
  const dragAndDropZone = useRef();
  const { setAlert } = useContext(AlertNotificationContext);
  const selectedImage = useSelector((state) => state?.post?.postImage);
  const postText = useSelector((state) => state?.post?.postText);
  const searchValue = useSelector((state) => state?.post?.searchText);
  const progress = useSelector((state) => state?.post?.progressUpload);
  const isloading = useSelector((state) => state?.post?.loading);
  const postTypeSelected = useSelector(
    (state) => state?.post?.postTypeSelected,
  );
  const dateOfBirth = useSelector((state) => state?.post?.dateOfBirth);
  const openCropModel = useSelector((state) => state?.post?.postCropModel);
  const pageRouteFrom = useSelector((state) => state?.post?.postRouteForm);

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleImage = async (data) => {
    // if (!postText) {
    //   setAlert('warning', 'Please enter a text before adding the image');
    //   return;
    // }
    if (data?.size > 5000000) {
      setAlert('warning', 'Image size must be less than 5MB');
      return;
    }
    if (data?.type === 'image/png' || data?.type === 'image/jpeg' || data?.type === 'image/webp') {
      dispatch({ type: POST_CROPER_MODEL, payload: true || '' });
      dispatch({ type: POST_IMAGE, payload: data || '' });
    } else {
      setAlert('warning', 'Upload only images on png or jpeg or webp format');
    }
  };

  function handleDrop(e) {
    const data = e.dataTransfer;
    const { files } = data;
    if (files && files.length > 1) {
      setAlert('warning', 'you can upload only one image at a time');
    } else if (parseInt(progress, 10) === 0) {
      handleImage(files[0]);
    }
  }

  useEffect(() => {
    if (dragAndDropZone) {
      dragAndDropZone.current.addEventListener('dragenter', preventDefault, false);
      dragAndDropZone.current.addEventListener('dragleave', preventDefault, false);
      dragAndDropZone.current.addEventListener('dragover', preventDefault, false);
      dragAndDropZone.current.addEventListener('drop', preventDefault, false);
      dragAndDropZone.current.addEventListener('drop', handleDrop, false);
    }
  }, [dragAndDropZone]);

  const handleContinue = () => {
    if (!postTypeSelected) {
      setAlert('warning', 'Please Select Post type');
      return;
    }
    if (!postText) {
      setAlert('warning', 'Please enter about post');
      return;
    }
    if (!selectedImage) {
      setAlert('warning', 'Please upload post image');
      return;
    }
    if (postTypeSelected?.key === 'onBirthday' || postTypeSelected?.key === 'onThisDay') {
      if (!dateOfBirth) {
        setAlert('warning', 'Please enter Date of Birth');
        return;
      }
    }
    if (pageRouteFrom === 'pageDetail') {
      dispatch({ type: CURRENT_STEP, payload: 2 });
    } else {
      dispatch(postAction.handleSearchPage(searchValue, 1, setAlert));
    }
  };

  const updateDate = (value) => {
    dispatch({ type: DATE_OF_BIRTH, payload: value });
  };

  const handleStep1Back = (step) => {
    dispatch({ type: POST_CROPER_MODEL, payload: false || '' });
    dispatch({ type: POST_IMAGE, payload: '' });
    if (step === 1) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <FlGrid container spacing={2}>
        <FlGrid item md={11} xs={12}>
          <FlGrid container spacing={2} className="post-step-container-card">
            {isMobile ? (
              <FlGrid item md={12} xs={12} className="post-step-back-btn-div">
                <FlButton
                  variant="text"
                  onClick={() => history.push('/')}
                  className="post-step-back-btn"
                >
                  <ArrowBackIosIcon fontSize="small" />
                  &nbsp;&nbsp;Create Post
                </FlButton>
              </FlGrid>
            ) : null}
            <FlGrid item md={12} xs={12}>
              <FlTypography className="post-category-select-title">Please choose the type of post you want to add</FlTypography>
            </FlGrid>
            <FlGrid item md={12} xs={12} style={{ maxWidth: '100%', overflowY: 'auto' }}>
              <PostTypeSelection viewType={isMobile ? 'mobile' : 'desktop'} />
            </FlGrid>
            <FlGrid item md={12} xs={12} style={{ marginBottom: isMobile ? '10px' : '' }}>
              <FlTextField
                value={postText}
                maxLength={125}
                onFocus={(e) => { e.target.placeholder = ''; }}
                multiline
                rows={4}
                // inputStyle={{ fontSize: '50px' }}
                InputProps={{
                  disableUnderline: true,
                  classes: { input: isMobile ? classes.inputMobile : classes.input },
                }}
                inputProps={{
                  disableUnderline: true,
                  min: 0,
                  maxLength: 125,
                  style: {
                    textAlign: 'center',
                    color: isMobile ? '#fff' : '#1C2121',
                    alignItems: 'center',
                    font: isMobile ? 'normal normal 22px/25px "SF Pro Rounded", sans-serif' : 'normal normal 20px/25px "SF Pro Rounded", sans-serif',
                    lineHeight: 'initial',
                  },
                }}
                style={{ textAlign: 'center' }}
                autoComplete="on"
                onBlur={(e) => { e.target.placeholder = 'Tap to type your fact max length 125 characters'; }}
                placeholder="Tap to type your fact max length 125 characters"
                className="post-form-inputfield"
                onChange={(e) => e?.target?.value?.length < 126
                && dispatch({ type: POST_TEXT, payload: e.target.value.trimLeft() })}
              />
              {postText ? (
                <FlTypography style={{
                  textAlign: 'right', padding: '10px 10px 0px 0px', color: isMobile ? '#5d5d5e' : 'gray', margin: '0px',
                }}
                >
                  {postText ? `Limit: 125 characters. remaining: ${125 - postText?.length}` : ''}
                </FlTypography>
              ) : null}
            </FlGrid>
            <FlGrid item md={12} xs={12} style={{ marginBottom: isMobile ? '10px' : '' }}>
              <FlGrid container>
                <input
                  style={{ display: 'none' }}
                  id="profile-image"
                  type="file"
                  accept=".jpeg, .png, .webp"
                  disabled={progress}
                  onChange={(e) => handleImage(e.target.files[0])}
                  ref={inputRef}
                  onClick={(e) => { e.target.value = ''; }}
                />
                <label
                  htmlFor="profile-image"
                  style={{
                    width: '100%',
                    cursor: progress ? 'no-drop' : 'pointer',
                  }}
                >
                  <FlGrid
                    // onClick={() => (!postText
                    // ? setAlert(
                    //     'warning',
                    //     'Please enter a text before adding the image.',
                    //   )
                    //   : '')}
                    ref={dragAndDropZone}
                    item
                    md={12}
                    xs={12}
                    className="post-image-input-card"
                  >
                    {selectedImage !== '' && !openCropModel ? (
                      <img
                        className="post-image-uploaded"
                        src={typeof selectedImage === 'object' ? URL.createObjectURL(selectedImage) : selectedImage}
                        alt="crash"
                      />
                    ) : (
                      <>
                        <img
                          className="post-image-input-card-icon"
                          src={imageUpload}
                          alt="uploadImage"
                        />
                        <FlTypography className="post-image-input-card-label">
                          Drag and drop image or click to Upload
                        </FlTypography>
                        <FlTypography className="post-image-input-card-sub-label">
                          <InfoOutlinedIcon fontSize="small" style={{ fontSize: '15px' }} />
                            &nbsp;Image size should be less than 5MB
                        </FlTypography>
                      </>
                    )}
                  </FlGrid>
                </label>
              </FlGrid>
            </FlGrid>
            <FlGrid
              item
              md={12}
              xs={12}
              style={{
                display:
                  postTypeSelected && (postTypeSelected?.key === 'onBirthday' || postTypeSelected?.key === 'onThisDay')
                    ? 'flex'
                    : 'none',
              }}
            >
              <MuiPickersUtilsProvider
                utils={DateFnUtils}
                style={{ color: 'red !important' }}
              >
                <KeyboardDatePicker
                  fullWidth
                  required
                  value={dateOfBirth}
                  onChange={updateDate}
                  format="dd / MM / yyyy"
                  inputVariant="outlined"
                  maxDate={new Date()}
                  placeholder="Date of Birth"
                  className="post-form-date-picker"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  keyboardIcon={(
                    <TodayIcon
                      style={{
                        color: isMobile
                          ? 'rgba(227, 229, 232, 0.2)'
                          : 'lightslategray',
                      }}
                    />
                  )}
                  inputProps={{ disableUnderline: true }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontSize: 14,
                      height: 44,
                      color: isMobile ? '#fff' : '#1c2121',
                      border: 'none',
                    },
                  }}
                />
              </MuiPickersUtilsProvider>
            </FlGrid>
          </FlGrid>
          <FlGrid container style={{ margin: isMobile ? '0px' : '-8px' }}>
            <FlGrid
              item
              md={12}
              xs={12}
              style={{ display: isMobile ? 'none' : '', width: '100%' }}
            >
              <FlDivider />
            </FlGrid>
            <FlGrid item md={12} xs={12} className="post-next-btn-div">
              <ButtonWithLoader
                style={{
                  opacity:
                    !postText
                    || !selectedImage
                    || !postTypeSelected
                    || ((postTypeSelected?.key === 'onBirthday' || postTypeSelected?.key === 'onThisDay') && !dateOfBirth)
                      ? 0.8
                      : 1,
                  cursor: !postText || !selectedImage ? 'no-drop' : 'pointer',
                }}
                className="post-next-step-btn"
                variant="contained"
                fullWidth={isMobile}
                color="primary"
                onClick={() => handleContinue()}
                disabled={isloading}
                loading={isloading}
              >
                {pageRouteFrom === 'pageDetail' ? 'Preview Post' : 'Continue'}
              </ButtonWithLoader>
            </FlGrid>
          </FlGrid>
        </FlGrid>
      </FlGrid>
      {openCropModel ? (
        <PostImageCroperModel handleStep1Back={handleStep1Back} />
      ) : (
        ''
      )}
    </>
  );
};

export default CreatePostStep1;
