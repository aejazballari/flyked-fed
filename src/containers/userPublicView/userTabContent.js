/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlAppBar, FlCircularProgress, FlMakeStyles, FlTabItem, FlTabs,
} from '../../elements';
import UserPosts from './userPosts';
import FlUserList from '../../elements/FlUserList';
import * as userAction from '../../actions/userAction';

function CardTabs(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ backgroundColor: '#f7f7f8', borderTop: '1px solid #DCDCDF', paddingTop: '1rem' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CardTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = FlMakeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  tabContent: {
    backgroundColor: 'transparent !important',
    marginBottom: '30px',
  },
  createBox: {
    backgroundColor: '#ffffff',
    width: '90vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #EF613B',
    borderRadius: '5px',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    cursor: 'pointer',
  },
}));

const UserTabContent = ({
  userId, followers, following, postCount,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const followersList = useSelector((state) => state.pagePost.followerList);
  const followingList = useSelector((state) => state.pagePost.followingList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    dispatch(userAction.getFollowers(userId, 1, () => setListLoader(false)));
  }, [followers]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFetchFollowing = () => {
    setListLoader(true);
    dispatch(userAction.getFollowing(userId, 1, () => setListLoader(false)));
  };

  const handleFetchFollowers = () => {
    setListLoader(true);
    dispatch(userAction.getFollowers(userId, 1, () => setListLoader(false)));
  };

  const fetchFollowing = () => {
    if (hasNextPage) {
      dispatch(userAction.getFollowing(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const fetchFollowers = () => {
    if (hasNextPage) {
      dispatch(userAction.getFollowers(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <div className={classes.root}>
      <FlAppBar position="static" color="default" className="tabs-section">
        <FlTabs
          className="tabs-container"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <FlTabItem label={`${postCount} posts`} {...a11yProps(0)} />
          <FlTabItem label={`${followers} Followers`} {...a11yProps(1)} onClick={() => handleFetchFollowers()} />
          <FlTabItem label={`${following} Following`} {...a11yProps(2)} onClick={() => handleFetchFollowing()} />
        </FlTabs>
      </FlAppBar>
      <CardTabs value={value} index={0} className={classes.tabContent}>
        <UserPosts type="Feeds" userId={userId} />
      </CardTabs>
      <CardTabs value={value} index={1}>
        { listLoader
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
          : followersList && totalResults > 0
            ? (
              <InfiniteScroll
                scrollableTarget="pageInfinateScrollModel"
                style={{
                  overflowY: 'hidden', marginBottom: '1rem', paddingLeft: '2rem', paddingRight: '2rem',
                }}
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
                    key={followerItem?._id}
                    avatar={followerItem?.follower?.profileImage}
                    name={followerItem?.follower?.name}
                    url={followerItem?.follower?.url}
                    userId={followerItem?.follower?._id}
                    postCount={followerItem?.follower?.postCount}
                    followerCount={followerItem?.follower?.followerCount}
                    isFollowing={followerItem?.follower?.isFollowing}
                    LoggedInUserId={userDetails?._id}
                  />
                ))}
              </InfiniteScroll>
            )
            : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                No Followers to show!
              </div>
            )}
      </CardTabs>
      <CardTabs value={value} index={2}>
        {listLoader
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
          : followingList && totalResults > 0
            ? (
              <InfiniteScroll
                scrollableTarget="pageInfinateScrollModel"
                style={{ overflowY: 'hidden', marginBottom: '1rem', padding: '1rem' }}
                dataLength={followingList?.length}
                next={fetchFollowing}
                hasMore={morefeeds}
                loader={(
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
                  )}
                endMessage={(
                  <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '11px' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                )}
              >
                {followingList?.map((followingItem) => (
                  <FlUserList
                    key={followingItem?._id}
                    avatar={followingItem?.following?.image || followingItem?.following?.profileImage}
                    name={followingItem?.following?.title || followingItem?.following?.name}
                    url={followingItem?.following?.url}
                    userId={followingItem?.following?._id}
                    postCount={followingItem?.following?.postCount}
                    followerCount={followingItem?.following?.followerCount}
                    isFollowing={followingItem?.following?.isFollowing}
                    type={followingItem?.onModel}
                    LoggedInUserId={userDetails?._id}
                  />
                ))}
              </InfiniteScroll>
            )
            : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                No Following to show!
              </div>
            )}
      </CardTabs>
    </div>
  );
};

export default UserTabContent;

UserTabContent.propTypes = {
  userId: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  postCount: PropTypes.number.isRequired,
};
