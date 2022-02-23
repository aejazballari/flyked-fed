/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlCircularProgress,
} from '../../elements';
import * as feedAction from '../../actions/feedAction';
import BirthdayFeeds from './birthdayFeeds';
import InTheNewsFeeds from './inTheNewsFeeds';
import FactFeeds from './factFeeds';
import OnThisDayFeeds from './onThisDayFeeds';
import SuggestedFeeds from './suggestedFeeds';
import { retrieveLocalStorage } from '../../services/storageServices';

const FeedsContainer = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const categoryIds = useSelector((state) => state.feeds.categoryIds);
  const feeds = useSelector((state) => state.feeds.feedsList);
  const element = useSelector((state) => state?.post?.element);
  const feedElement = useSelector((state) => state?.post?.scroll.feed);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (categoryIds.length === 0) {
      setLoader(true);
      dispatch(feedAction.getFeeds('1', () => {
        setLoader(false);
      }));
    } else {
      setLoader(true);
      dispatch(feedAction.getFeeds('1', () => {
        setLoader(false);
      }, `category=[${categoryIds}]`));
    }
  }, [categoryIds, isUserLogin]);

  useEffect(() => {
    // if (window.innerWidth < 1024) {
    //   window.scrollTo(0, 0);
    // }
    if (element && !loader && feeds?.list) {
      setTimeout(() => {
        document?.getElementById(element)?.scrollIntoView();
      }, 600);
    }
  }, [element, loader]);

  const fetchFeeds = () => {
    if (feeds?.hasNextPage) {
      dispatch(feedAction.getFeeds(feeds?.nextPage));
    }
  };

  const Loader = () => (
    <div style={{
      display: 'flex', height: '50px', width: '100%', justifyContent: 'center', alignItems: 'center', background: '#fff', margin: '10px 0', borderRadius: 6,
    }}
    >
      <h5>Loading posts..</h5>
      <FlCircularProgress size={16} style={{ marginLeft: 10 }} />
    </div>
  );

  if (loader && !feeds?.list) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', height: '400px', width: '100%', justifyContent: 'center', alignItems: 'center', background: '#fff', margin: '10px 0', borderRadius: 6,
      }}
      >
        <FlCircularProgress size={20} />
        <h4>Loading Posts..</h4>
      </div>
    );
  }

  // if (!loader && feeds?.list?.length === 0) {
  //   return (
  //     <div style={{ textAlign: 'center' }} id={feedElement}>
  //       <div style={{
  //         display: 'flex', flexDirection: 'column', height: '400px', width: '100%', justifyContent: 'center', alignItems: 'center', background: '#fff', margin: '10px 0', borderRadius: 6,
  //       }}
  //       >
  //         <h4>No Fact Posts to show</h4>
  //       </div>
  //       <BirthdayFeeds />
  //       <OnThisDayFeeds />
  //       <InTheNewsFeeds />
  //       {isMobile && (
  //       <SuggestedFeeds />
  //       )}
  //     </div>
  //   );
  // }

  if (loader) {
    return (
      <Loader />
    );
  }

  return (
    <InfiniteScroll
      scrollableTarget="pageInfinateScrollModel"
      style={{ overflowY: 'hidden' }}
      dataLength={parseInt(feeds?.list?.length, 10) || 0}
      next={fetchFeeds}
      hasMore={feeds?.hasNextPage}
      loader={(
        <div style={{
          height: '5rem', overflow: 'hidden', paddingTop: '1rem', display: 'flex', justifyContent: 'center',
        }}
        >
          <FlCircularProgress />
        </div>
          )}
      endMessage={(
        <p style={{ textAlign: 'center', fontSize: '11px' }}>
          <b>Yay! You have seen it all</b>
        </p>
        )}
    >
      <>
        <div style={{ textAlign: 'center' }} id={isMobile ? null : feedElement}>
          <FactFeeds sliceFrom={0} sliceTo={2} data={feeds} />
          <BirthdayFeeds />
          <FactFeeds sliceFrom={2} sliceTo={4} data={feeds} />
          <OnThisDayFeeds />
          <FactFeeds sliceFrom={4} sliceTo={6} data={feeds} />
          <InTheNewsFeeds />
          <FactFeeds sliceFrom={6} sliceTo={8} data={feeds} />
          {isMobile && (
          <SuggestedFeeds />
          )}
          <FactFeeds sliceFrom={8} sliceTo={feeds?.list?.length} data={feeds} />
        </div>
      </>
    </InfiniteScroll>
  );
};
export default FeedsContainer;
