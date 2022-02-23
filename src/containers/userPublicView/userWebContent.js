/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FlDivider,
  FlGrid,
  FlMakeStyles, FlTypography,
} from '../../elements';
import UserPosts from './userPosts';

const useStyles = FlMakeStyles(() => ({
  heading: {
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'flex-start',
    // textDecoration: 'underline',
  },
  createBox: {
    marginTop: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    cursor: 'pointer',
  },
}));

const UserWebContent = ({ userId }) => {
  const classes = useStyles();

  return (
    <>
      <FlGrid container spacing={0}>
        <FlGrid item md={2} style={{ borderBottom: '4px solid #172849', borderRadius: '2px' }}>
          <FlTypography className={classes.heading}>
            My Posts
          </FlTypography>
        </FlGrid>
      </FlGrid>
      <FlDivider style={{ marginBottom: '1rem' }} />
      <UserPosts type="Feeds" userId={userId} />
    </>
  );
};

export default UserWebContent;

UserWebContent.propTypes = {
  userId: PropTypes.string.isRequired,
};
