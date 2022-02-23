/* eslint-disable linebreak-style */
import React, { useContext, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { AlertNotificationContext } from '../../../../elements/alert-notfication/alertState';
import FileUpload from '../../../../config/fileUpload';
import {
  USER_DETAILS, PROGRESS, CURRENT_STEP, PROFILE_IMAGE,
} from '../../../../actions/authAction';
import ButtonWithLoader from '../../../../elements/buttonWithLoader';
import ImageCropper from '../../../../elements/imageCropper';
import { FlGrid } from '../../../../elements/index';

const ImageCrop = () => {
  const dispatch = useDispatch();
  const { setAlert } = useContext(AlertNotificationContext);
  const userDetails = useSelector((state) => state?.auth?.userDetails);
  const selectedImage = useSelector((state) => state?.auth?.profileImage);
  const [croppedImage, setCroppedImage] = useState('');
  const progressBar = useSelector((state) => state.auth.progressBar);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  const setProgressBar = (value) => {
    dispatch({ type: PROGRESS, payload: value });
  };

  useEffect(() => {
    setCroppedImage(selectedImage);
  }, [selectedImage]);

  const handleOnChange = (key, value) => {
    const newData = { ...userDetails };
    if (key) {
      newData[key] = value;
      dispatch({ type: USER_DETAILS, payload: newData });
      return newData;
    }
    dispatch({ type: USER_DETAILS, payload: newData });
    // switch (key) {
    //   case key:
    //     newData[key] = value;
    //     dispatch({ type: USER_DETAILS, payload: newData });
    //     return newData;
    //   default:
    //     dispatch({ type: USER_DETAILS, payload: newData });
    // }
    return newData;
  };

  const handleBack = () => {
    setCroppedImage('');
    dispatch({ type: PROFILE_IMAGE, payload: '' });
    dispatch({ type: CURRENT_STEP, payload: 2 });
  };

  const handleImageUpload = async () => {
    const fileData = await FileUpload(croppedImage, setProgressBar, setAlert);
    if (fileData) {
      handleOnChange('photoURL', fileData);
      dispatch({ type: CURRENT_STEP, payload: 2 });
    }
  };

  return (
    <FlGrid container spacing={2}>
      <FlGrid item md={12} xs={12}>
        {selectedImage && typeof (selectedImage) === 'object' ? (<ImageCropper selectedImage={selectedImage} handleCropedImage={setCroppedImage} />) : null}
      </FlGrid>
      <FlGrid item md={12} xs={12} className="image_cropper_btn_div">
        <FlGrid container spacing={2} alignItems="center">
          <FlGrid item md={6} xs={6} style={{ textAlign: 'left' }}>
            <ButtonWithLoader fullWidth={isMobile} className="image-cropper-buttons" color="primary" variant="outlined" onClick={handleBack}>Cancel</ButtonWithLoader>
          </FlGrid>
          <FlGrid item md={6} xs={6} style={{ textAlign: 'right' }}>
            <ButtonWithLoader
              loading={Boolean(progressBar)}
              disabled={Boolean(progressBar)}
              onClick={handleImageUpload}
              variant="contained"
              fullWidth={isMobile}
              color="primary"
              className="image-cropper-buttons"
            >
              Confirm
            </ButtonWithLoader>
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </FlGrid>
  );
};

export default ImageCrop;
