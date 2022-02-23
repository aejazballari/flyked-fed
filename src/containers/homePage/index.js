/* eslint-disable linebreak-style */
import React, {
  useEffect, lazy, Suspense,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useLocation } from 'react-router-dom';
import PageMetaTags from '../../elements/pageMetaTags';
import HomeLayout from '../../layouts/homeLayout';
// import PostFeedsPreview from '../../components/post/postFeedsPreview';
// import HorizontalFeedsPreview from '../../components/post/horizontalFeedsPreview';
import CategoriesMobileList from './categoriesMobileList';
import FeedsContainer from './feedsContainer';
import * as feedAction from '../../actions/feedAction';
import * as authAction from '../../actions/authAction';
import { FlCircularProgress } from '../../elements';
import { OPEN_PREVIEW_MODEL } from '../../actions/feedsPostAction';
import * as postAction from '../../actions/postAction';

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const isUserLogin = retrieveLocalStorage('userLogin');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const footer = true;
  const openFeedPostPreview = useSelector((state) => state?.feedPreview?.openPreviewModel);
  const openHorizontalPreview = useSelector((state) => state?.post?.horizontalFeed.type);
  // const [loader, setLoader] = useState(false);
  const categoryIds = useSelector((state) => state.feeds.categoryIds);

  useEffect(() => {
    if (location?.pathname === '/' && location?.state?.openLoginModel) {
      dispatch(authAction?.OpenLoginModel());
    }
    return () => {
      dispatch({ type: OPEN_PREVIEW_MODEL, payload: false });
      dispatch(postAction.handleOpenHorizontalPreview(null, null));
    };
  }, [location]);

  const refresh = () => {
    if (categoryIds.length === 0) {
      // setLoader(true);
      dispatch(feedAction.getFeeds('1'));
    } else {
      // setLoader(true);
      dispatch(feedAction.getFeeds('1', `category=[${categoryIds}]`));
    }
  };

  const PostFeedsPreview = lazy(() => import('../../components/post/postFeedsPreview'));
  const HorizontalFeedsPreview = lazy(() => import('../../components/post/horizontalFeedsPreview'));

  return (
    <HomeLayout footer={footer}>
      <>
        <PageMetaTags title="Flyked - Home" description="Home Page" image="" currentUrl={window?.location?.href || ''} />
        {isMobile ? <CategoriesMobileList /> : null}
        <FeedsContainer />
        {openFeedPostPreview ? <Suspense fallback={<FlCircularProgress color="primary" />}><PostFeedsPreview refresh={refresh} /></Suspense> : null}
        {openHorizontalPreview ? <Suspense fallback={<FlCircularProgress color="primary" />}><HorizontalFeedsPreview /></Suspense> : null}
      </>
    </HomeLayout>
  );
};
export default HomePage;
