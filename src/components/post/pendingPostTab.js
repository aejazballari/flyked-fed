/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as postAction from '../../actions/postAction';
import {
  FlCircularProgress, FlTypography,
} from '../../elements';
import { PROFILE_ROUTE_FROM } from '../../actions/profileAction';
import PostCard from '../postCard';

const PendingPostTab = ({ type }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.profile.userDetails);
  const pendingPosts = useSelector((state) => state.profilePost.pendingPosts);
  const nextPage = useSelector((state) => state.profilePost.nextPage);
  const hasNextPage = useSelector((state) => state.profilePost.hasNextPage);
  const [loader, setLoader] = useState(false);
  const [morefeeds, setMoreFeeds] = useState(true);

  useEffect(() => {
    setLoader(true);
    dispatch(postAction.getPendingPosts('1', () => setLoader(false)));
  }, []);

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

  const fetchPendingPosts = () => {
    if (hasNextPage) {
      dispatch(postAction.getPendingPosts(nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <>
      {pendingPosts && pendingPosts?.length > 0 ? (
        <InfiniteScroll
          scrollableTarget="pageInfinateScrollModel"
          style={{ overflowY: 'hidden', marginBottom: '4rem' }}
          dataLength={pendingPosts?.length}
          next={fetchPendingPosts}
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
        //   refreshFunction={refresh}
        //   pullDownToRefresh
        //   pullDownToRefreshThreshold={50}
        //   pullDownToRefreshContent={
        //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        //   releaseToRefreshContent={
        //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
        >
          {pendingPosts.map((post) => (
            <PostCard
              key={post?._id}
              type={type}
              postFullDetails={post}
              selectedUser={userDetails?._id}
              selectedPage=""
            />
          ))}
        </InfiniteScroll>
      )
        : (
          <div style={{ paddingTop: '1rem' }}>
            <FlTypography>
              No posts available.
            </FlTypography>
          </div>
        )}
    </>
  );
};

export default PendingPostTab;

PendingPostTab.propTypes = {
  type: PropTypes.string.isRequired,
};
