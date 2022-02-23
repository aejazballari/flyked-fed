/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { retrieveLocalStorage } from '../../services/storageServices';
import { META_POST_DETAILS } from '../../actions/postAction';
import {
  FlBox, FlCardActions, FlCircularProgress, FlContainer, FlDivider, FlGrid,
  FlIconButton, FlList, FlMakeStyles, FlModal, FlTypography,
} from '../../elements';
import SavedIcon from '../../assets/savedIcon.svg';
import SaveIcon from '../../assets/saveIcon.svg';
import LikedIcon from '../../assets/Liked.svg';
import LikeIcon from '../../assets/Like.svg';
import CommentIcon from '../../assets/Comment.svg';
import ShareIcon from '../../assets/shareIcon.svg';
import * as postAction from '../../actions/postAction';
import FlBottomDrawer from '../../elements/FlBottomDrawer';
import FlUserList from '../../elements/FlUserList';
import FlCommentTextField from '../../elements/FlCommentTextField';
import FlCommentList from '../../elements/FlCommentList';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import SharePopOver from '../post/sharePopOver';
import FlCustomModalHeader from '../../elements/FlCustomModalHeader';
import * as authAction from '../../actions/authAction';
// import { UPDATE_FEEDS_LIST } from '../../actions/feedAction';

const useStyles = FlMakeStyles((theme) => ({
  icons: {
    fontSize: '14px',
    cursor: 'pointer',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  iconsDisable: {
    fontSize: '14px',
    pointerEvents: 'none',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  noClick: {
    fontSize: '14px',
    paddingLeft: '0px',
    paddingRight: '0px',
    pointerEvents: 'none',
  },
  scrollDiv: {
    backgroundColor: 'transparent',
    height: 'auto',
    padding: '20px',
    maxHeight: '65vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    marginBottom: '70px',
    zIndex: '9999',
    marginRight: '5px',
  },
  commentSectionWeb: {
    height: 'auto',
    maxHeight: '9rem',
    overflow: 'hidden',
    width: '100%',
    overflowY: 'scroll',
    // '&:hover': {
    //   overflowY: 'scroll',
    // },
  },
  webOnly: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
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

const PostCardFooter = ({
  type, id, isLiked,
  loggedInUser, loggedInUserAvatar, postFullDetails, handleIsSaved,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
  const { setAlert } = useContext(AlertNotificationContext);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [drawer, setDrawer] = useState(false);
  const [drawerComponent, setDrawerComponent] = useState('');
  const [morefeeds, setMoreFeeds] = useState(true);
  const [saveBtn, setSaveBtn] = useState('');
  const [likesLoader, setLikesLoader] = useState(false);
  // const [likes, setLikes] = useState(likesCount);
  const [likesVisible, setLikesVisible] = useState(false);
  const likesList = useSelector((state) => state.pagePost.likesList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [loader, setLoader] = useState(false);
  // const [comments, setComments] = useState(commentCount);
  const commentsList = useSelector((state) => state.pagePost.commentList);
  // const [commentVisible, setCommentVisible] = useState(false);
  const commentVisible = useSelector((state) => state.pagePost.commentVisibleId);
  const [shareVisible, setShareVisible] = useState(null);
  const [src, setSrc] = useState('');
  // const homePageFeedsList = useSelector((state) => state?.feeds?.feedsList?.list || []);
  // const [commentsList, setCommentsList] = useState(postComments);

  // useEffect(() => {
  //   setLikes(likesCount);
  // }, [likesCount]);

  // useEffect(() => {
  //   setComments(commentCount);
  // }, [commentCount]);

  // useEffect(() => {
  //   setCommentsList(postComments);
  // }, [postComments]);

  // bottomdrawer in mobile
  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  // like and unlike posts
  const getLikeResponse = (status) => {
    if (status === 'success') {
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.likesCount = postFullDetails.likesCount + 1;
      postUpdatedDetails.isLiked = true;
      setSaveBtn('');
    } else {
      setAlert('error', 'Something went wrong');
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.likesCount = postFullDetails.likesCount - 1;
      postUpdatedDetails.isLiked = false;
      setSaveBtn('');
    }
  };

  const getUnlikeResponse = (status) => {
    if (status === 'success') {
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.likesCount = postFullDetails.likesCount - 1;
      postUpdatedDetails.isLiked = false;
      setSaveBtn('');
    } else {
      setAlert('error', 'Something went wrong');
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.likesCount = postFullDetails.likesCount + 1;
      postUpdatedDetails.isLiked = true;
      setSaveBtn('');
    }
  };

  const handleLike = (target) => {
    const postId = target.id;
    const value = target.title;
    if (isUserLogin) {
      if (value === 'notLiked') {
        const postUpdatedDetails = postFullDetails;
        postUpdatedDetails.isLiked = true;
        dispatch(postAction.likepost(postId, getLikeResponse));
        target.src = LikedIcon;
        target.title = 'Liked';
        setSaveBtn('disable');
      } else {
        const postUpdatedDetails = postFullDetails;
        postUpdatedDetails.isLiked = false;
        dispatch(postAction.unlikepost(postId, getUnlikeResponse));
        target.src = LikeIcon;
        target.title = 'notLiked';
        setSaveBtn('disable');
      }
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  const toggleDrawerLikes = (value) => {
    toggleDrawer(value);
    setDrawerComponent('LikesData');
    setLikesLoader(true);
    dispatch(postAction.getLikesList(id, 1, () => setLikesLoader(false)));
    setMoreFeeds(true);
  };

  const showLikes = (open) => {
    setLikesLoader(true);
    setLikesVisible(open);
    dispatch(postAction.getLikesList(id, 1, () => setLikesLoader(false)));
    setMoreFeeds(true);
  };

  const fetchLikes = () => {
    if (hasNextPage) {
      dispatch(postAction.getLikesList(id, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  // comments
  const toggleDrawerComments = (value) => {
    toggleDrawer(value);
    setDrawerComponent('CommentData');
    setLoader(true);
    dispatch(postAction.getCommentList(id, 1, () => setLoader(false)));
    setMoreFeeds(true);
  };

  const showComments = () => {
    setLoader(true);
    if (commentVisible === id) {
      dispatch(postAction.handleCommentsToggle(null));
      setLoader(false);
    } else {
      dispatch(postAction.handleCommentsToggle(id));
      // setCommentVisible(true);
      dispatch(postAction.getCommentList(id, 1, () => setLoader(false)));
      // setMoreFeeds(true);
    }
  };

  const getCommentResponse = (status) => {
    if (status === 'success') {
      if (!isMobile && commentVisible !== id) {
        setLoader(true);
      }
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.commentCount = postFullDetails.commentCount + 1;
      // setComments(comments + 1);
      if (!isMobile) {
        dispatch(postAction.handleCommentsToggle(id));
      }
      // setCommentVisible(true);

      dispatch(postAction.getCommentList(id, 1, () => setLoader(false)));
      setMoreFeeds(true);
    } else {
      setAlert('error', 'Comment could not be posted!');
    }
  };

  const fetchComments = () => {
    if (hasNextPage) {
      dispatch(postAction.getCommentList(id, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  // save
  const getSaveResponse = (status) => {
    if (status === 'success') {
      setAlert('success', 'Post saved successfully!');
      setSrc('Changed');
      setSaveBtn('');
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.isSaved = true;
    } else {
      setAlert('error', 'Something went wrong');
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.isSaved = false;
      setAlert('error', 'Failed to save!');
      setSaveBtn('');
    }
  };

  const getUnsaveResponse = (status) => {
    if (status === 'success') {
      setAlert('success', 'Post removed from saved!');
      setSaveBtn('');
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.isSaved = false;
      if (handleIsSaved) {
        handleIsSaved('Changed');
      }
    } else {
      setAlert('error', 'Something went wrong');
      const postUpdatedDetails = postFullDetails;
      postUpdatedDetails.isSaved = true;
      setAlert('error', 'Failed to save!');
      setSaveBtn('');
    }
  };

  const handleSave = (target) => {
    const postId = target.id;
    const value = target.title;
    if (isUserLogin) {
      if (value === 'notSaved') {
        const postUpdatedDetails = postFullDetails;
        postUpdatedDetails.isSaved = true;
        dispatch(postAction.savepost(postId, getSaveResponse));
        target.src = SavedIcon;
        target.title = 'Saved';
        setSaveBtn('disable');
      } else {
        const postUpdatedDetails = postFullDetails;
        postUpdatedDetails.isSaved = false;
        dispatch(postAction.unsavepost(postId, getUnsaveResponse));
        target.src = SaveIcon;
        target.title = 'notSaved';
        setSaveBtn('disable');
      }
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  return (
    <>
      <FlCardActions style={{ padding: '0' }}>
        <FlGrid container spacing={0}>
          <FlGrid item md={2} xs={2}>
            <FlIconButton
              aria-label="likes"
              className={saveBtn === '' ? classes.icons : classes.iconsDisable}
              style={{ paddingRight: '0px' }}
            >
              <img
                src={isLiked ? LikedIcon : LikeIcon}
                alt="likes"
                title={isLiked ? 'Liked' : 'notLiked'}
                id={id}
                onClick={(e) => handleLike(e.target)}
                style={{
                  paddingRight: '6px',
                  height: '16px',
                  objectFit: 'contain',
                  aspectRatio: '1/1',
                }}
              />
            </FlIconButton>
            {isMobile
              ? (
                <FlIconButton
                  aria-label="likes"
                  className={parseInt(postFullDetails?.likesCount, 10) === 0 ? classes.noClick : classes.icons}
                  style={{ paddingLeft: '0px' }}
                  onClick={() => toggleDrawerLikes(true)}
                >
                  {postFullDetails?.likesCount}
                </FlIconButton>
              )
              : (
                <FlIconButton
                  aria-label="likes"
                  className={parseInt(postFullDetails?.likesCount, 10) === 0 ? classes.noClick : classes.icons}
                  style={{ paddingLeft: '0px' }}
                  onClick={() => showLikes(true)}
                >
                  {postFullDetails?.likesCount}
                </FlIconButton>
              )}
          </FlGrid>
          <FlGrid item md={2} xs={2}>
            {isMobile
              ? (
                <FlIconButton
                  aria-label="comments"
                  className={classes.icons}
                  onClick={() => toggleDrawerComments(true)}
                >
                  <img
                    src={CommentIcon}
                    alt="comments"
                    style={{
                      paddingRight: '6px',
                      height: '16px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                  />
                  {postFullDetails?.commentCount || 0}
                </FlIconButton>
              )
              : (
                <FlIconButton
                  aria-label="comments"
                  className={parseInt(postFullDetails?.commentCount, 10) === 0 ? classes.noClick : classes.icons}
                  onClick={() => showComments()}
                >
                  <img
                    src={CommentIcon}
                    alt="comments"
                    style={{
                      paddingRight: '6px',
                      height: '16px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                  />
                  {postFullDetails?.commentCount || 0}
                </FlIconButton>
              )}
          </FlGrid>
          <FlGrid item md={3} xs={3}>
            <FlIconButton
              aria-label="share"
              className={classes.icons}
              onClick={(e) => {
                dispatch({ type: META_POST_DETAILS, payload: postFullDetails });
                setShareVisible(e.currentTarget);
              }}
            >
              <img
                src={ShareIcon}
                alt="comments"
                style={{
                  paddingRight: '6px',
                  height: '16px',
                  objectFit: 'contain',
                  aspectRatio: '1/1',
                }}
              />
              Share
            </FlIconButton>
            {shareVisible ? (
              <SharePopOver
                openPopover={shareVisible}
                closePopover={() => {
                  setShareVisible(null);
                  dispatch({ type: META_POST_DETAILS, payload: {} });
                }}
                postDetails={postFullDetails}
              />
            ) : null}
          </FlGrid>
          <FlGrid item md={3} xs={3} />
          <FlGrid item md={2} xs={2}>
            <FlIconButton className={saveBtn === '' ? classes.icons : classes.iconsDisable}>
              {type === 'Saved'
                ? (
                  <img
                    src={src === 'Changed' ? SaveIcon : SavedIcon}
                    id={id}
                    alt="Saved"
                    title="Saved"
                    style={{
                      paddingLeft: '1rem',
                      height: '16px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                    onClick={(e) => handleSave(e.target)}
                  />
                )
                : (
                  <img
                    src={postFullDetails?.isSaved ? SavedIcon : SaveIcon}
                    id={id}
                    alt="Save"
                    title={postFullDetails?.isSaved ? 'Saved' : 'notSaved'}
                    style={{
                      paddingLeft: '1rem',
                      height: '16px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                    onClick={(e) => handleSave(e.target)}
                  />
                )}
            </FlIconButton>
          </FlGrid>
        </FlGrid>
      </FlCardActions>
      <FlDivider className={classes.webOnly} />
      <FlCardActions className={classes.webOnly} style={{ display: commentVisible === id ? '' : 'none' }}>
        <div className={classes.commentSectionWeb}>
          {loader
            ? (
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
            )
            : commentsList && totalResults > 0
              ? (
                <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                  {commentsList.map((comment) => (
                    <FlCommentList
                      key={comment?._id}
                      avatar={comment?.user?.profileImage}
                      userName={comment?.user?.name}
                      url={comment?.user.url}
                      content={comment?.text}
                      time={comment?.createdAt}
                    />
                  ))}
                  {totalResults > 10 && hasNextPage
                    ? (
                      <FlTypography
                        style={{ cursor: 'pointer', textAlign: 'center', color: '#EF613B' }}
                        onClick={fetchComments}
                      >
                        View More
                      </FlTypography>
                    )
                    : null}
                </div>
              )
              : (
                <div style={{ paddingTop: '1rem' }}>
                  <FlTypography>
                    No comments available.
                  </FlTypography>
                </div>
              )}
        </div>
      </FlCardActions>
      <FlDivider className={classes.webOnly} />
      <FlCardActions className={classes.webOnly} style={{ padding: '0' }}>
        <FlCommentTextField
          postId={id}
          avatar={loggedInUserAvatar}
          getCommentResponse={getCommentResponse}
        />
      </FlCardActions>
      <FlBottomDrawer
        anchor="bottom"
        open={drawer}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        style={{ overflowY: 'hidden' }}
      >
        {drawerComponent === 'LikesData'
          ? (
            <>
              <FlTypography
                style={{
                  fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center',
                }}
              >
                <ChevronLeftIcon
                  style={{ marginLeft: '1rem', marginRight: '1rem', cursor: 'pointer' }}
                  onClick={() => toggleDrawer(false)}
                />
                Likes
              </FlTypography>
              <FlList style={{ paddingLeft: '20px', paddingRight: '20px' }} id="likesDivMob">
                { likesLoader
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
                  : likesList && totalResults > 0
                    ? (
                      <InfiniteScroll
                        scrollableTarget="likesDivMob"
                        style={{ overflowY: 'hidden', marginBottom: '1rem' }}
                        dataLength={likesList?.length}
                        next={fetchLikes}
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
                            <b>Yay! You have seen it all</b>
                          </p>
                              )}
                      >
                        {likesList.map((like) => (
                          <FlUserList
                            key={like?._id}
                            avatar={like?.user?.profileImage}
                            name={like?.user?.name}
                            url={like?.user?.url}
                            userId={like?.user._id}
                            isFollowing={like?.user.isFollowing}
                            LoggedInUserId={loggedInUser}
                            postCount={like?.user?.postCount}
                            followerCount={like?.user?.followerCount}
                          />
                        ))}
                      </InfiniteScroll>
                    )
                    : (
                      <div style={{ paddingTop: '1rem' }}>
                        <FlTypography>
                          No likes available.
                        </FlTypography>
                      </div>
                    )}
              </FlList>
            </>
          )
          : (
            <>
              <FlTypography
                style={{
                  fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center',
                }}
              >
                <ChevronLeftIcon
                  style={{ marginLeft: '1rem', marginRight: '1rem', cursor: 'pointer' }}
                  onClick={() => toggleDrawer(false)}
                />
                Comments
              </FlTypography>
              {/* <div className={classes.root}> */}
              { loader
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
                : commentsList && totalResults > 0
                  ? (
                    <div className={classes.scrollDiv} id="commentsDiv">
                      <InfiniteScroll
                        scrollableTarget="commentsDiv"
                        style={{ marginBottom: '1rem' }}
                        dataLength={commentsList?.length}
                        next={fetchComments}
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
                            <b>Yay! You have seen it all</b>
                          </p>
                        )}
                      >
                        {commentsList.map((comment) => (
                          <FlCommentList
                            key={comment?._id}
                            avatar={comment?.user?.profileImage}
                            userName={comment?.user?.name}
                            url={comment?.user.url}
                            content={comment?.text}
                            time={comment?.createdAt}
                          />
                        ))}
                      </InfiniteScroll>
                    </div>
                  )
                  : (
                    <div style={{ paddingTop: '1rem', paddingLeft: '1.5rem' }}>
                      <FlTypography style={{ fontSize: '14px' }}>
                        No comments available.
                      </FlTypography>
                    </div>
                  )}
              {/* </div> */}
              <FlCommentTextField
                postId={id}
                avatar={loggedInUserAvatar}
                getCommentResponse={getCommentResponse}
              />
            </>
          )}
      </FlBottomDrawer>
      {likesVisible && (
      <FlModal
        open={likesVisible}
        onClose={() => showLikes(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FlBox className={classes.modal}>
          <FlCustomModalHeader heading="Likes" closeModal={() => showLikes(false)} />
          <FlContainer style={{ marginTop: '4.5rem', padding: '5px', paddingLeft: '1.5rem' }}>
            <div className={classes.modalScrollDiv} id="likesDivWeb">
              { likesLoader
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
                : likesList && totalResults > 0
                  ? (
                    <InfiniteScroll
                      scrollableTarget="likesDivWeb"
                      style={{ overflowY: 'hidden', marginBottom: '1rem' }}
                      dataLength={likesList?.length}
                      next={fetchLikes}
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
                          <b>Yay! You have seen it all</b>
                        </p>
                            )}
                    >
                      {likesList.map((like) => (
                        <FlUserList
                          key={like?._id}
                          avatar={like?.user?.profileImage}
                          name={like?.user?.name}
                          url={like?.user?.url}
                          userId={like?.user._id}
                          isFollowing={like?.user.isFollowing}
                          LoggedInUserId={loggedInUser}
                          postCount={like?.user?.postCount}
                          followerCount={like?.user?.followerCount}
                        />
                      ))}
                    </InfiniteScroll>
                  )
                  : (
                    <div style={{ paddingTop: '1rem' }}>
                      <FlTypography>
                        No likes available.
                      </FlTypography>
                    </div>
                  )}
            </div>
          </FlContainer>
        </FlBox>
      </FlModal>
      )}
    </>
  );
};

PostCardFooter.defaultProps = {
  handleIsSaved: false,
  // isSaved: false,
  isLiked: false,
  loggedInUser: '',
  loggedInUserAvatar: '',
};

export default PostCardFooter;

PostCardFooter.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // likesCount: PropTypes.number.isRequired,
  // commentCount: PropTypes.number.isRequired,
  // isSaved: PropTypes.bool,
  isLiked: PropTypes.bool,
  loggedInUser: PropTypes.string,
  loggedInUserAvatar: PropTypes.string,
  handleIsSaved: PropTypes.bool,
  postFullDetails: PropTypes.instanceOf(Object).isRequired,
};
