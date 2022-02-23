/* eslint-disable linebreak-style */
import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_PREVIEW_MODEL, GET_FEED_POST_LIST, SELECTED_POST_ID } from '../../actions/feedsPostAction';
import PostPreview from '../PostPreview';
import * as postAction from '../../actions/postAction';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import * as feedsPostAction from '../../actions/feedsPostAction';
// import { retrieveLocalStorage } from '../../services/storageServices';

const PostFeedsPreview = () => {
  const { setAlert } = useContext(AlertNotificationContext);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [selectedIndex] = useState(0);
  const feedsData = useSelector((state) => state?.feedPreview?.feedsData?.posts || []);
  const homePageFeedsList = useSelector((state) => state?.feeds?.feedsList?.list || []);
  const loading = useSelector((state) => state?.feedPreview?.loading);
  const openPreview = useSelector((state) => state?.feedPreview?.openPreviewModel);
  const postId = useSelector((state) => state?.feedPreview?.selectedPostId);
  // const isUserLogin = retrieveLocalStorage('userLogin');

  const handleLike = (id, isLiked, typeOfPost, likesCount, setLiked) => {
    setLiked({
      isLiked: !isLiked,
      likesCount: isLiked ? likesCount - 1 : likesCount + 1,
    });
    if (!isLiked) {
      dispatch(postAction.likepost(id, () => dispatch(feedsPostAction
        .getFeedPostPreviewList(postId, setAlert, true, homePageFeedsList))));
    } else {
      dispatch(postAction.unlikepost(id, () => dispatch(feedsPostAction
        .getFeedPostPreviewList(postId, setAlert, true, homePageFeedsList))));
    }
  };

  const handleComment = () => {
    dispatch(postAction.getCommentList(postId, 1));
  };

  const handleCommenting = (isCommented) => {
    if (isCommented) {
      dispatch(feedsPostAction
        .getFeedPostPreviewList(postId, setAlert, true, homePageFeedsList));
    }
  };

  const handleSave = (id, isSaved, typeOfPost, setSaved) => {
    setSaved(!isSaved);
    if (!isSaved) {
      dispatch(postAction.savepost(id, () => dispatch(feedsPostAction
        .getFeedPostPreviewList(postId, setAlert, true, homePageFeedsList))));
    } else {
      dispatch(postAction.unsavepost(id, () => dispatch(feedsPostAction
        .getFeedPostPreviewList(postId, setAlert, true, homePageFeedsList))));
    }
  };

  return (
    <>
      {openPreview && (
      <PostPreview
        open={Boolean(openPreview)}
        handleClose={() => {
          dispatch({ type: OPEN_PREVIEW_MODEL, payload: false });
          setTimeout(() => {
            dispatch({ type: SELECTED_POST_ID, payload: '' });
            dispatch({ type: GET_FEED_POST_LIST, payload: {} });
          }, 1);
          // if (isUserLogin) {
          //   refresh();
          // }
        }}
        data={feedsData}
        count={count}
        handleCount={(like) => setCount(like)}
        selectedIndex={selectedIndex}
        handleLike={handleLike}
        handleLikeList={() => {}}
        handleComment={() => () => handleComment()}
        handleCommenting={handleCommenting}
        handleSave={handleSave}
        handleShare={() => {}}
        handleViewPage={() => {}}
        handleViewProfile={() => {}}
        loading={loading}
        finalPage
      />
      )}
    </>
  );
};

export default PostFeedsPreview;

// PostFeedsPreview.propTypes = {
//   // refresh: PropTypes.func.isRequired,
// };
