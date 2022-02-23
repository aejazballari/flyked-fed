/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as postAction from '../../actions/postAction';
import { FlCircularProgress, FlTypography } from '../../elements';
import PostCard from '../../components/postCard';

const PagePosts = ({ type, pageId }) => {
  const dispatch = useDispatch();
  const publishedPosts = useSelector((state) => state.pagePost.publishedPosts);
  const nextPage = useSelector((state) => state.pagePost.nextPage);
  const hasNextPage = useSelector((state) => state.pagePost.hasNextPage);
  // const totalResults = useSelector((state) => state.pagePost.totalResults);
  const [loader, setLoader] = useState(false);
  const [morefeeds, setMoreFeeds] = useState(true);

  useEffect(() => {
    dispatch({
      type: postAction.GET_PAGE_SPECIFIC_POSTS,
      payload: [],
    });
    if (publishedPosts?.length === 0 || publishedPosts?.length === undefined) {
      setLoader(true);
      dispatch(postAction.getPageSpecificPosts(pageId, 1, () => setLoader(false)));
    }
  }, []);

  const fetchPublishedPosts = () => {
    if (hasNextPage) {
      dispatch(postAction.getPageSpecificPosts(pageId, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  if (loader) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '6rem',
        }}
      >
        <FlCircularProgress />
      </div>
    );
  }

  return (
    <>
      {publishedPosts && publishedPosts?.length > 0
        ? (
          <InfiniteScroll
            scrollableTarget="pageInfinateScrollModel"
            style={{ overflowY: 'hidden', marginBottom: '4rem' }}
            dataLength={publishedPosts?.length}
            next={fetchPublishedPosts}
            hasMore={morefeeds}
            loader={(
              <div style={{ height: '6rem', overflow: 'hidden', paddingTop: '1rem' }}>
                <FlCircularProgress />
              </div>
          )}
            endMessage={(
              <p style={{ textAlign: 'center', fontSize: '11px' }}>
                <b>Yay! You have seen it all</b>
              </p>
        )}
          >
            {publishedPosts.map((post) => (
              <PostCard
                key={post?._id}
                type={type}
                postFullDetails={post}
                selectedPage={pageId}
                selectedUser=""
              />
            ))}
          </InfiniteScroll>
        )
        : (
          <div style={{ paddingTop: '1rem' }}>
            <FlTypography>
              No posts available.
            </FlTypography>
          </div>
        )}
    </>
  );
};

export default PagePosts;

PagePosts.propTypes = {
  type: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};
