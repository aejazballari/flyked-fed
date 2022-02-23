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
import {
  FlCircularProgress, FlTypography,
} from '../../elements';
import HorizontalScroll from '../../components/commonComponents/HorizontalScroll';
import CommonCard from '../../components/commonComponents/CommonCard';
import CalendarWhite from '../../assets/navIcons/calenderWhite.svg';
import * as feedAction from '../../actions/feedAction';
import * as postAction from '../../actions/postAction';

const OnThisDayFeeds = () => {
  const dispatch = useDispatch();
  const thisDayFeeds = useSelector((state) => state?.feeds.thisDayList);
  const dayElement = useSelector((state) => state?.post?.scroll.thisDay);
  const [thisDayloader, setThisDayLoader] = useState(false);

  useEffect(() => {
    if (!thisDayFeeds || thisDayFeeds.length === 0) {
      setThisDayLoader(true);
      dispatch(feedAction.getOnThisDay(() => setThisDayLoader(false)));
    }
  }, []);

  const HorizontalFeedsComponent = ({
    elementId, title, image, feedData, feedKey, feedLoader, noDataMessage,
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
          : feedData?.map((post, index) => (
            <div style={{ width: '265px', marginRight: '5px' }} key={post._id}>
              <CommonCard
                type={post?.postType}
                dob={post?.thisDayDate}
                pageName={post?.postPage?.title}
                createdBy={post?.createdBy?.name}
                avatar={post?.postPage?.image}
                image={post?.image}
                description={post?.text}
                likesCount={post?.likesCount}
                commentCount={post.commentCount}
                id={post?._id}
                createdAt={post?.createdAt}
                isSaved={post?.isSaved}
                setOpenPreview={() => dispatch(postAction.handleOpenHorizontalPreview(feedKey, index))}
              />
            </div>
          ))}
      </HorizontalScroll>
    </div>
  );

  if (thisDayloader || !thisDayFeeds || thisDayFeeds?.length === 0) {
    return null;
  }

  return (
    <HorizontalFeedsComponent
      elementId={dayElement}
      title="On this day"
      image={CalendarWhite}
      feedLoader={thisDayloader}
      feedData={thisDayFeeds}
      feedKey="onThisDay"
      noDataMessage="There are no events for the day"
    />
  );
};

export default OnThisDayFeeds;
