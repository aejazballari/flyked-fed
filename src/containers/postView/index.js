/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as postAction from '../../actions/postAction';
// import PostCard from '../../components/post/postCard';
import PostCard from '../../components/postCard';
import {
  FlAppBar, FlCircularProgress, FlGrid, FlToolbar, FlTypography,
} from '../../elements';
import PageMetaTags from '../../elements/pageMetaTags';
// import PageLayout from '../../layouts/pageLayout';
import HomeLayout from '../../layouts/homeLayout';
import FlykedICon from '../../assets/FlykedLogo.svg';

const PostView = () => {
  const header = false;
  const footer = true;
  const dispatch = useDispatch();
  const { url } = useParams();
  const history = useHistory();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const postDetails = useSelector((state) => state.post.postDetails);
  const [loader, setLoader] = useState(false);
  const [postData, setPostData] = useState(postDetails);

  useEffect(() => {
    setLoader(true);
    dispatch(postAction.getPostDetails(url, () => setLoader(false)));
  }, []);

  useEffect(() => {
    setPostData(postDetails);
  }, [postDetails]);

  const Loader = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <FlCircularProgress />
    </div>
  );

  return (
    <>
      {loader || !postData
        ? (<Loader />)
        : (
          <>
            <PageMetaTags title={`Flyked - ${postData?.text}`} image={postData?.image} description={postData?.text} currentUrl={window?.location?.href || ''} />
            {isMobile
              ? (
                <HomeLayout footer={footer} header={header}>
                  <FlAppBar position="fixed" color="inherit" className="header_block">
                    <FlToolbar className="container" style={{ paddingLeft: '0px' }}>
                      <FlGrid container item md={3} spacing={2}>
                        <FlTypography variant="h4">
                          <Link to="/">
                            <img
                              src={FlykedICon}
                              alt="Logo"
                              height="28px"
                              style={{ paddingLeft: '2rem' }}
                              onClick={() => {
                              // window.scrollTo(0, 0);
                                dispatch(postAction.scrollToView('feed'));
                              }}
                            />
                          </Link>
                        </FlTypography>
                      </FlGrid>
                    </FlToolbar>
                  </FlAppBar>
                  <FlGrid justifyContent="center" align="center" style={{ marginTop: '2rem' }}>
                    {postData
                      ? (
                        postData.map((post) => (
                          <PostCard
                            type="Feeds"
                            key={post?._id}
                            postFullDetails={post}
                            selectedPage=""
                            selectedUser=""
                          />
                        ))
                      )
                      : null}
                  </FlGrid>
                  <FlGrid align="center">
                    <FlTypography
                      style={{
                        fontSize: '18px',
                        color: '#1C2121',
                        fontWeight: '400',
                        marginLeft: '4rem',
                        marginRight: '4rem',
                        marginTop: '2rem',
                        marginBottom: '1rem',
                      }}
                    >
                      Click here to view more posts on
                    </FlTypography>
                    <FlTypography
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#EF613B',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => history.push(
                        {
                          pathname: `/page/details/${postDetails?.[0]?.postPage?.url}`,
                          state: {
                            pageid: postDetails?.[0]?.postPage?._id,
                          },
                        },
                      )}
                    >
                      {postDetails?.[0]?.postPage?.title}
                    </FlTypography>
                  </FlGrid>
                </HomeLayout>
              )
              : (
                <HomeLayout>
                  <FlGrid justifyContent="center" align="center">
                    {postData
                      ? (
                        postData.map((post) => (
                          <PostCard
                            type="Feeds"
                            key={post?._id}
                            postFullDetails={post}
                            selectedPage=""
                            selectedUser=""
                          />
                        ))
                      )
                      : null}
                  </FlGrid>
                  <FlGrid align="center">
                    <FlTypography
                      style={{
                        fontSize: '18px',
                        color: '#1C2121',
                        fontWeight: '400',
                        marginLeft: '4rem',
                        marginRight: '4rem',
                        marginTop: '2rem',
                        marginBottom: '1rem',
                      }}
                    >
                      Click here to view more posts on
                      {' '}
                      {/* {postDetails?.[0]?.postPage?.title} */}
                    </FlTypography>
                    <FlTypography
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#EF613B',
                        marginBottom: '2rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => history.push(
                        {
                          pathname: `/page/details/${postDetails?.[0]?.postPage?.url}`,
                          state: {
                            pageid: postDetails?.[0]?.postPage?._id,
                          },
                        },
                      )}
                    >
                      {postDetails?.[0]?.postPage?.title}
                    </FlTypography>
                  </FlGrid>
                </HomeLayout>
              )}
          </>
        )}
    </>
  );
};

export default PostView;
