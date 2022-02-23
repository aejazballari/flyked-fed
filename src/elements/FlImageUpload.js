/* eslint-disable linebreak-style */
import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonWithLoader from './buttonWithLoader';
import { AlertNotificationContext } from './alert-notfication/alertState';
import {
  FlBox, FlMakeStyles, FlInputLabel, FlList, FlTypography, FlListItem,
  FlGrid, FlDialog, FlDialogTitle, FlDialogContent, FlSlide,
} from '.';
import ImageCropper from './imageCropper';
import UploadIcon from '../assets/UploadIcon.svg';
import WebUploadIcon from '../assets/WebUpload.svg';
import FileUpload from '../config/fileUpload';

const useStyles = FlMakeStyles(() => ({
  cardMobile: {
    marginTop: '10px',
    backgroundColor: '#ffffff',
    minHeight: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    border: '0.5px solid #cecece',
  },
  cardWeb: {
    marginTop: '10px',
    backgroundColor: '#F7F7F8',
    minHeight: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  label: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#888F9D',
    textAlign: 'center',
  },
  icon: {
    height: '35px',
    objectFit: 'contain',
  },
  listItem: {
    justifyContent: 'center',
  },
}));

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <FlSlide direction="up" ref={ref} {...props} />);

const FlImageUpload = ({
  name, onChange, type, modelName,
}) => {
  const { setAlert } = useContext(AlertNotificationContext);
  const classes = useStyles();
  const [isUploaded, setIsUploaded] = useState(false);
  const appTheme = useTheme();
  const inputRef = useRef(null);
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  let uploadDiv = null;
  const [openCropModel, setOpenCropModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [croppedImage, setCroppedImage] = useState('');
  const [progress, setProgress] = useState(0);
  // let url = '';

  const imageUpload = (data) => {
    uploadDiv.style.display = 'none';
    if (data?.size > 5000000) {
      setAlert('warning', 'Image size must be less than 5MB');
      return;
    }
    if (data?.type === 'image/png' || data?.type === 'image/jpeg' || data?.type === 'image/webp') {
      setOpenCropModel(true);
      setSelectedImage(data);
    } else {
      setAlert('warning', 'Upload only images on png or jpeg or webp format');
    }
  };
  const triggerFileInput = () => {
    inputRef?.current?.click();
  };

  const handleImageUpload = async () => {
    const fileData = await FileUpload(croppedImage, setProgress, setAlert, type);
    if (fileData) {
      onChange(fileData);
      setIsUploaded(true);
      setSelectedImage(fileData);
      setOpenCropModel(false);
      setProgress(0);
    }
  };

  const handleBack = () => {
    setSelectedImage('');
    setOpenCropModel(false);
    setProgress(0);
    inputRef?.current?.click();
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
    <>
      <FlInputLabel htmlFor="import-button">
        <input
          name={name}
          onClick={(e) => { e.target.value = ''; }}
          ref={inputRef}
          onChange={(e) => imageUpload(e.target.files[0])}
          type="file"
          multiple={false}
          accept=".jpeg, .png, .webp"
          id="file-upload"
          style={{ display: 'none' }}
        />
      </FlInputLabel>
      <FlBox className={isMobile ? classes.cardMobile : classes.cardWeb} onClick={triggerFileInput}>
        {isMobile
          ? (
            <FlList ref={(div) => { uploadDiv = div; }}>
              <FlListItem className={classes.listItem}>
                <img src={UploadIcon} alt="icon" className={classes.icon} />
              </FlListItem>
              <FlListItem className={classes.listItem}>
                <FlTypography className={classes.label}>
                  Add Page Icon
                </FlTypography>
              </FlListItem>
            </FlList>
          )
          : (
            <div ref={(div) => { uploadDiv = div; }}>
              <img src={WebUploadIcon} alt="icon" className={classes.icon} />
              <FlTypography className={classes.label}>
                Add Page Icon
              </FlTypography>
            </div>
          )}
        {isUploaded
          ? <img src={selectedImage} alt="icon" className={classes.preview} style={{ maxHeight: '200px', objectFit: 'contain' }} />
          : null}
      </FlBox>

      <FlDialog
        open={openCropModel}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
        aria-describedby="alert-dialog-slide-description"
      >
        <FlDialogTitle>
          <FlTypography style={{ font: "normal normal 500 18px/21px 'SF Pro Display', sans-serif", color: '#172849' }}>{modelName}</FlTypography>
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
                    loading={Boolean(progress)}
                    disabled={Boolean(progress)}
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
    </>
  );
};

export default FlImageUpload;

FlImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
};
