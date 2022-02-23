/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
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
    width: '181px',
    height: '214px',
    background: '#FFFFFF',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
    marginBottom: '10px',
  },

  title: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '17px',
    height: '34px',
    color: '#172849',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5px',
  },

  desc: {
    fontSize: '12px',
    lineHeight: '14px',
    color: '#4D586F',
    width: '100%',
    textAlign: 'center',
  },

  textContainer: {
    margin: '10px',
  },

  category: {
    fontSize: '12px',
    fontWeight: 300,
  },
}));

function SuggestedPageCard({
  image, pageName, desc, url, goToPage, id, category, subcategory, refresh, message,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const { setAlert } = useContext(AlertNotificationContext);

  const getFollowResponse = (response) => {
    if (response === 'success') {
      // setCount(count + 1);
      refresh();
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
      // setCount(count - 1);
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
      <FlAvatar src={image} alt="page-image" style={{ width: '80px', height: '80px' }} />
      <FlBox className={classes.textContainer}>
        <FlTypography
          className={classes.title}
          onClick={() => goToPage(url, id)}
        >
          {pageName}
        </FlTypography>
        <FlTypography className={classes.desc}>{desc}</FlTypography>
        <FlTypography className={classes.category}>
          {subcategory ? subcategory.title : category}
        </FlTypography>
      </FlBox>
      {
        message === 'Popular Pages You Follow' ? null : <FlButton color="primary" variant="contained" style={{ textTransform: 'capitalize' }} onClick={() => (followed ? handleUnfollow(id) : handleFollow(id))}>
        {followed ? 'Unfollow' : 'follow'}
                                                        </FlButton>
      }
    </FlBox>
  );
}

export default SuggestedPageCard;
SuggestedPageCard.defaultProps = {
  desc: '',
  subcategory: {},
};

SuggestedPageCard.propTypes = {
  image: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  desc: PropTypes.string,
  url: PropTypes.string.isRequired,
  goToPage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  // postsCount: PropTypes.number.isRequired,
  // followers: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.instanceOf(Object),
  refresh: PropTypes.func.isRequired,
};
