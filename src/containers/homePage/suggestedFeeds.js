/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  FlCircularProgress, FlTypography,
} from '../../elements';
import HorizontalScroll from '../../components/commonComponents/HorizontalScroll';
import SuggestedPageCard from '../../components/commonComponents/SuggestedPageCard';
// import { retrieveLocalStorage } from '../../services/storageServices';
import * as feedAction from '../../actions/feedAction';

const SuggestedFeeds = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const isUserLogin = retrieveLocalStorage('userLogin');
  const suggestedPages = useSelector((state) => state.feeds.suggestedPages);
  const [suggestedLoader] = useState(false);

  const refresh = () => {
    // setSuggestedLoader(true);
    dispatch(feedAction.getSuggestedPages());
  };

  useEffect(() => {
    if (!suggestedPages?.data || suggestedPages?.data?.length === 0) {
      // dispatch(feedAction.getSuggestedPages(() => setSuggestedLoader(false)));
      refresh();
    }
  }, []);

  const goToPage = (url, id) => {
    history.push(
      {
        pathname: `/page/details/${url}`,
        state: {
          pageid: id,
        },
      },
    );
  };

  const HorizontalFeedsComponent = ({
    elementId, title, image, feedData, feedLoader, noDataMessage,
  }) => (
    <div id={elementId}>
      <HorizontalScroll title={title} image={image} color="#55A44A" bgColor="white">
        {feedLoader ? (
          <div style={{ width: '100%', height: 40 }}>
            <FlCircularProgress size={18} />
          </div>
        ) : feedData?.length === 0 ? (
          <FlTypography style={{
            fontSize: '14px', color: '#4D586F', textAlign: 'middle', padding: '20px', width: '100%',
          }}
          >
            {noDataMessage}
          </FlTypography>
        )
          : feedData?.map((post) => (
            <div style={{ width: '265px', marginRight: '5px' }} key={post._id}>
              <SuggestedPageCard
                message={suggestedPages?.message}
                pageName={post.title}
                postsCount={post.postCount}
                followers={post.followerCount}
                image={post.image}
                key={post._id}
                goToPage={goToPage}
                url={post.url}
                id={post._id}
                category={post.category.title}
                subcategory={post?.subCategory}
                refresh={refresh}
              />
            </div>
          ))}
      </HorizontalScroll>
    </div>
  );

  if (suggestedLoader) {
    return null;
  }

  return (
    <HorizontalFeedsComponent
      title={suggestedPages?.message}
      image={null}
      feedLoader={suggestedLoader}
      feedData={suggestedPages?.data}
      noDataMessage="There are no suggested pages for you"
    />
  );
};

export default SuggestedFeeds;
