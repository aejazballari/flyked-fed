/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import FlImageWithLoader from '../../elements/FlImageWithLoader';
import { FlMakeStyles, FlTypography, FlGrid } from '../../elements';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import * as feedsPostAction from '../../actions/feedsPostAction';

const useStyles = FlMakeStyles((theme) => ({
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    zIndex: '999',
    left: '1.2rem',
    right: '1.2rem',
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      left: '1.2rem',
      right: '1.2rem',
    },
  },
  overlayText: {
    fontSize: '1.08rem',
    letterSpacing: '0.1px',
    fontFamily: 'Lexend Deca',
    lineHeight: '29px',
    fontWeight: '400',
    color: '#ffffff',
    wordBreak: 'break-word',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      lineHeight: '25px',
    },
  },
}));

const PostCardBody = ({ id, image, description }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const catRef = useRef(id);
  const { setAlert } = useContext(AlertNotificationContext);

  function useOutsideAlerterCat(ref) {
    useEffect(() => {
      let xDown = null;
      let yDown = null;

      function getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
      }

      function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      }

      function handleTouchMove(evt) {
        if (!xDown || !yDown) {
          return;
        }
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
          if (xDiff > 0) {
            if (evt.target?.id === `image-id-${id}` && window?.location?.pathname === '/') { dispatch(feedsPostAction.getFeedPostPreviewList(id, setAlert)); }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (evt.target?.id === `image-id-${id}` && window?.location?.pathname === '/') { dispatch(feedsPostAction.getFeedPostPreviewList(id, setAlert)); }
          }
        }
        // else if (yDiff > 0) {
        //   /* up swipe */
        //   window.scrollBy(0, -50);
        // } else {
        //   window.scrollBy(0, 50);
        //   /* down swipe */
        // }

        xDown = null;
        yDown = null;
      }
      // Bind the event listener
      if (id === catRef?.current) {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
      }
      return () => {
        if (id === catRef?.current) {
          document.removeEventListener('touchstart', handleTouchStart, false);
          document.removeEventListener('touchmove', handleTouchMove, false);
        }
      };
    }, [ref]);
  }

  useOutsideAlerterCat(catRef);

  return (
    <FlGrid
      className={classes.imageContainer}
      id={`image-div-id-${id}`}
      key={`image-div-id-${id}`}
      style={{ cursor: window?.location?.pathname === '/' ? 'pointer' : '' }}
      onClick={() => (window?.location?.pathname === '/' ? dispatch(feedsPostAction
        .getFeedPostPreviewList(id, setAlert)) : '')}
    >
      <FlImageWithLoader id={`image-id-${id}`} image={image} description={description} />
      <div className={classes.overlay} style={{ bottom: '1.8rem' }}>
        <FlTypography className={classes.overlayText}>
          {description}
        </FlTypography>
      </div>
    </FlGrid>
  );
};

export default PostCardBody;

PostCardBody.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
