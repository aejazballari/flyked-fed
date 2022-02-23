/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../actions/userAction';
import { FlCircularProgress } from '../../elements';
import FlUserList from '../../elements/FlUserList';

const ProfileFollowersTab = ({ userId, refresh }) => {
  const dispatch = useDispatch();
  const followersList = useSelector((state) => state.pagePost.followerList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  //   const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    dispatch(userAction.getFollowers(userId, 1, () => setListLoader(false)));
  }, []);

  const fetchFollowers = () => {
    if (hasNextPage) {
      dispatch(userAction.getFollowers(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <>
      {!followersList || listLoader
        ? (
          <div style={{
            height: '6rem',
            overflow: 'hidden',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <FlCircularProgress />
          </div>
        )
        : followersList && followersList?.length !== 0
          ? (
            <InfiniteScroll
              style={{
                overflowY: 'hidden', marginBottom: '1rem', paddingLeft: '2rem', paddingRight: '2rem',
              }}
              scrollableTarget="pageInfinateScrollModel"
              dataLength={followersList?.length}
              next={fetchFollowers}
              hasMore={morefeeds}
              loader={(
                <div style={{
                  height: '6rem',
                  overflow: 'hidden',
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                >
                  <FlCircularProgress />
                </div>
                    )}
              endMessage={(
                <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '11px' }}>
                  <b>Yay! You have seen it all</b>
                </p>
                    )}
            >
              {followersList?.map((followerItem) => (
                <FlUserList
                  key={followerItem._id}
                  avatar={followerItem?.follower?.profileImage}
                  name={followerItem?.follower?.name}
                  url={followerItem?.follower?.url}
                  userId={followerItem?.follower?._id}
                  postCount={followerItem?.follower?.postCount}
                  followerCount={followerItem?.follower?.followerCount}
                  isFollowing={followerItem?.follower?.isFollowing}
                  LoggedInUserId={userId}
                  refresh={refresh}
                />
              ))}
            </InfiniteScroll>
          )
          : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              No Followers to show!
            </div>
          )}
    </>
  );
};

export default ProfileFollowersTab;

ProfileFollowersTab.propTypes = {
  userId: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
};
