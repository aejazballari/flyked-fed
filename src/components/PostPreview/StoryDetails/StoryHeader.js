/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IMAGES } from '../../../constants/images';
import {
  FlMakeStyles, FlBox, FlIconButton,
} from '../../../elements';

const useStyles = FlMakeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px 0 0',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
  },
  name: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
  },
}));

function StoryHeader({ data, handleClose }) {
  const classes = useStyles();
  const history = useHistory();
  const isloading = useSelector((state) => state?.feedPreview?.loading);
  const {
    name, profileImage, url, _id,
  } = data;

  const handleClick = () => {
    history.push(
      {
        pathname: `/user/userProfile/${url}`,
        state: {
          userid: _id,
        },
      },
    );
  };

  return (
    <FlBox className={classes.root}>
      <FlBox className={classes.userDetails}>
        <img src={profileImage} alt='profile pic' className={classes.profileImage} />
        <h4 className={classes.name} onClick={() => handleClick()}>{name}</h4>
      </FlBox>
      <FlIconButton disabled={isloading} onClick={handleClose} className={classes.closeButton}>
        <img
          src={IMAGES.STORY_CLOSE_ICON}
          className={classes.close}
          alt='close'
        />
      </FlIconButton>
    </FlBox>
  );
}

export default StoryHeader;

StoryHeader.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  handleClose: PropTypes.func.isRequired,
};
