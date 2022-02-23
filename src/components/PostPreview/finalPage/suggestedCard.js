/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import * as feedsPostAction from '../../../actions/feedsPostAction';
import ButtonWithLoader from '../../../elements/buttonWithLoader';
import { retrieveLocalStorage } from '../../../services/storageServices';
import * as authAction from '../../../actions/authAction';
import { FlAvatar, FlGrid, FlTypography } from '../../../elements';

const SuggestedCard = ({ cardDetails, handleClose, handlePauseResume }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertNotificationContext);
  //   const postId = useSelector((state) => state?.feedPreview?.selectedPostId);
  const previewResponse = useSelector((state) => state?.feedPreview?.feedsData);
  const isUserLogin = retrieveLocalStorage('userLogin');

  const handleCallback = (pageId) => {
    const suggestedList = previewResponse?.suggestedPages;
    const selectedPage = suggestedList.filter((item) => item?._id === pageId)?.[0];
    selectedPage.isFollowing = !selectedPage?.isFollowing;
  };

  const handleFollow = (e, pageId) => {
    if (isUserLogin) {
      e.preventDefault();
      handlePauseResume(e);
      setLoading(true);
      dispatch(feedsPostAction?.handleFollowUnFollow(pageId, setAlert, handleCallback, setLoading, cardDetails?.isFollowing ? 'unFollow' : 'follow'));
    } else {
      setAlert('warning', 'Please Login to follow');
      handleClose();
      dispatch(authAction?.OpenLoginModel());
    }
  };

  return (
    <FlGrid container spacing={2} className="post-preview-suggest-cards-main">
      <FlGrid item md={12} xs={12}>
        <FlGrid
          container
          spacing={2}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <FlGrid item md={12} xs={12}>
            <FlAvatar src={cardDetails?.image} style={{ width: '80px', height: '80px' }} />
          </FlGrid>
          <FlGrid item md={12} xs={12}>
            <FlTypography
              className="post-suggest-page-card-title"
              onClick={() => {
                handleClose();
                history.push(
                  {
                    pathname: `/page/details/${cardDetails?.url}`,
                    state: {
                      pageid: cardDetails?._id,
                    },
                  },
                );
              }}
            >
              {cardDetails?.title || ''}
            </FlTypography>
            <FlTypography className="post-suggest-page-card-sub-title">{cardDetails?.subCategory?.title || cardDetails?.category?.title || cardDetails?.description || ''}</FlTypography>
          </FlGrid>
          <FlGrid item md={12} xs={12}>
            <ButtonWithLoader loading={loading} disabled={loading} className="post-suggest-page-card-btn" variant={cardDetails?.isFollowing ? 'outlined' : 'contained'} color="primary" onClick={(e) => handleFollow(e, cardDetails?._id)}>{cardDetails?.isFollowing ? 'Un Follow' : 'Follow'}</ButtonWithLoader>
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </FlGrid>
  );
};

SuggestedCard.propTypes = {
  cardDetails: PropTypes.instanceOf(Object).isRequired,
  handleClose: PropTypes.func.isRequired,
  handlePauseResume: PropTypes.func.isRequired,
};

export default SuggestedCard;
