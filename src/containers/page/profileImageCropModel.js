/* eslint-disable linebreak-style */
import React, { useContext, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import FileUpload from '../../config/fileUpload';
import ButtonWithLoader from '../../elements/buttonWithLoader';
import ImageCropper from '../../elements/imageCropper';
import './updateView.css';
import {
  FlGrid, FlSlide, FlDialog, FlDialogTitle, FlDialogContent, FlTypography,
} from '../../elements/index';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <FlSlide direction="up" ref={ref} {...props} />);

const ProfileImageCrop = ({
  selectedImage, handleSelectedImage, handleBackProfile, openModel,
}) => {
  const { setAlert } = useContext(AlertNotificationContext);
  const [croppedImage, setCroppedImage] = useState('');
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    if (openModel) {
      setCroppedImage(selectedImage);
    }
  }, [openModel]);

  const handleBack = () => {
    setCroppedImage('');
    handleBackProfile();
  };

  const handleImageUpload = async () => {
    const fileData = await FileUpload(croppedImage, setProgressBar, setAlert);
    if (fileData) {
      handleSelectedImage(fileData);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return false;
    }

    if (reason === 'escapeKeyDown') {
      return false;
    }
    return true;
  };

  return (
    <FlDialog
      open={openModel}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={isMobile}
      PaperProps={{
        style: {
          width: isMobile ? '100%' : '520px',
          borderRadius: isMobile ? '0px' : '10px',
          margin: isMobile ? '0px' : '',
          bottom: isMobile ? '0px' : '',
          position: isMobile ? 'absolute' : '',
          background: 'white',
        },
      }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <FlDialogTitle>
        <FlTypography style={{ font: "normal normal 500 18px/21px 'SF Pro Display', sans-serif", color: '#172849' }}>Update Profile Image</FlTypography>
      </FlDialogTitle>
      <FlDialogContent>
        <FlGrid container spacing={2}>
          <FlGrid item md={12} xs={12}>
            {selectedImage && typeof (selectedImage) === 'object' ? (<ImageCropper selectedImage={selectedImage} handleCropedImage={setCroppedImage} />) : null}
          </FlGrid>
          <FlGrid item md={12} xs={12} className="profile_image_cropper_btn_div" style={{ width: '100%' }}>
            <FlGrid container spacing={2} alignItems="center">
              <FlGrid item md={6} xs={6} style={{ textAlign: 'left' }}>
                <ButtonWithLoader fullWidth={isMobile} className="profile_image-cropper-buttons" color="primary" variant="outlined" onClick={() => handleBack()}>Cancel</ButtonWithLoader>
              </FlGrid>
              <FlGrid item md={6} xs={6} style={{ textAlign: 'right' }}>
                <ButtonWithLoader
                  loading={Boolean(progressBar)}
                  disabled={Boolean(progressBar)}
                  onClick={() => handleImageUpload()}
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
      </FlDialogContent>
    </FlDialog>
  );
};

ProfileImageCrop.propTypes = {
  selectedImage: PropTypes.instanceOf(Object).isRequired,
  handleSelectedImage: PropTypes.func.isRequired,
  handleBackProfile: PropTypes.func.isRequired,
  openModel: PropTypes.bool.isRequired,
};

export default ProfileImageCrop;
