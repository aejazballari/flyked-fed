import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import { FlGrid, FlTypography } from '../../elements/index';
import PageLayout from '../../layouts/createLayout';
import CreatePostStep1 from './createPoststep1';
import PageSelectionModel from './pageSelectionModel';
import PostPreview from './postPreview';
import PostReview from './postReview';
import PageMetaTags from '../../elements/pageMetaTags';
import { retrieveLocalStorage } from '../../services/storageServices';
import { PROFILE_ROUTE_FROM } from '../../actions/profileAction';
import './style.css';

const CreatePost = () => {
  const appTheme = useTheme();
  const screenHeight = window.innerHeight === 1366;
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const currentStep = useSelector((state) => state?.post?.currentStep);
  const history = useHistory();
  const isUserLogin = retrieveLocalStorage('userLogin');

  useEffect(() => {
    if (!isUserLogin) {
      history.push('/');
    }
    dispatch({ type: PROFILE_ROUTE_FROM, payload: '' });
  }, []);

  return (
    <PageLayout footer={!isMobile} header={!isMobile}>
      <PageMetaTags title="Flyked - Create Post" image="" description="Create a new post" currentUrl={window?.location?.href || ''} />
      <FlGrid
        container
        spacing={2}
        className="create-post-main-body"
        style={{
          backgroundColor: isMobile && currentStep === 1 ? '#212121' : '',
          overflow: 'auto',
        }}
      >
        <FlGrid item md={screenHeight ? 3 : 4} />
        <FlGrid item md={screenHeight ? 7 : 5} sm={12} xs={12}>
          <FlGrid container spacing={2}>
            <FlGrid item md={12} xs={12}>
              <FlTypography className="create-post-main-headding">
                {currentStep === 1 ? 'Create Post' : ''}
              </FlTypography>
            </FlGrid>
            <FlGrid item md={12} xs={12}>
              {currentStep === 1 ? <CreatePostStep1 /> : ''}
              {currentStep === 2 ? <PostPreview /> : ''}
              {currentStep === 3 ? <PostReview /> : ''}
            </FlGrid>
          </FlGrid>
        </FlGrid>
        <FlGrid item md={screenHeight ? 2 : 3} />
      </FlGrid>
      <PageSelectionModel />
    </PageLayout>
  );
};
export default CreatePost;
