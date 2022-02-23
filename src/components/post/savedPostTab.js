/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as postAction from '../../actions/postAction';
import { FlCircularProgress, FlTypography } from '../../elements';
import PostCard from '../postCard';

const SavedPostTab = ({ type }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.profile.userDetails);
  const savedPosts = useSelector((state) => state.profilePost.savedPosts);
  const nextPage = useSelector((state) => state.profilePost.nextPage);
  const hasNextPage = useSelector((state) => state.profilePost.hasNextPage);
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState(savedPosts);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [isSaved, setIsSaved] = useState('');

  useEffect(() => {
    setLoader(true);
    dispatch(postAction.getSavedPosts('1', () => setLoader(false)));
  }, []);

  useEffect(() => {
    if (isSaved) {
      setLoader(true);
      setList([]);
      dispatch(postAction.getSavedPosts('1', () => setLoader(false)));
    }
  }, [isSaved]);

  useEffect(() => {
    setList(savedPosts);
  }, [savedPosts]);

  if (loader) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '6rem',
        }}
      >
        <FlCircularProgress />
      </div>
    );
  }

  // const refresh = () => {

  // };

  const fetchSavedPosts = () => {
    if (hasNextPage) {
      dispatch(postAction.getSavedPosts(nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const handleIsSaved = (value) => {
    setIsSaved(value);
  };

  return (
    <>
      {list && list.length > 0
        ? (
          <InfiniteScroll
            scrollableTarget="pageInfinateScrollModel"
            style={{ overflowY: 'hidden', marginBottom: '4rem' }}
            dataLength={list?.length}
            next={fetchSavedPosts}
            hasMore={morefeeds}
            loader={(
              <div style={{ height: '6rem', overflow: 'hidden', paddingTop: '1rem' }}>
                <FlCircularProgress />
              </div>
          )}
            endMessage={(
              <p style={{ textAlign: 'center', fontSize: '11px' }}>
                <b>Yay! You have seen it all</b>
              </p>
        )}
        // below props only for pull down functionality
        //     refreshFunction={refresh}
        //     pullDownToRefresh
        //     pullDownToRefreshThreshold={50}
        //     pullDownToRefreshContent={
        //       <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        //     releaseToRefreshContent={
        //       <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
          >
            {list.map((post) => (
              <PostCard
                type={type}
                key={post?._id}
                postFullDetails={post}
                handleIsSaved={handleIsSaved}
                selectedUser={userDetails?._id}
                selectedPage=""
              />
            ))}
          </InfiniteScroll>
        )
        : (
          <div style={{ paddingTop: '2rem' }}>
            <FlTypography>
              No posts available.
            </FlTypography>
          </div>
        )}
    </>
  );
};

export default SavedPostTab;

SavedPostTab.propTypes = {
  type: PropTypes.string.isRequired,
};
