/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
// import LoadingImage from '../assets/loading.gif';
import ErrorImage from '../assets/ImageUnavailable.png';
// import { FlMakeStyles } from '.';

// const useStyles = FlMakeStyles((theme) => ({
//   img: {
//     width: '100%',
//     [theme.breakpoints.down('sm')]: {
//       width: '100%',
//     },
//   },
// }));
// const classes = useStyles();
const FlImageWithLoader = ({ image, description, id }) => (
  <>
    <Img
      // placeholder={LoadingImage}
      src={image}
      error={ErrorImage}
      alt={description}
      style={{
        width: '100%',
        aspectRatio: '3/4',
        // maxHeight: '540px',
      }}
      id={id}
    />
    <div
      style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '100%',
        // maxHeight: '540px',
        background: 'linear-gradient(359.55deg, #000000 -0.47%, rgba(0, 0, 0, 0.8) 18.05%, rgba(28, 33, 33, 0.12) 42.51%, rgba(0, 0, 0, 0.1) 42.51%)',
      }}
      id={id}
    />
  </>
);
export default FlImageWithLoader;

FlImageWithLoader.defaultProps = {
  id: '',
};

FlImageWithLoader.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
};
