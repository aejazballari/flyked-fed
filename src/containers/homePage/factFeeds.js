/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import PostCard from '../../components/post/postCard';
import PostCard from '../../components/postCard';

const FactFeeds = ({ sliceFrom, sliceTo, data }) => {
  const LoggedInUser = useSelector((state) => state.profile.userDetails);
  return (
    <>
      {data?.list?.slice(sliceFrom, sliceTo)?.map((post) => (
        <PostCard
          key={post._id}
          type=""
          postFullDetails={post}
          selectedPage=""
          selectedUser={LoggedInUser?._id}
        />
      ))}
    </>
  );
};

export default FactFeeds;
FactFeeds.defaultProps = {
  sliceTo: 0,
};
FactFeeds.propTypes = {
  sliceFrom: PropTypes.number.isRequired,
  sliceTo: PropTypes.number,
  data: PropTypes.instanceOf(Object).isRequired,
};
