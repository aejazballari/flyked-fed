/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FlAvatar, FlButton, FlGrid, FlListItem, FlListItemText, FlMakeStyles, FlTypography,
} from '.';
import { retrieveLocalStorage } from '../services/storageServices';
import { AlertNotificationContext } from './alert-notfication/alertState';
import * as userAction from '../actions/userAction';
import * as pageAction from '../actions/pageAction';
import * as authAction from '../actions/authAction';

const useStyles = FlMakeStyles((theme) => ({
  small: {
    height: '36px',
    width: '36px',
    margin: '0px',
    [theme.breakpoints.down('sm')]: {
      height: '35px',
      width: '35px',
    },
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  primaryText: {
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginLeft: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  secondaryText: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#4D586F',
    marginLeft: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
}));

const FlUserList = ({
  avatar, name, userId, LoggedInUserId,
  postCount, followerCount, url, isFollowing, type, refresh,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [followed, setFollowed] = useState(isFollowing);
  const [clicked, setClicked] = useState(false);
  const { setAlert } = useContext(AlertNotificationContext);
  const [followersCounter, setFollowersCounter] = useState(followerCount);

  const handleUserLink = () => {
    if (type === 'pages' || type === 'Pages') {
      history.push(
        {
          pathname: `/page/details/${url}`,
          state: {
            pageid: userId,
          },
        },
      );
    } else if (userId === LoggedInUserId) {
      history.push('/user/profile');
    } else {
      history.push(
        {
          pathname: `/user/userProfile/${url}`,
          state: {
            userid: userId,
          },
        },
      );
    }
  };

  const getFollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
      setFollowersCounter(followersCounter + 1);
      if (refresh) {
        refresh();
      }
    } else {
      setAlert('error', 'Already Followed!');
      setFollowed(false);
    }
  };

  const handleFollow = () => {
    if (isUserLogin) {
      if (type === 'pages' || type === 'Pages') {
        dispatch(pageAction.followPage(userId, getFollowResponse));
      } else {
        dispatch(userAction.followUser(userId, getFollowResponse));
      }
      setClicked(true);
      setFollowed(true);
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  const getUnfollowResponse = (response) => {
    if (response === 'success') {
      setClicked(false);
      setFollowersCounter(followersCounter - 1);
      if (refresh) {
        refresh();
      }
    } else {
      setAlert('error', 'Page Not Followed!');
      setFollowed(true);
    }
  };

  const handleUnfollow = () => {
    if (type === 'pages' || type === 'Pages') {
      dispatch(pageAction.unFollowPage(userId, getUnfollowResponse));
    } else {
      dispatch(userAction.unFollowUser(userId, getUnfollowResponse));
    }
    setFollowed(false);
    setClicked(true);
  };

  return (
    <FlListItem style={{ paddingLeft: '0px', paddingRight: '0px' }}>
      <FlGrid container spacing={0}>
        <FlGrid item md={1} xs={1} style={{ display: 'flex', alignItems: 'center', maxWidth: '2.7rem' }}>
          <FlAvatar alt={name} src={avatar} className={classes.small} />
        </FlGrid>
        <FlGrid item md={8} xs={8} sm={9} className={classes.userContainer}>
          {postCount >= 0 && followersCounter >= 0
            ? (
              <FlListItemText
                primary={(
                  <FlTypography
                    className={classes.primaryText}
                    onClick={() => handleUserLink()}
                  >
                    {name}
                  </FlTypography>
            )}
                secondary={(
                  <FlTypography
                    className={classes.secondaryText}
                  >
                    {`${postCount} Posts ${' '}${' '}${' '} ${followersCounter} Followers`}
                  </FlTypography>
            )}
              />
            )
            : (
              <FlListItemText
                primary={(
                  <FlTypography
                    className={classes.primaryText}
                    onClick={() => handleUserLink()}
                  >
                    {name}
                  </FlTypography>
              )}
              />
            )}
        </FlGrid>
        <FlGrid item md={2} xs={2} sm={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {userId === LoggedInUserId
            ? null
            : (
              <>
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
              </>
            )}
        </FlGrid>
      </FlGrid>
    </FlListItem>
  );
};

FlUserList.defaultProps = {
  postCount: 0,
  followerCount: 0,
  type: '',
  refresh: null,
};

FlUserList.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  postCount: PropTypes.number,
  followerCount: PropTypes.number,
  url: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  type: PropTypes.string,
  LoggedInUserId: PropTypes.string.isRequired,
};

export default FlUserList;
