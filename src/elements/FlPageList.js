/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  FlMakeStyles, FlTypography, FlListItemAvatar, FlAvatar, FlListItemText, FlListItem,
} from '.';

const useStyles = FlMakeStyles(() => ({
  listItem: {
    padding: '0px',
    cursor: 'pointer',
  },
  pageLink: {
    textDecoration: 'none',
  },
  primaryText: {
    fontSize: '14px',
    color: '#172849',
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: '12px',
    fontWeight: 'normal',
    color: '#4D586F',
  },
}));

const FlPageList = ({
  id,
  title,
  url,
  image,
  postCount,
  followerCount,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(
        {
          pathname: `/page/details/${url}`,
          state: {
            pageid: id,
          },
        },
      )}
      className={classes.pageLink}
    >
      <FlListItem className={classes.listItem} key={id}>
        <FlListItemAvatar>
          <FlAvatar alt={title} src={image} />
        </FlListItemAvatar>
        <FlListItemText
          primary={<FlTypography className={classes.primaryText}>{title}</FlTypography>}
          secondary={<FlTypography className={classes.secondaryText}>{`${postCount} Posts ${' '}${' '}${' '} ${followerCount} Followers`}</FlTypography>}
        />
      </FlListItem>
    </div>
  );
};

export default FlPageList;

FlPageList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  postCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
};
