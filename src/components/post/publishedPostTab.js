/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as postAction from '../../actions/postAction';
import { FlCircularProgress, FlTypography } from '../../elements';
import PostCard from '../postCard';

const PublishedPostTab = ({ type }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.profile.userDetails);
  const publishedPosts = useSelector(
    (state) => state.profilePost.publishedPosts,
  );
  const nextPage = useSelector((state) => state.profilePost.nextPage);
  const hasNextPage = useSelector((state) => state.profilePost.hasNextPage);
  const totalResults = useSelector((state) => state.profilePost.totalResults);
  const [loader, setLoader] = useState(false);
  const [morefeeds, setMoreFeeds] = useState(true);

  useEffect(() => {
    setLoader(true);
    dispatch(postAction.getPublishedPosts('1', () => setLoader(false)));
  }, []);

  const fetchPublishedPosts = () => {
    if (hasNextPage) {
      dispatch(postAction.getPublishedPosts(nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <>
      {loader || !publishedPosts ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '6 rem',
          }}
        >
          <FlCircularProgress />
        </div>
      )
        : publishedPosts && totalResults > 0 ? (
          <InfiniteScroll
            scrollableTarget="pageInfinateScrollModel"
            style={{ overflowY: 'hidden', marginBottom: '4rem' }}
            dataLength={publishedPosts?.length}
            next={fetchPublishedPosts}
            hasMore={morefeeds}
            loader={(
              <div
                style={{ height: '6rem', overflow: 'hidden', paddingTop: '1rem' }}
              >
                <FlCircularProgress />
              </div>
          )}
            endMessage={(<FlTypography style={{ textAlign: 'center', fontWeight: 'bold' }}>Yay! You have seen it all</FlTypography>)}
          >
            {publishedPosts.map((post) => (
              <PostCard
                key={post?._id}
                type={type}
                postFullDetails={post}
                selectedUser={userDetails?._id}
                selectedPage=""
              />
            ))}
          </InfiniteScroll>
        ) : (
          <FlTypography style={{ paddingTop: '2rem' }}>
            <FlTypography>No posts available.</FlTypography>
          </FlTypography>
        )}
    </>
  );
};

export default PublishedPostTab;

PublishedPostTab.propTypes = {
  type: PropTypes.string.isRequired,
};
