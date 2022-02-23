/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlAppBar, FlBox, FlCircularProgress, FlMakeStyles, FlTabItem, FlTabs, FlTypography,
} from '../../elements';
import AddIcon from '../../assets/Add.svg';
import PagePosts from './pagePosts';
import { POST_ROUTE_FROM, POST_PAGE_SELECTED } from '../../actions/postAction';
import PostClear from '../createPosts/clearPostData';
import * as userAction from '../../actions/userAction';
import * as pageAction from '../../actions/pageAction';
import FlUserList from '../../elements/FlUserList';
import { retrieveLocalStorage } from '../../services/storageServices';

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

const PageTabContent = ({
  pageId, followers, contributors, postCount,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const followersList = useSelector((state) => state.pagePost.followerList);
  const followingList = useSelector((state) => state.pagePost.contributorList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [morefeeds, setMoreFeeds] = useState(true);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [listLoader, setListLoader] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const pageDetails = useSelector((state) => state?.page?.pageDetails);

  useEffect(() => {
    setListLoader(true);
    dispatch(userAction.getFollowers(pageId, 1, () => setListLoader(false)));
  }, [followers]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreatePost = () => {
    PostClear(dispatch);
    dispatch({ type: POST_ROUTE_FROM, payload: 'pageDetail' });
    dispatch({ type: POST_PAGE_SELECTED, payload: pageDetails });
    history.push('/post/create');
  };

  const handleFetchContributors = () => {
    setListLoader(true);
    dispatch(pageAction.getContributors(pageId, 1, () => setListLoader(false)));
  };

  const handleFetchFollowers = () => {
    setListLoader(true);
    dispatch(userAction.getFollowers(pageId, 1, () => setListLoader(false)));
  };

  const fetchFollowing = () => {
    if (hasNextPage) {
      dispatch(pageAction.getContributors(pageId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const fetchFollowers = () => {
    if (hasNextPage) {
      dispatch(userAction.getFollowers(pageId, nextPage));
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
          <FlTabItem label={`${contributors} Contributors`} {...a11yProps(1)} onClick={() => handleFetchContributors()} />
          <FlTabItem label={`${followers} Followers`} {...a11yProps(2)} onClick={() => handleFetchFollowers()} />
        </FlTabs>
      </FlAppBar>
      <CardTabs value={value} index={0} className={classes.tabContent}>
        <div style={{ paddingBottom: '15px' }}>
          <FlBox style={{ display: !isUserLogin ? 'none' : '' }} className={classes.createBox} onClick={() => handleCreatePost()}>
            <img
              src={AddIcon}
              alt="add post"
              style={{
                paddingRight: '10px',
                height: '14px',
                objectFit: 'contain',
                aspectRatio: '1/1',
              }}
            />
            <FlTypography style={{ color: '#172849', fontSize: '14px', paddingTop: '5px' }}>
              Add Post
            </FlTypography>
          </FlBox>
        </div>
        <PagePosts type="Feeds" pageId={pageId} />
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
                {followingList?.map((following) => (
                  <FlUserList
                    key={following?._id}
                    avatar={following?.profileImage}
                    name={following?.name}
                    url={following?.url}
                    userId={following?._id}
                    postCount={following?.postCount}
                    followerCount={following?.followerCount}
                    isFollowing={following?.isFollowing}
                    LoggedInUserId={userDetails?._id}
                  />
                ))}
              </InfiniteScroll>
            )
            : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                No Contributors to show!
              </div>
            )}
      </CardTabs>
      <CardTabs value={value} index={2}>
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
    </div>
  );
};

export default PageTabContent;

PageTabContent.propTypes = {
  pageId: PropTypes.string.isRequired,
  followers: PropTypes.string.isRequired,
  contributors: PropTypes.string.isRequired,
  postCount: PropTypes.string.isRequired,
};
