/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import {
  FlAvatar, FlList, FlListItem, FlMakeStyles, FlTypography, FlGrid,
} from '.';

const useStyles = FlMakeStyles(() => ({
  small: {
    height: '30px',
    width: '30px',
    margin: '0px',
  },
  user: {
    fontSize: '14px',
    fontWeight: '600',
  },
  comment: {
    fontSize: '14px',
    lineHeight: '16px',
    width: '98%',
  },
  time: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#1C2121',
    opacity: '0.4',
    textAlign: 'right',
  },
}));

const FlCommentList = ({
  avatar, userName, url, content, time,
}) => {
  const classes = useStyles();
  // const formattedDate = moment(time).format('DD MMMM YYYY');
  const today = new Date();
  const createdDate = new Date(time);
  const diff = today - createdDate;
  const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHrs = diff / (1000 * 60 * 60);
  const diffMin = diff / (1000 * 60);
  let commentTime = '';
  if (diffMin < 1) {
    commentTime = 'now';
  } else if (diffMin > 1 && diffMin < 60) {
    commentTime = `${Math.floor(diffMin)} min ago`;
  } else if (diffMin >= 60 && diffHrs < 24) {
    commentTime = `${Math.floor(diffHrs)}h ago`;
  } else if (diffHrs >= 24 && diffDays < 30) {
    commentTime = `${Math.floor(diffDays)} days ago`;
  } else if (diffDays >= 30 && diffMonths < 12) {
    commentTime = `${Math.floor(diffMonths)} months ago`;
  } else {
    commentTime = `${Math.floor(diffYear)} months ago`;
  }

  return (
    <FlList>
      <FlListItem style={{ paddingLeft: '0px', paddingRight: '0px' }}>
        <FlGrid container spacing={0}>
          <FlGrid item md={1} sm={1} xs={2} style={{ maxWidth: '2.7rem' }}>
            <FlAvatar alt="User" src={avatar} className={classes.small} />
          </FlGrid>
          <FlGrid item md={9} sm={9} xs={8} style={{ display: 'flex', alignItems: 'center' }}>
            <FlTypography className={classes.comment}>
              <span className={classes.user}>
                {userName}
                {' '}
              </span>
              {content}
            </FlTypography>
          </FlGrid>
          <FlGrid
            item
            md={2}
            xs={2}
            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'right' }}
          >
            <FlTypography className={classes.time}>
              {commentTime}
            </FlTypography>
          </FlGrid>
        </FlGrid>
      </FlListItem>
    </FlList>
  );
};

export default FlCommentList;

FlCommentList.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
