/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-quotes */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { META_POST_DETAILS } from '../../../actions/postAction';
import * as postAction from '../../../actions/postAction';
// import * as userAction from '../../../actions/userAction';
// import { retrieveLocalStorage } from '../../../services/storageServices';
import {
  FlList, FlTypography, FlCircularProgress, FlModal, FlAvatar, FlButton, FlIconButton,
  FlBox, FlContainer, FlDivider, FlGrid, FlTextField, FlInputAdornment, FlMakeStyles } from '../../../elements';
import { IMAGES } from '../../../constants/images';
import FlCustomModalHeader from '../../../elements/FlCustomModalHeader';
import FlUserList from '../../../elements/FlUserList';
import FlCommentList from '../../../elements/FlCommentList';
import FlCommentTextField from '../../../elements/FlCommentTextField';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import { retrieveLocalStorage } from '../../../services/storageServices';
import * as authAction from '../../../actions/authAction';
import SharePopOver from '../../post/sharePopOver';
import FlBottomDrawer from '../../../elements/FlBottomDrawer';

const useStyles = FlMakeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '20px 0',
    // marginTop: 10,
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  text: {
    color: '#fff',
  },
  userDetailContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  pageDetailContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: 40,
    height: 50,
    width: '100%',
    // marginBottom: 20,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 40,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    border: 'none',
    boxShadow: 24,
    borderRadius: '10px',
    outline: 'none',
    p: 4,
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
  },
  commentSectionWeb: {
    height: '190px',
    overflow: 'hidden',
    width: '100%',
    marginBottom: '2rem',
    margin: '5px',
    overflowY: 'scroll',
    // '&:hover': {
    //   overflowY: 'scroll',
    // },
  },
  postBtn: {
    color: '#EF613B',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  postBtnDisabled: {
    color: '#f5b09f',
    fontWeight: '600',
    textTransform: 'capitalize',
    pointerEvents: 'none',
  },
  textFieldWeb: {
    maxHeight: '100px',
    height: 'auto',
    width: '100%',
    padding: '1rem .5rem',
  },
  noBorder: {
    border: 'none',
  },
  drawerDiv: {
    backgroundColor: 'transparent',
    padding: '20px',
    height: '60vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    marginBottom: '70px',
    zIndex: '9999',
  },
}));

const initialValue = {
  text: '',
};

function StoryFooter({
  data, postPage, storyActions, handleCount, count, storyProps, handleClose,
}) {
  const { _id, pageName, likesCount, commentCount, isSaved, isLiked, postType } = data;
  const { action, isPaused } = storyProps;
  const { image, title } = postPage;
  const {
    handleLike,
    handleComment,
    handleCommenting,
    handleSave,
  } = storyActions;
  const [commentCounter, setCommentCounter] = useState(commentCount);
  const [isCommented, setIsCommented] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [likesVisible, setLikesVisible] = useState(false);
  const [morefeeds, setMoreFeeds] = useState(true);
  const [likesLoader, setLikesLoader] = useState(false);
  const [commentsLoader, setCommentsLoader] = useState(false);
  useEffect(() => handleCount(likesCount), [likesCount]);
  const likesList = useSelector((state) => state.pagePost.likesList);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  const totalResults = useSelector((state) => state.pagePost.totalResults);
  const commentsList = useSelector((state) => state.pagePost.commentList);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const { setAlert } = useContext(AlertNotificationContext);
  const [comment, setComment] = useState(initialValue);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [shareVisible, setShareVisible] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerComponent, setDrawerComponent] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const [liked, setLiked] = useState({
    isLiked,
    likesCount,
  });
  const [saved, setSaved] = useState(isSaved);

  // if user not logged in
  const handleLogIn = () => {
    dispatch(authAction?.OpenLoginModel());
  };

  // bottomdrawer in mobile
  const toggleDrawer = (open) => {
    setDrawer(open);
    if (isCommented && open === false) {
      handleCommenting(isCommented, postType);
    }
  };

  useEffect(() => {
    if (commentsVisible || shareVisible) {
      setTimeout(() => {
        action('pause');
      }, 100);
    } else {
      if (isCommented) {
        handleCommenting(isCommented, postType);
      }
      setTimeout(() => {
        action('play');
      }, 100);
    }
  }, [commentsVisible, shareVisible]);

  useEffect(() => {
    if (likesVisible) {
      setTimeout(() => {
        action('pause');
      }, 100);
    } else {
      setTimeout(() => {
        action('play');
      }, 100);
    }
  }, [likesVisible]);

  useEffect(() => {
    if (drawer) {
      setTimeout(() => {
        action('pause');
      }, 100);
    } else {
      setTimeout(() => {
        action('play');
      }, 100);
    }
  }, [drawer]);

  const fetchLikes = () => {
    if (hasNextPage) {
      dispatch(postAction.getLikesList(_id, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const fetchComments = () => {
    if (hasNextPage) {
      dispatch(postAction.getCommentList(_id, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  const showLikes = (open) => {
    setLikesLoader(true);
    if (isMobile) {
      toggleDrawer(open);
      setDrawerComponent('LikesData');
      dispatch(postAction.getLikesList(_id, 1, () => setLikesLoader(false)));
      setMoreFeeds(true);
    } else {
      setLikesVisible(open);
      dispatch(postAction.getLikesList(_id, 1, () => setLikesLoader(false)));
      setMoreFeeds(true);
    }
  };

  const showComments = (open) => {
    setCommentsLoader(true);
    if (isMobile) {
      toggleDrawer(open);
      setDrawerComponent('CommentData');
      dispatch(postAction.getCommentList(_id, 1, () => setCommentsLoader(false)));
      setMoreFeeds(true);
    } else {
      setCommentsVisible(open);
      dispatch(postAction.getCommentList(_id, 1, () => setCommentsLoader(false)));
      setMoreFeeds(true);
      handleComment(_id);
    }
  };

  const getCommentResponse = (status) => {
    if (status === 'success') {
      setCommentCounter(commentCounter + 1);
      setCommentsVisible(true);
      setCommentsLoader(true);
      setIsCommented(true);
      dispatch(postAction.getCommentList(_id, 1, () => setCommentsLoader(false)));
      setMoreFeeds(true);
    } else {
      setAlert('error', 'Comment could not be posted!');
    }
  };

  const submitComment = () => {
    dispatch(postAction.saveComments(comment, _id, getCommentResponse));
    setComment({ text: '' });
  };

  const getCommentResponseMob = (status) => {
    if (status === 'success') {
      setCommentCounter(commentCounter + 1);
      setDrawerComponent('CommentData');
      dispatch(postAction.getCommentList(_id, 1));
      setMoreFeeds(true);
      setIsCommented(true);
    } else {
      setAlert('error', 'Comment could not be posted!');
    }
  };

  const handleStoryLike = () => {
    if (isUserLogin) {
      action('pause');
      handleLike(_id, isLiked, postType, likesCount, setLiked);
    } else {
      handleClose();
      setTimeout(() => {
        handleLogIn();
      }, 100);
    }
  };

  const handleStorySave = () => {
    if (isUserLogin) {
      action('pause');
      handleSave(_id, isSaved, postType, setSaved);
    } else {
      handleClose();
      setTimeout(() => {
        handleLogIn();
      }, 100);
    }
  };

  const classes = useStyles();
  return (
    <div style={{ padding: '0 0px' }}>
      <FlBox className={classes.root}>
        <FlBox className={classes.iconsContainer}>
          <FlBox className={classes.iconContainer}>
            <FlIconButton onClick={handleStoryLike}>
              <img
                src={liked.isLiked ? IMAGES.STORY_LIKED : IMAGES.STORY_LIKE_INACTIVE_ICON}
                alt='like'
                // title={isLiked ? 'Liked' : 'notLiked'}
                id={_id}
                // onClick={handleLike}
              />
            </FlIconButton>
            <FlTypography
              onClick={() => (likesCount === 0 ? {} : showLikes(true))}
              variant='body1'
              display='block'
              className={classes.text}
            >
              {liked.likesCount}
            </FlTypography>
          </FlBox>
          <FlBox className={classes.iconContainer} onClick={() => showComments(true)}>
            <FlIconButton onClick={() => handleComment()}>
              <img src={IMAGES.STORY_COMMENT_ICON} alt='comments' />
            </FlIconButton>
            <FlTypography
              variant='body1'
              display='block'
              className={classes.text}
            >
              {commentCounter}
            </FlTypography>
          </FlBox>
          <FlBox
            className={classes.iconContainer}
            onClick={(e) => {
              dispatch({ type: META_POST_DETAILS, payload: data });
              setShareVisible(e.currentTarget);
            }}
          >
            <FlIconButton>
              <img src={IMAGES.STORY_SHARE_ICON} alt='share' />
            </FlIconButton>
            <FlTypography
              variant='body1'
              display='block'
              className={classes.text}
            >
              Share
            </FlTypography>
          </FlBox>
        </FlBox>
        <FlBox>
          <FlIconButton onClick={handleStorySave}>
            <img
              src={saved ? IMAGES.STORY_SAVE_ACTIVE : IMAGES.STORY_SAVE_INACTIVE_ICON}
              alt='like'
              id={_id}
            />
          </FlIconButton>
        </FlBox>
      </FlBox>
      <FlBox className={classes.pageDetailContainer} style={{ marginBottom: window.innerWidth > 1000 ? 0 : 20 }}>
        <FlBox className={classes.userDetailContainer}>
          <FlIconButton>
            <img className={classes.profileImage} src={image} alt='share' />
          </FlIconButton>
          <FlBox>
            <FlTypography
              variant='body1'
              display='block'
              className={classes.text}
            >
              {title}
            </FlTypography>
            <FlTypography
              variant='body2'
              display='block'
              className={classes.text}
            >
              {pageName}
            </FlTypography>
          </FlBox>
        </FlBox>
        <FlBox>
          <FlIconButton onClick={() => history.push(
            {
              pathname: `/page/details/${postPage.url}`,
              state: {
                pageid: postPage._id,
              },
            },
          )}
          >
            <FlTypography
              variant='body1'
              display='block'
              className={classes.text}
              style={{ fontSize: 14, color: '#EF613B', fontWeight: 500 }}
            >
              View Page
            </FlTypography>
          </FlIconButton>
        </FlBox>
      </FlBox>
      {likesVisible && (
      <FlModal
        open={likesVisible}
        onClose={() => showLikes(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FlBox className={classes.modal} style={{ width: 400 }}>
          <FlCustomModalHeader heading="Likes" closeModal={() => showLikes(false)} />
          <FlContainer style={{ marginTop: '4.5rem', padding: '5px', paddingLeft: '1.5rem' }}>
            <div className={classes.commentSectionWeb} id="likesDiv">
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
                      scrollableTarget="likesDiv"
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
                          LoggedInUserId={userDetails._id}
                          postCount={like?.user?.postCount}
                          followerCount={like?.user?.followerCount}
                        />
                      ))}
                    </InfiniteScroll>
                  )
                  : (
                    <div style={{ paddingTop: '1rem' }}>
                      <FlTypography>
                        Oops! Couldn't fetch data. Try Again!
                      </FlTypography>
                    </div>
                  )}
            </div>
          </FlContainer>
        </FlBox>
      </FlModal>
      )}
      {commentsVisible && (
      <FlModal
        open={commentsVisible}
        onClose={() => showComments(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FlBox className={classes.modal} style={{ width: 500 }}>
          <FlCustomModalHeader heading="Comments" closeModal={() => showComments(false)} />
          <FlContainer style={{ marginTop: '3.5rem', padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              className={classes.commentSectionWeb}
            >
              { commentsLoader
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
                    <div style={{ paddingLeft: '1rem', paddingRight: '10px' }}>
                      {commentsList.map((commentItem) => (
                        <FlCommentList
                          key={commentItem?._id}
                          avatar={commentItem?.user?.profileImage}
                          userName={commentItem?.user?.name}
                          url={commentItem?.user.url}
                          content={commentItem?.text}
                          time={commentItem?.createdAt}
                        />
                      ))}
                      {totalResults > 10 && morefeeds
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
                    <div style={{ paddingTop: '1rem', paddingLeft: '1rem' }}>
                      <FlTypography>
                        No comments available.
                      </FlTypography>
                    </div>
                  )}
            </div>
            <FlDivider />
            <div style={{
              position: 'absolute',
              bottom: 0,
              borderTop: '1px solid #4D586F',
              backgroundColor: '#ffffff',
              width: '95%',
            }}
            >
              <FlGrid container spacing={2}>
                <FlGrid item md={10} xs={9}>
                  <FlTextField
                    // variant="outlined"
                    multiline
                    margin="none"
                    fullWidth
                    id="comment"
                    name="comment"
                    autoComplete="off"
                    value={comment.text}
                    onChange={(e) => setComment({ text: e.target.value })}
                    onClick={() => {
                      if (!isUserLogin) {
                        handleClose();
                        setTimeout(() => {
                          handleLogIn();
                        }, 100);
                      }
                    }}
                    placeholder="Add a comment..."
                    style={{ maxHeight: '100px', height: 'auto' }}
                    maxRows={4}
                    autoComplete="off"
                    inputProps={{
                      maxLength: 500,
                      style: {
                        font: 'normal normal 12px "SF Pro Rounded", sans-serif',
                        lineHeight: 'initial',
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <FlInputAdornment position="start">
                          <FlAvatar
                            src={userDetails?.profileImage}
                            alt="User"
                            style={{ height: '30px', width: '30px' }}
                          />
                        </FlInputAdornment>
                      ),
                      classes: {
                        // notchedOutline: classes.noBorder,
                        root: classes.textFieldWeb,
                      },
                    }}
                  />
                </FlGrid>
                <FlGrid
                  item
                  md={2}
                  xs={2}
                  style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'left' }}
                >
                  <FlButton
                    variant="text"
                    className={comment.text === '' ? classes.postBtnDisabled : classes.postBtn}
                    onClick={submitComment}
                  >
                    Post
                  </FlButton>
                </FlGrid>
              </FlGrid>
            </div>
          </FlContainer>
        </FlBox>
      </FlModal>
      )}
      {shareVisible && (
      <SharePopOver
        openPopover={shareVisible}
        closePopover={() => {
          setShareVisible(null);
          dispatch({ type: META_POST_DETAILS, payload: '' });
        }}
        postDetails={data}
        imageDiv={{}}
      />
      )}
      {drawer && (
      <FlBottomDrawer
        anchor="bottom"
        open={drawer}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        pageName={pageName}
        image={image}
        style={{ overflowY: 'hidden' }}
      >
        {drawerComponent === 'CommentData'
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
                Comments
              </FlTypography>
              { commentsLoader
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
                    <div className={classes.drawerDiv} id="commentsDiv">
                      <InfiniteScroll
                        scrollableTarget="commentsDiv"
                        style={{ marginBottom: '1rem', overflow: 'hidden' }}
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
                        {commentsList.map((commentItem) => (
                          <FlCommentList
                            key={commentItem?._id}
                            avatar={commentItem?.user?.profileImage}
                            userName={commentItem?.user?.name}
                            url={commentItem?.user.url}
                            content={commentItem?.text}
                            time={commentItem?.createdAt}
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
                postId={_id}
                avatar={userDetails?.profileImage}
                getCommentResponse={getCommentResponseMob}
              />
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
                Likes
              </FlTypography>
              <div className={classes.drawerDiv} id="likesDivMob">
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
                            LoggedInUserId={userDetails._id}
                            postCount={like?.user?.postCount}
                            followerCount={like?.user?.followerCount}
                          />
                        ))}
                      </InfiniteScroll>
                    )
                    : (
                      <div style={{ paddingTop: '1rem' }}>
                        <FlTypography>
                          Oops! Couldn't fetch data. Try Again!
                        </FlTypography>
                      </div>
                    )}
              </div>
            </>
          )}
      </FlBottomDrawer>
      )}

    </div>
  );
}

export default StoryFooter;

StoryFooter.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  postPage: PropTypes.instanceOf(Object).isRequired,
  storyActions: PropTypes.instanceOf(Object).isRequired,
  count: PropTypes.number.isRequired,
  handleCount: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
