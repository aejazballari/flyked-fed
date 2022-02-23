/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import useObjectURL from 'use-object-url';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FlGrid, FlBox } from '../../../elements/index';
import { limitImageSize, getCroppedFile } from './utils';

const ImageCropper = ({ handleCropedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const selectedImage = useSelector((state) => state?.post?.postImage);
  const [resizedUrl, setResizedUrl] = useState('');
  let imageUrl = {};
  if (typeof (selectedImage) === 'object') {
    imageUrl = useObjectURL(selectedImage);
    // console.log(imageUrl, 'dddd');
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
          // console.log(url, 'dddd');
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
        Infinity,
        Infinity,
        'image/jpeg',
        '100%',
      ).then((url) => {
        // console.log(url, croppedArea, 'dddd');
        handleCropedImage(url);
      })
        .catch((err) => console.error(err, 'dddd'));
    }
  };

  return (
    <FlGrid container spacing={2}>
      <FlGrid item md={12} xs={12}>
        <FlBox style={{
          width: isMobile ? '100%' : 500,
          height: 500,
          marginTop: isMobile ? '20px' : '',
          position: 'relative',
        }}
        >
          <Cropper
            image={resizedUrl}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={false}
            onZoomChange={setZoom}
          />
        </FlBox>
      </FlGrid>
    </FlGrid>
  );
};
ImageCropper.propTypes = {
  handleCropedImage: PropTypes.func.isRequired,
};

export default ImageCropper;
