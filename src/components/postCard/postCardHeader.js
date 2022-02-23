/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useDispatch } from 'react-redux';
import {
  FlAvatar, FlButton, FlGrid, FlList, FlListItem,
  FlListItemAvatar, FlListItemText, FlMakeStyles, FlTypography,
} from '../../elements';
import MoreVertIcon from '../../assets/MoreVertIcon.svg';
import FlBottomDrawer from '../../elements/FlBottomDrawer';
import * as pageAction from '../../actions/pageAction';
import * as userAction from '../../actions/userAction';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import { retrieveLocalStorage } from '../../services/storageServices';
import * as authAction from '../../actions/authAction';

const useStyles = FlMakeStyles((theme) => ({
  postCard: {
    backgroundColor: 'white !important',
    boxShadow: 'none',
    marginBottom: '20px',
    position: 'relative',
  },
  cardHeader: {
    padding: '0.5rem',
  },
  primaryText: {
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
  },
  secondaryText: {
    fontSize: '14px',
    fontWeight: '400',
    cursor: 'pointer',
    textAlign: 'left',
  },
  status: {
    color: '#EAB429',
    fontSize: '14px',
    fontWeight: '400',
    paddingTop: '10px',
  },
  moreIcon: {
    padding: '5px',
    position: 'relative',
    height: '25px',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
      objectFit: 'contain',
    },
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 2px 2px #e8e9ec',
    position: 'absolute',
    top: '3rem',
    right: '5%',
    // display: 'block',
    width: '20rem',
    height: 'auto',
    padding: '10px',
    zIndex: '999',
  },
}));

const PostCardHeader = ({
  type, id, profileImage, name, userId, avatar,
  userURL, createdBy, ifFollowingUser, pageName,
  pageImage, pageId, pageURL, isFollowingPage,
  selectedPage, selectedUser, loggedInUser,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const { setAlert } = useContext(AlertNotificationContext);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [drawer, setDrawer] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [followingPage, setFollowingPage] = useState(isFollowingPage);
  const [followingUser, setFollowingUser] = useState(ifFollowingUser);
  const [clicked, setClicked] = useState(false);

  // for web
  const toggleDropdown = (open) => {
    setDropdown(open);
  };

  // for mobile
  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  const getPageUnfollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
    } else {
      setAlert('error', 'Page Not Followed!');
      setFollowingPage(true);
    }
  };

  const handlePageUnfollow = () => {
    dispatch(pageAction.unFollowPage(pageId, getPageUnfollowResponse));
    setFollowingPage(false);
    setClicked(true);
  };

  const getPageFollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
    } else {
      setAlert('error', 'Already Followed!');
      setFollowingPage(true);
    }
  };

  const handlePageFollow = () => {
    if (isUserLogin) {
      dispatch(pageAction.followPage(pageId, getPageFollowResponse));
      setClicked(true);
      setFollowingPage(true);
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  const getUserUnfollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
    } else {
      setAlert('error', 'Page Not Followed!');
      setFollowingUser(true);
    }
  };

  const handleUserUnfollow = () => {
    dispatch(userAction.unFollowUser(userId, getUserUnfollowResponse));
    setFollowingUser(false);
    setClicked(true);
  };

  const getUserFollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
    } else {
      setAlert('error', 'Already Followed!');
      setFollowingUser(false);
    }
  };

  const handleUserFollow = () => {
    if (isUserLogin) {
      dispatch(userAction.followUser(userId, getUserFollowResponse));
      setFollowingUser(true);
      setClicked(true);
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  function useOutsideAlerterDropdown(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerterDropdown(dropdownRef);

  return (
    <FlGrid container spacing={0} className={classes.cardHeader}>
      <FlGrid item md={2} xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
        <FlAvatar
          src={profileImage}
          alt={name}
        />
      </FlGrid>
      <FlGrid item md={6} xs={6}>
        <FlGrid container spacing={0}>
          <FlGrid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <FlTypography
              className={classes.primaryText}
              onClick={() => {
                if (loggedInUser === userId) {
                  history.push('/user/profile');
                } else {
                  history.push(
                    {
                      pathname: `/user/userProfile/${userURL}`,
                      state: {
                        userid: userId,
                      },
                    },
                  );
                }
              }}
            >
              {createdBy}
            </FlTypography>
          </FlGrid>
          <FlGrid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <FlTypography
              className={classes.secondaryText}
              onClick={() => history.push(
                {
                  pathname: `/page/details/${pageURL}`,
                  state: {
                    pageid: pageId,
                  },
                },
              )}
            >
              <span style={{ color: '#888F9D' }}>on&nbsp;</span>
              {pageName}
            </FlTypography>
          </FlGrid>
        </FlGrid>
      </FlGrid>
      {type === 'Pending'
        ? (
          <FlGrid item md={4} xs={4}>
            <FlTypography className={classes.status}>
              Pending Approval
            </FlTypography>
          </FlGrid>
        )
        : (
          <>
            <FlGrid item md={2} xs={2} />
            <FlGrid item md={2} xs={2} style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
              {isMobile
                ? (
                  <>
                    <img
                      src={MoreVertIcon}
                      alt="more"
                      style={{ aspectRatio: '1/1' }}
                      className={classes.moreIcon}
                      onClick={() => toggleDrawer(true)}
                    />
                    <FlBottomDrawer
                      anchor="bottom"
                      open={drawer}
                      onClose={toggleDrawer}
                      onOpen={toggleDrawer}
                      pageName={pageName}
                      // image={image}
                      style={{ overflowY: 'hidden' }}
                    >
                      <FlList style={{ padding: '1rem' }}>
                        {selectedPage === pageId
                          ? null
                          : (
                            <FlListItem style={{ padding: '0', paddingBottom: '1rem' }}>
                              <FlListItemAvatar style={{ minWidth: '45px' }}>
                                <FlAvatar
                                  alt={pageName}
                                  src={pageImage}
                                  className={classes.image}
                                />
                              </FlListItemAvatar>
                              <FlListItemText primary={(
                                <FlTypography
                                  className={classes.secondaryText}
                                  onClick={() => history.push(
                                    {
                                      pathname: `/page/details/${pageURL}`,
                                      state: {
                                        pageid: pageId,
                                      },
                                    },
                                  )}
                                >
                                  {pageName}
                                </FlTypography>
                          )}
                              />
                              {followingPage === true
                                ? (
                                  <FlButton
                                    variant="outlined"
                                    color="primary"
                                    aria-label="Unfollow Button"
                                    className={clicked === true ? classes.disabled : ''}
                                    style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                    onClick={() => handlePageUnfollow()}
                                  >
                                    Unfollow
                                  </FlButton>
                                )
                                : (
                                  <FlButton
                                    variant="contained"
                                    color="primary"
                                    aria-label="Follow Button"
                                    className={clicked === true ? classes.disabled : ''}
                                    style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                    onClick={() => handlePageFollow()}
                                  >
                                    Follow
                                  </FlButton>
                                )}
                            </FlListItem>
                          )}
                        {selectedUser === userId
                          ? null
                          : (
                            <FlListItem style={{ padding: '0' }}>
                              <FlListItemAvatar style={{ minWidth: '45px' }}>
                                <FlAvatar
                                  alt={pageName}
                                  src={avatar}
                                  className={classes.image}
                                />
                              </FlListItemAvatar>
                              <FlListItemText primary={(
                                <FlTypography
                                  className={classes.secondaryText}
                                  onClick={() => {
                                    if (loggedInUser === userId) {
                                      history.push('/user/profile');
                                    } else {
                                      history.push(
                                        {
                                          pathname: `/user/userProfile/${userURL}`,
                                          state: {
                                            userid: userId,
                                          },
                                        },
                                      );
                                    }
                                  }}
                                >
                                  {createdBy}
                                </FlTypography>
                          )}
                              />
                              { loggedInUser === userId
                                ? null
                                : followingUser === true
                                  ? (
                                    <FlButton
                                      variant="outlined"
                                      color="primary"
                                      aria-label="Unfollow Button"
                                      className={clicked === true ? classes.disabled : ''}
                                      style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                      onClick={() => handleUserUnfollow()}
                                    >
                                      Unfollow
                                    </FlButton>
                                  )
                                  : (
                                    <FlButton
                                      variant="contained"
                                      color="primary"
                                      aria-label="Follow Button"
                                      className={clicked === true ? classes.disabled : ''}
                                      style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                      onClick={() => handleUserFollow()}
                                    >
                                      Follow
                                    </FlButton>
                                  )}
                            </FlListItem>
                          )}
                      </FlList>
                    </FlBottomDrawer>
                  </>
                )
                : (
                  <>
                    <img
                      src={MoreVertIcon}
                      alt="more"
                      style={{ aspectRatio: '1/1' }}
                      className={classes.moreIcon}
                      onClick={() => toggleDropdown(true)}
                    />
                  </>
                )}
            </FlGrid>
            {dropdown && !isMobile
              ? (
                <div style={{ display: dropdown ? '' : 'none' }} ref={dropdownRef}>
                  <div className={classes.dropdownMenu}>
                    <FlList style={{ padding: '0' }}>
                      {selectedPage === pageId
                        ? null
                        : (
                          <FlListItem style={{ padding: '0', paddingBottom: '1rem' }}>
                            <FlListItemAvatar style={{ minWidth: '45px' }}>
                              <FlAvatar
                                alt={pageName}
                                src={pageImage}
                                className={classes.image}
                              />
                            </FlListItemAvatar>
                            <FlListItemText primary={(
                              <FlTypography
                                className={classes.secondaryText}
                                onClick={() => history.push(
                                  {
                                    pathname: `/page/details/${pageURL}`,
                                    state: {
                                      pageid: pageId,
                                    },
                                  },
                                )}
                              >
                                {pageName}
                              </FlTypography>
                          )}
                            />
                            {followingPage === true
                              ? (
                                <FlButton
                                  variant="outlined"
                                  color="primary"
                                  className={clicked === true ? classes.disabled : ''}
                                  style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                  onClick={() => handlePageUnfollow()}
                                >
                                  Unfollow
                                </FlButton>
                              )
                              : (
                                <FlButton
                                  variant="contained"
                                  color="primary"
                                  className={clicked === true ? classes.disabled : ''}
                                  style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                  onClick={() => handlePageFollow()}
                                >
                                  Follow
                                </FlButton>
                              )}
                          </FlListItem>
                        )}
                      {selectedUser === userId
                        ? null
                        : (
                          <FlListItem style={{ padding: '0' }}>
                            <FlListItemAvatar style={{ minWidth: '45px' }}>
                              <FlAvatar
                                alt={pageName}
                                src={avatar}
                                className={classes.image}
                              />
                            </FlListItemAvatar>
                            <FlListItemText primary={(
                              <FlTypography
                                className={classes.secondaryText}
                                onClick={() => {
                                  if (loggedInUser === userId) {
                                    history.push('/user/profile');
                                  } else {
                                    history.push(
                                      {
                                        pathname: `/user/userProfile/${userURL}`,
                                        state: {
                                          userid: userId,
                                        },
                                      },
                                    );
                                  }
                                }}
                              >
                                {createdBy}
                              </FlTypography>
                          )}
                            />
                            { loggedInUser === userId
                              ? null
                              : followingUser === true
                                ? (
                                  <FlButton
                                    variant="outlined"
                                    color="primary"
                                    aria-label="Unfollow Button"
                                    className={clicked === true ? classes.disabled : ''}
                                    style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                    onClick={() => handleUserUnfollow()}
                                  >
                                    Unfollow
                                  </FlButton>
                                )
                                : (
                                  <FlButton
                                    variant="contained"
                                    color="primary"
                                    aria-label="Follow Button"
                                    className={clicked === true ? classes.disabled : ''}
                                    style={{ textTransform: 'capitalize', marginLeft: '1rem' }}
                                    onClick={() => handleUserFollow()}
                                  >
                                    Follow
                                  </FlButton>
                                )}
                          </FlListItem>
                        )}
                    </FlList>
                  </div>
                </div>
              )
              : null}
          </>
        )}
    </FlGrid>
  );
};
PostCardHeader.defaultProps = {
  ifFollowingUser: false,
  isFollowingPage: false,
  selectedPage: '',
  selectedUser: '',
  loggedInUser: '',
};

PostCardHeader.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  userURL: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  ifFollowingUser: PropTypes.bool,
  pageName: PropTypes.string.isRequired,
  pageImage: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
  isFollowingPage: PropTypes.bool,
  selectedPage: PropTypes.string,
  selectedUser: PropTypes.string,
  loggedInUser: PropTypes.string,
};

export default PostCardHeader;
