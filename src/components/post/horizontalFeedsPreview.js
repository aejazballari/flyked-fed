/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as postAction from '../../actions/postAction';
import * as feedAction from '../../actions/feedAction';
import PostPreview from '../PostPreview';

const HorizontalFeedsPreview = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const openPreview = useSelector((state) => state?.post?.horizontalFeed.type);
  const selectedIndex = useSelector((state) => state?.post?.horizontalFeed.id);
  const birthdayFeeds = useSelector((state) => state?.feeds.birthdayList);
  const newsList = useSelector((state) => state?.feeds.inNews?.results);
  const thisDayFeeds = useSelector((state) => state?.feeds.thisDayList);

  const handleCount = (like) => {
    setCount(like);
  };

  const handleHorizontalListRefresh = (selectedPostType) => {
    if (selectedPostType === 'onBirthday') {
      dispatch(feedAction.getBirthday(() => {}));
    }

    if (selectedPostType === 'onThisDay') {
      dispatch(feedAction.getOnThisDay(() => {}));
    }

    if (selectedPostType === 'inNews') {
      dispatch(feedAction.getInNews('1', () => {}));
    }
  };

  const handleLike = (id, isLiked, typeOfPost, likesCount, setLiked) => {
    setLiked({
      isLiked: !isLiked,
      likesCount: isLiked ? likesCount - 1 : likesCount + 1,
    });
    if (!isLiked) {
      dispatch(postAction.likepost(id, () => handleHorizontalListRefresh(typeOfPost)));
    } else {
      dispatch(postAction.unlikepost(id, () => handleHorizontalListRefresh(typeOfPost)));
    }
  };

  const handleCommenting = (isCommented, typeOfPost) => {
    if (isCommented) {
      handleHorizontalListRefresh(typeOfPost);
    }
  };

  const handleSave = (id, isSaved, typeOfPost, setSaved) => {
    setSaved(!isSaved);
    if (!isSaved) {
      dispatch(postAction.savepost(id, () => handleHorizontalListRefresh(typeOfPost)));
    } else {
      dispatch(postAction.unsavepost(id, () => handleHorizontalListRefresh(typeOfPost)));
    }
  };

  const handleClosePreview = () => {
    dispatch(postAction.handleOpenHorizontalPreview(null, null));
  };

  const handleComment = (postId) => {
    dispatch(postAction.getCommentList(postId, 1));
  };

  const getPreviewData = () => {
    if (openPreview === 'onBirthday') {
      return birthdayFeeds;
    }

    if (openPreview === 'onThisDay') {
      return thisDayFeeds;
    }

    if (openPreview === 'inNews') {
      return newsList;
    }
    return [];
  };

  return (
    <>
      {openPreview && (
      <PostPreview
        open={Boolean(openPreview)}
        handleClose={handleClosePreview}
        data={getPreviewData()}
        count={count}
        handleCount={handleCount}
        selectedIndex={selectedIndex}
        handleLike={handleLike}
        handleLikeList={() => {}}
        handleComment={(id) => () => handleComment(id)}
        handleCommenting={handleCommenting}
        handleSave={handleSave}
        handleShare={() => {}}
        handleViewPage={() => {}}
        handleViewProfile={() => {}}
        loading={false}
      />
      )}
    </>
  );
};

export default HorizontalFeedsPreview;
