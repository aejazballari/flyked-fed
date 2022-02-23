/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import '../profileCard.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlAvatar, FlBox, FlCardContent, FlCircularProgress,
  FlContainer, FlMakeStyles, FlModal, FlTypography,
} from '../../../elements';
import * as userAction from '../../../actions/userAction';
import FlCustomModalHeader from '../../../elements/FlCustomModalHeader';
import FlUserList from '../../../elements/FlUserList';

const useStyles = FlMakeStyles((theme) => ({
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
  disable: {
    fontSize: '12px',
    color: '#172849',
    marginRight: '10px',
    pointerEvents: 'none',
  },
}));

const ProfileCardHeader = ({ userDetails, refresh }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const {
    _id, profileImage, name, about, followerCount, followingCount,
  } = userDetails;
  const [followerVisible, setFollowerVisible] = useState(false);
  const followersList = useSelector((state) => state.pagePost.followerList);
  const followingList = useSelector((state) => state.pagePost.followingList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [showContent, setShowContent] = useState('');
  const [listLoader, setListLoader] = useState(false);

  // followers & following list
  const showModal = (open, content) => {
    const userId = _id;
    setFollowerVisible(open);
    setListLoader(true);
    setMoreFeeds(true);
    if (content === 'followers') {
      setShowContent(content);
      dispatch(userAction.getFollowers(userId, 1, () => setListLoader(false)));
    } else if (content === 'following') {
      setShowContent(content);
      dispatch(userAction.getFollowing(userId, 1, () => setListLoader(false)));
    }
  };

  const fetchFollowers = () => {
    const userId = _id;
    if (hasNextPage) {
      dispatch(userAction.getFollowers(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const fetchFollowing = () => {
    const userId = _id;
    if (hasNextPage) {
      dispatch(userAction.getFollowing(userId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <>
      <FlAvatar src={userDetails?.profileImage} alt="image" className={classes.cover} />
      <div className={classes.details}>
        <FlCardContent className={classes.cardText}>
          <div className={classes.content}>
            <FlTypography className={classes.cardHeader} color="textSecondary">
              {name}
            </FlTypography>
            <FlTypography className={classes.cardHeaderInfo} variant="h5">
              {about}
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
                  {' '}
                  Followers
                </FlTypography>
                {' '}
                        &nbsp;&nbsp;
                <FlTypography
                  className={followingCount === 0 ? classes.disable : classes.cardHeaderFollowers}
                  onClick={() => showModal(true, 'following')}
                >
                  <b>{followingCount}</b>
                  {' '}
                  Following
                </FlTypography>
              </div>
            )}
        </FlCardContent>
      </div>
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
              { listLoader || !followingList || !followersList
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
                          LoggedInUserId={_id}
                          refresh={refresh}
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
                          LoggedInUserId={_id}
                          refresh={refresh}
                        />
                      ))}
                    </InfiniteScroll>
                  )}
            </div>
          </FlContainer>
        </FlBox>
      </FlModal>
    </>
  );
};

export default ProfileCardHeader;

ProfileCardHeader.protoTypes = {
  userDetails: PropTypes.instanceOf(Object).isRequired,
  refresh: PropTypes.func.isRequired,
};
