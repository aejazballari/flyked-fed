/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import useObjectURL from 'use-object-url';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { limitImageSize, getCroppedFile } from './utils';
import { FlBox, FlGrid } from '..';

const ImageCropper = ({ selectedImage, handleCropedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const [resizedUrl, setResizedUrl] = useState('');
  let imageUrl = {};
  if (typeof (selectedImage) === 'object') {
    imageUrl = useObjectURL(selectedImage);
  }

  useEffect(() => {
    if (selectedImage && typeof (selectedImage) === 'object' && imageUrl) {
      limitImageSize({
        imageUrl,
        maxWidth: Infinity,
        maxHeight: Infinity,
        mimeType: 'image/jpeg',
        quality: '100%',
      })
        .then((url) => {
          setResizedUrl(url);
        })
        .catch((err) => console.error(err, 'dddd'));
    } else {
      setResizedUrl('');
    }
  }, [selectedImage, imageUrl]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    if (selectedImage && typeof (selectedImage) === 'object') {
      getCroppedFile(
        resizedUrl,
        croppedAreaPixels,
        3000,
        3000,
        'image/jpeg',
        '100%',
      ).then((url) => {
        handleCropedImage(url);
      })
        .catch((err) => console.error(err, 'dddd'));
    }
  };

  return (
    <FlGrid container spacing={2}>
      <FlGrid item md={12} xs={12}>
        <FlBox style={{
          width: '100%',
          height: 500,
          marginTop: isMobile ? '20px' : '',
          position: 'relative',
        }}
        >
          <Cropper
            image={resizedUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showFlGrid={false}
            // cropSize={{ width: 450, height: 450 }}
            onZoomChange={setZoom}
          />
        </FlBox>
      </FlGrid>
    </FlGrid>
  );
};
ImageCropper.propTypes = {
  handleCropedImage: PropTypes.func.isRequired,
  selectedImage: PropTypes.instanceOf(Object).isRequired,
};

export default ImageCropper;
