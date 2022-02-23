/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlGrid, FlCard, FlCardContent,
  FlTypography, FlButton, FlCircularProgress,
  FlMakeStyles, FlAvatar, FlModal, FlBox, FlContainer,
} from '../../elements';
import '../profile/profileCard.css';
import PageTabContent from './pageTabContent';
import PageWebContent from './pageWebContent';
import * as pageAction from '../../actions/pageAction';
import * as userAction from '../../actions/userAction';
import PageMetaTags from '../../elements/pageMetaTags';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import { retrieveLocalStorage } from '../../services/storageServices';
import FlCustomModalHeader from '../../elements/FlCustomModalHeader';
import FlUserList from '../../elements/FlUserList';
import HomeLayout from '../../layouts/homeLayout';
import * as authAction from '../../actions/authAction';
import * as feedAction from '../../actions/feedAction';

const useStyles = FlMakeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      position: 'inherit',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px !important',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: '110px',
    height: '110px',
    backgroundColor: '#000',
    borderRadius: '50%',
    [theme.breakpoints.down('md')]: {
      width: '100px',
      height: '100px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    },
  },
  followers: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.5rem',
    },
  },
  content: {
    textAlign: 'left',
  },
  cardText: {
    paddingTop: '0px',
    paddingBottom: '0px',
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
  cardHeader: {
    fontSize: '18px',
    marginTop: '10px',
    marginBottom: '5px',
    color: '#172849',
    fontWeight: '550',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      marginBottom: '5px',
      marginTop: '10px',
      fontWeight: '600',
    },
  },
  cardHeaderInfo: {
    fontSize: '12px',
    color: '#888F9D',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  cardHeaderFollowers: {
    fontSize: '12px',
    color: '#172849',
    marginRight: '10px',
    cursor: 'pointer',
  },
  settingIcon: {
    position: 'absolute',
    top: 30,
    right: 10,
    cursor: 'pointer',
  },
  linkClass: {
    textDecoration: 'none',
  },
  settingBtn: {
    [theme.breakpoints.up('md')]: {
      border: '1px solid #EF613B',
      padding: 0,
      width: '32px !important',
      minWidth: 'auto',
      height: '32px',
    },
  },
  disabled: {
    pointerEvents: 'none !important',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 'none',
    outline: 'none',
    p: 4,
  },
  modalScrollDiv: {
    height: 'auto',
    maxHeight: '25rem',
    overflow: 'hidden',
    width: '100%',
    marginBottom: '2rem',
    margin: '5px',
    overflowY: 'scroll',
    // '&:hover': {
    //   overflowY: 'scroll',
    // },
  },
}));

const PageDetailView = () => {
  const classes = useStyles();
  const { page } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isUserLogin = retrieveLocalStorage('userLogin');
  const footer = true;
  const pageData = useSelector((state) => state.page.pageDetails);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const [loader, setLoader] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const { setAlert } = useContext(AlertNotificationContext);
  const [followerVisible, setFollowerVisible] = useState(false);
  const followersList = useSelector((state) => state.pagePost.followerList);
  const followingList = useSelector((state) => state.pagePost.contributorList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [showContent, setShowContent] = useState('');
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(pageAction.getPageDetails(page, () => setLoader(false)));
  }, []);

  useEffect(() => {
    if (pageData?.isFollowing) {
      setFollowed(pageData?.isFollowing);
    }
    setFollowerCount(pageData?.followerCount);
  }, [pageData]);

  const Loader = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <FlCircularProgress />
    </div>
  );

  const getFollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
      setFollowerCount(followerCount + 1);
      if (!isMobile) {
        dispatch(feedAction.getSuggestedPages());
      }
    } else {
      setAlert('error', 'Already Followed!');
      setFollowed(false);
    }
  };

  const handleFollow = () => {
    if (isUserLogin) {
      const pageId = pageData?._id;
      dispatch(pageAction?.followPage(pageId, getFollowResponse));
      setClicked(true);
      setFollowed(true);
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  const getUnfollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
      setFollowerCount(followerCount - 1);
      if (!isMobile) {
        dispatch(feedAction.getSuggestedPages());
      }
    } else {
      setAlert('error', 'Page Not Followed!');
      setFollowed(true);
    }
  };

  const handleUnfollow = () => {
    const pageId = pageData?._id;
    dispatch(pageAction.unFollowPage(pageId, getUnfollowResponse));
    setFollowed(false);
    setClicked(true);
  };

  // followers & following list
  const showModal = (open, content) => {
    const pageId = pageData?._id;
    setFollowerVisible(open);
    setListLoader(true);
    setMoreFeeds(true);
    if (content === 'followers') {
      setShowContent(content);
      dispatch(userAction.getFollowers(pageId, 1, () => setListLoader(false)));
    } else if (content === 'following') {
      setShowContent(content);
      dispatch(pageAction.getContributors(pageId, 1, () => setListLoader(false)));
    }
  };

  const fetchFollowers = () => {
    const pageId = pageData?._id;
    if (hasNextPage) {
      dispatch(userAction.getFollowers(pageId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const fetchFollowing = () => {
    const pageId = pageData?._id;
    if (hasNextPage) {
      dispatch(pageAction.getContributors(pageId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <HomeLayout pageName={pageData?.title} footer={footer}>
      {loader || !pageData || !followersList || !followingList ? (<Loader />) : (
        <>
          <PageMetaTags title={`Flyked - ${pageData?.title}`} image={pageData?.image} description={pageData?.description} currentUrl={window?.location?.href || ''} />
          <div className="profile-card-main">
            <FlGrid container justifyContent="center" align="center">
              <FlGrid style={{ width: '100%' }}>
                <FlGrid item className="card_details">

                  <FlCard
                    className={`${classes.root} profile`}
                    key={pageData?._id}
                    style={{
                      paddingLeft: '0px', paddingRight: '0px', paddingTop: '0px',
                    }}
                  >
                    <FlAvatar src={pageData?.image} alt="image" className={classes.cover} />
                    <div className={classes.details}>
                      <FlCardContent className={classes.cardText}>
                        <div className={classes.content}>
                          <FlTypography className={classes.cardHeader} color="textSecondary">
                            {pageData?.title}
                          </FlTypography>
                          <FlTypography className={classes.cardHeaderInfo} variant="h5">
                            {pageData?.description}
                          </FlTypography>
                        </div>
                        {isMobile
                          ? null
                          : (
                            <div className={classes.followers}>
                              <FlTypography
                                className={classes.cardHeaderFollowers}
                                onClick={() => showModal(true, 'followers')}
                                style={{ pointerEvents: followerCount === 0 ? 'none' : '' }}
                              >
                                <b>{followerCount}</b>
                                <span>
                                  {' '}
                                  {' '}
                                  Followers
                                </span>
                              </FlTypography>
                              {' '}
                            &nbsp;&nbsp;
                              <FlTypography
                                className={classes.cardHeaderFollowers}
                                onClick={() => showModal(true, 'following')}
                                style={{ pointerEvents: followerCount === 0 ? 'none' : '' }}
                              >
                                <b>{pageData?.contributorCount}</b>
                                {' '}
                                Contributors
                              </FlTypography>
                            </div>
                          )}
                      </FlCardContent>
                    </div>
                    <div className={classes.settingIcon}>
                      {followed === true
                        ? (
                          <FlButton
                            variant="outlined"
                            color="primary"
                            className={clicked === true ? classes.disabled : ''}
                            style={{ textTransform: 'capitalize' }}
                            onClick={() => handleUnfollow()}
                          >
                            Unfollow
                          </FlButton>
                        )
                        : (
                          <FlButton
                            variant="contained"
                            color="primary"
                            className={clicked === true ? classes.disabled : ''}
                            style={{ textTransform: 'capitalize' }}
                            onClick={() => handleFollow()}
                          >
                            Follow
                          </FlButton>
                        )}
                    </div>
                  </FlCard>
                  <div>
                    {isMobile
                      ? (
                        <PageTabContent
                          pageId={location?.state?.pageid}
                          followers={followerCount}
                          contributors={pageData?.contributorCount}
                          postCount={pageData?.postCount}
                        />
                      )
                      : <PageWebContent pageId={location?.state?.pageid} />}
                  </div>
                </FlGrid>
              </FlGrid>
            </FlGrid>
            <FlModal
              open={followerVisible}
              onClose={() => showModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <FlBox className={classes.modal}>
                {showContent === 'followers'
                  ? (
                    <FlCustomModalHeader heading="Followers" closeModal={() => showModal(false)} />
                  )
                  : (
                    <FlCustomModalHeader heading="Contributors" closeModal={() => showModal(false)} />
                  )}
                <FlContainer style={{ marginTop: '4.5rem', padding: '5px', paddingLeft: '1.5rem' }}>
                  <div className={classes.modalScrollDiv} id="modalScrollDiv">
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
                      : showContent === 'followers'
                        ? (
                          <InfiniteScroll
                            scrollableTarget="modalScrollDiv"
                            style={{ overflowY: 'hidden', marginBottom: '1rem' }}
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
                              <p style={{ textAlign: 'center', fontSize: '11px' }}>
                                {followersList?.length > 6
                                  ? (
                                    <b>Yay! You have seen it all</b>
                                  )
                                  : null}
                              </p>
                  )}
                          >
                            {followersList?.map((follower) => (
                              <FlUserList
                                key={follower?._id}
                                avatar={follower?.follower?.profileImage}
                                name={follower?.follower?.name}
                                url={follower?.follower?.url}
                                userId={follower?.follower?._id}
                                postCount={follower?.follower?.postCount}
                                followerCount={follower?.follower?.followerCount}
                                isFollowing={follower?.follower?.isFollowing}
                                LoggedInUserId={userDetails?._id}
                              />
                            ))}
                          </InfiniteScroll>
                        )
                        : (
                          followingList && totalResults > 0
                            ? (
                              <InfiniteScroll
                                scrollableTarget="modalScrollDiv"
                                style={{ overflowY: 'hidden', marginBottom: '1rem' }}
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
                                  <p style={{ textAlign: 'center', fontSize: '11px' }}>
                                    {followingList?.length > 6
                                      ? (
                                        <b>Yay! You have seen it all</b>
                                      )
                                      : null}
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
                              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                No Contributors to show!
                              </div>
                            )
                        )}
                  </div>
                </FlContainer>
              </FlBox>
            </FlModal>
          </div>
        </>
      )}
    </HomeLayout>
  );
};

export default PageDetailView;
