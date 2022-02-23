/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import html2canvas from 'html2canvas';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  FlDialog, FlDialogContent, FlDialogTitle, FlSlide, FlDivider,
  FlGrid, FlTypography, FlIconButton, FlDialogActions,
} from '../../elements/index';
import ImageCropper from './imgCropper';
import { POST_CROPER_MODEL, POST_IMAGE, PALLET_COLOR } from '../../actions/postAction';
// import ColorPallet from './colorPallet';
import './style.css';
import ButtonWithLoader from '../../elements/buttonWithLoader';

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FlSlide direction="up" ref={ref} {...props} />
));

const PostImageCroperModel = ({ handleStep1Back }) => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const openCropModel = useSelector((state) => state?.post?.postCropModel);
  const selectedImage = useSelector((state) => state?.post?.postImage);
  const dispatch = useDispatch();
  const progress = useSelector((state) => state?.post?.progressUpload);
  const [cropedImage, setCropedImage] = useState('');
  // const [imageDiv, setImageDiv] = useState('');
  // const [textDiv, setTextDiv] = useState('');
  // const [colorPalletDiv, setColorPalletDiv] = useState('');
  // const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (selectedImage && typeof selectedImage === 'string') {
      setCurrentStep(2);
    }
  }, []);

  // const blobToBase64 = (blob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   return new Promise((resolve) => {
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //   });
  // };

  const handleConfirm = async () => {
    if (cropedImage && currentStep === 1) {
      // setLoading(true);
      dispatch({ type: POST_IMAGE, payload: cropedImage });
      dispatch({ type: POST_CROPER_MODEL, payload: false || '' });
      // blobToBase64(cropedImage).then((res) => {
      //   dispatch({ type: POST_IMAGE, payload: res });
      //   setCurrentStep(2);
      //   dispatch({ type: POST_CROPER_MODEL, payload: false || '' });
      // });
    }
    // } else if (currentStep === 2) {
    //   if (imageDiv) {
    //     setLoading(true);
    //     textDiv?.remove();
    //     if (pallet === 'removePalette') {
    //       colorPalletDiv?.remove();
    //     }
    //     html2canvas(imageDiv).then((canvas) => {
    //       const ImageBase64 = canvas.toDataURL();
    //       if (ImageBase64) {
    //         dispatch({ type: POST_IMAGE, payload: ImageBase64 || '' });
    //         setTimeout(() => {
    //           setLoading(false);
    //           dispatch({ type: POST_CROPER_MODEL, payload: false || '' });
    //         }, 0);
    //       }
    //     });
    //     // htmlToImage
    //     //   .toJpeg(imageDiv)
    //     //   .then(() => {
    //     //     htmlToImage.toJpeg(imageDiv).then((dataUrl) => {

    //     //     });
    //     //   })
    //     //   .catch((error) => {
    //     //     setLoading(false);
    //     //     console.error('oops, something went wrong!', error);
    //     //   });
    //   }
    // }
  };

  // const stepNames = ['Image Cropper', 'Colour Palette'];

  const handleBack = () => {
    if (currentStep === 2) {
      dispatch({ type: PALLET_COLOR, payload: '' });
      // handleConfirm('removePalette');
      handleConfirm();
    } else {
      handleStep1Back(currentStep);
    }
  };

  // const handleImageChange = () => {
  //   setCurrentStep(1);
  //   handleStep1Back(1);
  //   dispatch({ type: PALLET_COLOR, payload: '' });
  // };

  const handleCloseModel = () => {
    dispatch({ type: PALLET_COLOR, payload: '' });
    dispatch({ type: POST_IMAGE, payload: '' });
    dispatch({ type: POST_CROPER_MODEL, payload: false || '' });
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
      open={openCropModel}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: isMobile ? '' : '10px',
          margin: isMobile ? '0px' : '',
          bottom: isMobile ? '0px' : '',
          position: isMobile ? 'absolute' : '',
          backgroundColor: isMobile ? '#000000' : '',
        },
      }}
      fullScreen={isMobile}
      maxWidth={currentStep === 1 ? 'sm' : 'md'}
      aria-describedby="alert-dialog-slide-description"
    >
      <FlDialogTitle>
        <FlGrid container spacing={2} justifyContent="space-between" alignItems="center" style={isMobile ? { padding: '5px 0px' } : {}}>
          <FlTypography className="post-image-croper-model-header">
            <FlIconButton size="small" style={{ display: isMobile ? '' : 'none', color: isMobile ? '#FFFFFF' : '' }} onClick={() => handleBack()}><ArrowBackIosIcon size="small" style={{ fontSize: '20px', paddingRight: '10px' }} /></FlIconButton>
            Edit Image
          </FlTypography>
          <FlIconButton onClick={() => handleCloseModel()} style={{ display: isMobile ? 'none' : 'block' }}>
            <CloseIcon size="small" style={{ color: '#000000', fontSize: '20px' }} />
          </FlIconButton>
        </FlGrid>
      </FlDialogTitle>
      <FlDivider />
      <FlDialogContent>
        <FlGrid container spacing={2} style={{ width: '100%', height: '100%' }}>
          <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
            {currentStep === 1 && typeof selectedImage === 'object' ? (
              <ImageCropper handleCropedImage={setCropedImage} />
            ) : (
              ''
            )}
            {/* {currentStep === 2 ? (
              <ColorPallet
                handleImageDiv={setImageDiv}
                handleTextDiv={setTextDiv}
                handleColorPalletDiv={setColorPalletDiv}
                handleImageChange={handleImageChange}
                viewColorPallet
              />
            ) : (
              ''
            )} */}
          </FlGrid>
        </FlGrid>
      </FlDialogContent>
      <FlDivider style={{ display: isMobile ? 'none' : '' }} />
      <FlDialogActions className="post-croper-model-footer">
        <FlGrid container spacing={2} style={{ margin: '0px' }} justifyContent="flex-end" alignItems="center">
          <FlGrid item xs={isMobile ? 6 : 'auto'} style={{ display: isMobile ? 'none' : 'block' }}>
            <ButtonWithLoader
              variant="outlined"
              color="primary"
              fullWidth={isMobile}
              disabled={Boolean(progress)}
              onClick={() => handleBack()}
              className="post-croper-model-footer-btn"
            >
              Back
            </ButtonWithLoader>
          </FlGrid>
          <FlGrid item xs={isMobile ? 12 : 'auto'} style={isMobile ? { padding: '0px', margin: '0px' } : {}}>
            <ButtonWithLoader
              className="post-croper-model-footer-btn"
              loading={Boolean(progress)}
              disabled={Boolean(progress)}
              variant="contained"
              color="primary"
              fullWidth={isMobile}
              onClick={handleConfirm}
            >
              {isMobile ? 'Continue' : 'Next'}
            </ButtonWithLoader>
          </FlGrid>
        </FlGrid>
      </FlDialogActions>
    </FlDialog>
  );
};

PostImageCroperModel.propTypes = {
  handleStep1Back: PropTypes.func.isRequired,
};

export default PostImageCroperModel;
