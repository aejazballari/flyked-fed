/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import './style.css';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import {
  FlGrid, FlAvatar, FlTypography, FlIconButton, FlButton, FlBox,
} from '../../../elements/index';
import SuggestedCard from './suggestedCard';
import PostClear from '../../../containers/createPosts/clearPostData';
import { POST_ROUTE_FROM, POST_PAGE_SELECTED } from '../../../actions/postAction';
import { retrieveLocalStorage } from '../../../services/storageServices';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import * as authAction from '../../../actions/authAction';

const FinalPage = ({
  pageDetails, storyProps, handleClose, handlePrevious,
}) => {
  const { setAlert } = useContext(AlertNotificationContext);
  const { action, isPaused } = storyProps;
  const history = useHistory();
  const dispatch = useDispatch();
  const suggestedPages = useSelector((state) => state?.feedPreview?.feedsData?.suggestedPages);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const isUserLogin = retrieveLocalStorage('userLogin');

  const handleCreatePost = () => {
    if (isUserLogin) {
      PostClear(dispatch);
      dispatch({ type: POST_ROUTE_FROM, payload: 'pageDetail' });
      dispatch({ type: POST_PAGE_SELECTED, payload: pageDetails?.postPage });
      history.push('/post/create');
    } else {
      setAlert('warning', 'Please Login to create post');
      handleClose();
      dispatch(authAction?.OpenLoginModel());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      action('play');
      // console.log('play');
    }, 100);
  }, []);

  const handlePauseResume = (e) => {
    e.preventDefault();
    if (isPaused) {
      setTimeout(() => {
        action('play');
      }, 100);
    } else {
      setTimeout(() => {
        action('pause');
      }, 100);
    }
  };

  const debouncePause = () => {
    setTimeout(() => {
      action('pause');
    }, 200);
  };

  const mouseUp = (type = String) => {
    if (isPaused) {
      action('play');
    } else if (!isPaused && type === 'previous') {
      handlePrevious();
    }
  };

  return (
    <div className="preview_post_final_page_main_div" style={{ height: window.innerHeight }}>
      <div md={12} xs={12} className="post_preview_final_page_header">
        <FlIconButton size="small" onClick={handleClose}><CloseIcon style={{ fontSize: '20px', color: '#FFFFFF' }} /></FlIconButton>
      </div>
      <div className="post_preview_final_page_body">
        <FlBox
          onTouchStart={isMobile ? debouncePause : () => {}}
          onTouchEnd={isMobile ? () => mouseUp('previous') : () => {}}
          onMouseDown={!isMobile ? debouncePause : () => {}}
          onMouseUp={!isMobile ? () => mouseUp('previous') : () => {}}
          style={{
            width: '20%',
            height: '100%',
            position: 'absolute',
            background: 'transparent',
            zIndex: 10000,
          }}
        />
        <FlGrid
          container
          spacing={2}
          onTouchStart={isMobile ? () => action('pause') : () => {}}
          onTouchEnd={isMobile ? () => action('play') : () => {}}
          onMouseDown={!isMobile ? () => action('pause') : () => {}}
          onMouseUp={!isMobile ? () => action('play') : () => {}}
        >
          <FlGrid item md={12} xs={12}>
            <FlTypography className="post-preview-final-page-label">
              Become a top contributor of the page.
              <br />
              Start posting the facts
            </FlTypography>
          </FlGrid>
          <FlGrid item md={12} xs={12} className="post-preview-final-page-avatar">
            <FlAvatar src={pageDetails?.postPage?.image || ''} style={{ width: '120px', height: '120px' }} />
            <FlTypography className="post-preview-final-page-title">{pageDetails?.postPage?.title || ''}</FlTypography>
            <FlTypography className="post-preview-final-page-sub-title">{pageDetails?.postPage?.subCategory?.title || pageDetails?.postPage?.category?.title || pageDetails?.postPage?.description || ''}</FlTypography>
            <FlButton variant="contained" color="primary" className="post-preview-final-page-btn" onClick={handleCreatePost}>Add Post</FlButton>
          </FlGrid>
        </FlGrid>
      </div>
      <div className="post-preview-final-page-footer">
        <FlGrid container spacing={2} className="post-preview-final-page-similar-pages-div-child">
          <FlGrid item md={12} xs={12}>
            <FlTypography className="post-preview-final-page-similar-pages-div-child-label">Similar pages</FlTypography>
          </FlGrid>
          <FlGrid
            item
            md={12}
            xs={12}
            style={{
              width: '100%', overflow: 'hidden',
            }}
          >
            <FlGrid container spacing={2} className="post-preview-final-page-suggested-scroll">
              {suggestedPages?.length !== 0 && suggestedPages?.map((item) => (
                <FlGrid key={item?._id} style={{ width: 'auto', height: 'auto', padding: '10px 13px' }}>
                  <SuggestedCard
                    cardDetails={item}
                    handleClose={handleClose}
                    handlePauseResume={handlePauseResume}
                  />
                </FlGrid>
              ))}
              {suggestedPages?.length === 0 ? (<FlTypography className="post-preview-final-page-similar-pages-div-child-label" style={{ textAlign: 'center', width: '100%', fontSize: '25px' }}>Pages Not Available</FlTypography>) : ''}
            </FlGrid>
          </FlGrid>
        </FlGrid>
      </div>
    </div>
  );
};

FinalPage.propTypes = {
  pageDetails: PropTypes.instanceOf(Object).isRequired,
  storyProps: PropTypes.instanceOf(Object).isRequired,
  handleClose: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
};

export default FinalPage;
