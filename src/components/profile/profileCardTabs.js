/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
// import { useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlAppBar, FlCircularProgress, FlTabItem, FlTabs,
} from '../../elements';
import * as postAction from '../../actions/postAction';
import * as userAction from '../../actions/userAction';
import PendingPostTab from '../post/pendingPostTab';
import PublishedPostTab from '../post/publishedPostTab';
import SavedPostTab from '../post/savedPostTab';
import FlUserList from '../../elements/FlUserList';
import ProfileFollowersTab from './profileFollowersTab';

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

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  tabContent: {
    backgroundColor: 'transparent !important',
  },
}));

export default function ProfileCardTabs({
  userId, followers, following, refresh,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.profilePost.postType);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const followingList = useSelector((state) => state.pagePost.followingList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    if (type === 'following') {
      setListLoader(true);
      dispatch(userAction.getFollowing(userId, 1, () => setListLoader(false)));
    }
  }, [following]);

  const sendQuery = (term) => {
    dispatch(postAction.postType(term));
  };

  const fetchPostType = useCallback(debounce(sendQuery, 1), []);

  const fetchPosts = (term) => {
    fetchPostType(term);
  };

  const handleChange = (event, newValue) => {
    if (newValue === 3) {
      // setListLoader(true);
      // dispatch(userAction.getFollowers(userId, 1, () => setListLoader(false)));
    } else if (newValue === 4) {
      setListLoader(true);
      dispatch(userAction.getFollowing(userId, 1, () => setListLoader(false)));
    }
  };

  const fetchFollowing = () => {
    if (hasNextPage) {
      dispatch(userAction.getFollowing(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const getValue = () => {
    switch (type) {
      case 'Feeds':
        return 0;
      case 'Saved':
        return 1;
      case 'Pending':
        return 2;
      case 'followers':
        return 3;
      case 'following':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className={classes.root}>
      <FlAppBar position="static" color="default" className="tabs-section">
        <FlTabs
          className="tabs-container"
          value={getValue()}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <FlTabItem key="Feeds" label="My Posts" {...a11yProps(0)} onClick={() => fetchPosts('Feeds')} />
          <FlTabItem key="Saved" label="Saved Posts" {...a11yProps(1)} onClick={() => fetchPosts('Saved')} />
          <FlTabItem key="Pending" label="Pending Posts" {...a11yProps(2)} onClick={() => fetchPosts('Pending')} />
          <FlTabItem key="followers" label={`${followers} Followers`} {...a11yProps(3)} onClick={() => fetchPosts('followers')} style={{ display: isMobile ? '' : 'none' }} />
          <FlTabItem key="following" label={`${following} Following`} {...a11yProps(4)} onClick={() => fetchPosts('following')} style={{ display: isMobile ? '' : 'none' }} />
        </FlTabs>
      </FlAppBar>
      <CardTabs value={getValue()} index={0} className={classes.tabContent}>
        <PublishedPostTab type={type} />
      </CardTabs>
      <CardTabs value={getValue()} index={1}>
        <SavedPostTab type={type} />
      </CardTabs>
      <CardTabs value={getValue()} index={2}>
        <PendingPostTab type={type} />
      </CardTabs>
      <CardTabs value={getValue()} index={3} style={{ display: isMobile ? '' : 'none' }} id="FollowerScroll">
        <ProfileFollowersTab userId={userId} refresh={refresh} divId="FollowerScroll" />
      </CardTabs>
      <CardTabs value={getValue()} index={4} style={{ display: isMobile ? '' : 'none' }} id="FollowingScroll">
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
                    key={followingItem._id}
                    avatar={followingItem?.following?.image || followingItem?.following?.profileImage}
                    name={followingItem?.following?.title || followingItem?.following?.name}
                    url={followingItem?.following?.url}
                    userId={followingItem?.following?._id}
                    postCount={followingItem?.following?.postCount}
                    followerCount={followingItem?.following?.followerCount}
                    isFollowing={followingItem?.following?.isFollowing}
                    type={followingItem?.onModel}
                    LoggedInUserId={userId}
                    refresh={refresh}
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
}

ProfileCardTabs.propTypes = {
  userId: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};
