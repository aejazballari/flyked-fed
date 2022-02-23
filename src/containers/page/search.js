/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import InfiniteScroll from 'react-infinite-scroll-component';
import PageMetaTags from '../../elements/pageMetaTags';
import {
  FlCircularProgress,
  FlContainer,
  FlMakeStyles,
  FlTypography,
} from '../../elements';
import FlSearchInput from '../../elements/FlSearchInput';
import FlPageList from '../../elements/FlPageList';
import PageLayout from '../../layouts/createLayout';
import * as pageAction from '../../actions/pageAction';

const useStyles = FlMakeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    padding: '20px',
    height: '60vh',
    overflow: 'hidden',
    overflowY: 'scroll',
    marginBottom: '40px',
  },
  heading: {
    paddingLeft: '1rem',
    marginTop: '15px',
    marginBottom: '0px',
    fontSize: '15px',
    fontWeight: '550',
  },
  bottomText: {
    position: 'fixed',
    bottom: '6%',
    backgroundColor: '#F7F7F8',
    padding: '10px',
    width: '88%',
    height: '3rem',
    paddingBottom: '0px',
  },
  link: {
    color: '#f1846b',
    textDecoration: 'none',
  },
  text: {
    fontSize: '12px',
    marginTop: '10px',
  },
}));

const Search = () => {
  const list = useSelector((state) => state.page.pageList);
  const totalResults = useSelector((state) => state.page.totalResults);
  const hasNextPage = useSelector((state) => state.page.hasNextPage);
  const nextPage = useSelector((state) => state.page.nextPage);
  const searchText = useSelector((state) => state.page.pageSearchText);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const classes = useStyles();
  const dispatch = useDispatch();
  const footer = true;
  const [morefeeds, setMoreFeeds] = useState(true);
  const [loader, setLoader] = useState(true);
  // const [list, setList] = useState(pageList);
  // const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(pageAction.getSearchPageResults(searchText, 1, () => setLoader(false)));
  }, [searchText]);

  // useEffect(() => {
  //   setList(pageList);
  // }, [pageList]);

  const sendQuery = (value) => {
    dispatch(pageAction.searchPage(value));
  };

  const search = useCallback(debounce(sendQuery, 500), []);

  const searchResults = (value) => {
    search(value);
  };

  // const refresh = () => {

  // };

  const fetchNextPages = () => {
    if (hasNextPage) {
      dispatch(pageAction.getSearchPageResults(searchText, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  return (
    <PageLayout pageName='Discover' footer={footer}>
      <PageMetaTags title="Flyked - Search Page" description="Search Page" image="" currentUrl={window?.location?.href || ''} />
      {isMobile ? (
        <FlContainer style={{ paddingTop: '3rem' }}>
          <FlSearchInput term={searchText} onChange={searchResults} />
          <FlTypography variant="h5" gutterBottom className={classes.heading}>
            Pages
          </FlTypography>
          {list && totalResults < 1 ? (
            <FlTypography style={{ marginLeft: '1rem', marginTop: '1rem' }}>
              Page Not Found!
            </FlTypography>
          ) : (
            <div className={classes.root} id="searchResults">
              <InfiniteScroll
                scrollableTarget="searchResults"
                style={{ overflowY: 'hidden', marginBottom: '4rem' }}
                dataLength={list?.length}
                next={fetchNextPages}
                hasMore={morefeeds}
                // loader={(
                //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                //     <FlCircularProgress />
                //   </div>
                //     )}
                endMessage={(
                  <p style={{ textAlign: 'center', fontSize: '11px' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                    )}
                    // below props only for pull down functionality
                // refreshFunction={refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                //     }
                // releaseToRefreshContent={
                //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                //     }
              >
                {loader ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FlCircularProgress />
                  </div>
                ) : list.map((page) => (
                  <FlPageList
                    key={page?._id}
                    id={page?._id}
                    title={page?.title}
                    url={page?.url}
                    image={page?.image}
                    postCount={page.postCount ? page.postCount : parseInt('0', 10)}
                    followerCount={page.followerCount ? page.followerCount : parseInt('0', 10)}
                  />
                ))}
              </InfiniteScroll>
            </div>
          )}
          <FlTypography variant='h5' className={classes.bottomText}>
            Can&#39;t find a Page?
            <Link to='/page/create' className={classes.link}>
              <span>&nbsp;Create a Page.</span>
            </Link>
          </FlTypography>
        </FlContainer>
      ) : null}
    </PageLayout>
  );
};

export default Search;
