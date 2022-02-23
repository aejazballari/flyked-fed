/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useDispatch } from 'react-redux';
import * as pageAction from '../../actions/pageAction';
import { retrieveLocalStorage } from '../../services/storageServices';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import {
  FlAvatar, FlBox, FlButton, FlTypography, FlMakeStyles,
} from '../../elements';
import * as authAction from '../../actions/authAction';

const useStyles = FlMakeStyles(() => ({
  card: {
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    marginBottom: '10px',
  },

  title: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#172849',
    width: '100%',
    marginBottom: '5px',
    cursor: 'pointer',
  },

  desc: {
    fontSize: '12px',
    lineHeight: '14px',
    color: '#4D586F',
    width: '100%',
  },

  textContainer: {
    margin: '10px',
  },
}));

function SuggestedCardWeb({
  image, postsCount, followers, pageName,
  url, goToPage, id, message, refresh, selectedPageId,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [followed, setFollowed] = useState(false);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const { setAlert } = useContext(AlertNotificationContext);
  const [count, setCount] = useState(followers);

  const getFollowResponse = (response) => {
    if (response === 'success') {
      setCount(count + 1);
      refresh();
      if (selectedPageId === id && !isMobile) {
        dispatch(pageAction.getPageDetails(url));
      }
    } else {
      setAlert('error', 'Already Followed!');
      setFollowed(false);
    }
  };

  const handleFollow = (pageId) => {
    if (isUserLogin) {
      dispatch(pageAction?.followPage(pageId, getFollowResponse));
      setFollowed(true);
    } else {
      dispatch(authAction?.OpenLoginModel());
    }
  };

  const getUnfollowResponse = (response) => {
    if (response === 'success') {
      setCount(count - 1);
      refresh();
    } else {
      setAlert('error', 'Page Not Followed!');
      setFollowed(true);
    }
  };

  const handleUnfollow = (pageId) => {
    dispatch(pageAction.unFollowPage(pageId, getUnfollowResponse));
    setFollowed(false);
  };

  return (
    <FlBox className={classes.card}>
      <FlAvatar src={image} style={{ height: '36px', width: '36px' }} />
      <FlBox style={{ marginLeft: '10px', width: '200px' }}>
        <FlTypography className={classes.title} onClick={() => goToPage(url, id)}>
          {pageName}
        </FlTypography>
        <FlTypography className={classes.desc}>
          {`${postsCount} Posts  ${count} Followers`}
        </FlTypography>
      </FlBox>
      <FlButton color="primary" style={{ textTransform: 'capitalize' }} onClick={() => (followed ? handleUnfollow(id) : handleFollow(id))}>
        {message === 'Popular Pages You Follow' ? null : followed ? 'Unfollow' : 'follow'}
      </FlButton>
    </FlBox>
  );
}

export default SuggestedCardWeb;

SuggestedCardWeb.propTypes = {
  image: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  postsCount: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  goToPage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  selectedPageId: PropTypes.string.isRequired,
};
