/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlAvatar,
  FlBox,
  FlButton, FlCard, FlCardContent,
  FlCardMedia, FlCircularProgress, FlContainer, FlGrid, FlMakeStyles, FlModal, FlTypography,
} from '../../elements';
import '../profile/profileCard.css';
import * as userAction from '../../actions/userAction';
import UserTabContent from './userTabContent';
import UserWebContent from './userWebContent';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import { retrieveLocalStorage } from '../../services/storageServices';
import FlUserList from '../../elements/FlUserList';
import FlCustomModalHeader from '../../elements/FlCustomModalHeader';
import PageMetaTags from '../../elements/pageMetaTags';
import HomeLayout from '../../layouts/homeLayout';
import * as authAction from '../../actions/authAction';

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
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '60%',
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

const UserPublicView = () => {
  const classes = useStyles();
  const { user } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const isUserLogin = retrieveLocalStorage('userLogin');
  const footer = true;
  const userData = useSelector((state) => state.profile.userPublicDetails);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const [loader, setLoader] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const { setAlert } = useContext(AlertNotificationContext);
  const [followerVisible, setFollowerVisible] = useState(false);
  const followersList = useSelector((state) => state.pagePost.followerList);
  const followingList = useSelector((state) => state.pagePost.followingList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [showContent, setShowContent] = useState('');
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    document.title = 'Flyked';
    dispatch(userAction.getUserDetails(user, () => setLoader(false)));
  }, []);

  useEffect(() => {
    document.title = `Flyked - ${userData?.name}`;
    if (userData?.isFollowing) {
      setFollowed(userData?.isFollowing);
    }
    setFollowerCount(userData?.followerCount);
  }, [userData]);

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
    } else {
      setAlert('error', 'Already Followed!');
      setFollowed(false);
    }
  };

  const handleFollow = () => {
    if (isUserLogin) {
      const userId = userData?._id;
      dispatch(userAction.followUser(userId, getFollowResponse));
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
    } else {
      setAlert('error', 'Page Not Followed!');
      setFollowed(true);
    }
  };

  const handleUnfollow = () => {
    const userId = userData?._id;
    dispatch(userAction.unFollowUser(userId, getUnfollowResponse));
    setFollowed(false);
    setClicked(true);
  };

  // followers & following list
  const showModal = (open, content) => {
    const userId = userData?._id;
    setListLoader(true);
    setMoreFeeds(true);
    setFollowerVisible(open);
    if (content === 'followers') {
      setShowContent(content);
      dispatch(userAction.getFollowers(userId, 1, () => setListLoader(false)));
    } else if (content === 'following') {
      setShowContent(content);
      dispatch(userAction.getFollowing(userId, 1, () => setListLoader(false)));
    }
  };

  const fetchFollowers = () => {
    const userId = userData?._id;
    if (hasNextPage) {
      dispatch(userAction.getFollowers(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const fetchFollowing = () => {
    const userId = userData?._id;
    if (hasNextPage) {
      dispatch(userAction.getFollowing(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <HomeLayout pageName={userData?.name} footer={footer}>
         {loader || !userData || !followersList || !followingList ? (<Loader />) : (
      <div className="profile-card-main" style={{ marginTop: '1rem' }}>
      <PageMetaTags title={`Flyked - ${userData?.name}`} image={userData?.profileImage} description={userData?.about} currentUrl={window?.location?.href || ''} />
        <FlGrid container justifyContent="center" align="center">
          {/* <FlGrid item md={4} xs={12} /> */}
          <FlGrid style={{ width: '100%' }}>
            <FlGrid item className="card_details">

              <FlCard className={`${classes.root} profile`} key={userData?._id} style={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '0px' }}>
                <FlAvatar src={userData?.profileImage} alt="image" className={classes.cover} />
                <div className={classes.details}>
                  <FlCardContent className={classes.cardText}>
                    <div className={classes.content}>
                      <FlTypography className={classes.cardHeader} color="textSecondary">
                        {userData?.name}
                      </FlTypography>
                      <FlTypography className={classes.cardHeaderInfo} variant="h5">
                        {userData?.about}
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
                              style={{ pointerEvents: userData?.followingCount === 0 ? 'none' : '' }}
                            >
                              <b>{userData?.followingCount}</b>
                              {' '}
                              Following
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
                      <UserTabContent
                        userId={location?.state?.userid ? location?.state?.userid : userData?._id}
                        followers={parseInt(followerCount, 10) || parseInt('0', 10)}
                        following={parseInt(userData?.followingCount, 10) || parseInt('0', 10)}
                        postCount={parseInt(userData?.postCount, 10) || parseInt('0', 10)}
                      />
                )
                : (
                  <UserWebContent
                    userId={location?.state?.userid ? location?.state?.userid : userData?._id}
                  />
                )}
              </div>
            </FlGrid>
          </FlGrid>
          {/* <FlGrid item md={4} xs={12} /> */}
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
              <FlCustomModalHeader heading="Following" closeModal={() => showModal(false)} />
            )}
            <FlContainer style={{ marginTop: '4.5rem', padding: '5px', paddingLeft: '1.5rem' }}>
              <div className={classes.modalScrollDiv} id="modalScrollDiv">
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
                          avatar={following?.following?.image || following?.following?.profileImage}
                          name={following?.following?.title || following?.following?.name}
                          url={following?.following?.url}
                          userId={following?.following?._id}
                          postCount={following?.following?.postCount}
                          followerCount={following?.following?.followerCount}
                          isFollowing={following?.following?.isFollowing}
                          type={following?.onModel}
                          LoggedInUserId={userDetails?._id}
                        />
                      ))}
                    </InfiniteScroll>
                    )}
              </div>
            </FlContainer>
          </FlBox>
      </FlModal>
      </div>
         )}
    </HomeLayout>

  );
};

export default UserPublicView;
