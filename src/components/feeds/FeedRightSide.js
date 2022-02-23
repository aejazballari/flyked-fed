/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FlBox, FlCircularProgress, FlTypography } from '../../elements';
import LoginCard from '../../containers/profile/signUpAuthentication/loginCard';
// import { GET_SUGGESTED_PAGES } from '../../actions/feedAction';
import * as feedAction from '../../actions/feedAction';
import SuggestedCardWeb from '../commonComponents/SuggestedCardWeb';
import { retrieveLocalStorage } from '../../services/storageServices';

function FeedRightSide() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isUserLogin = retrieveLocalStorage('userLogin');
  const suggestedPages = useSelector((state) => state.feeds.suggestedPages);
  const [suggestedLoader, setSuggestedLoader] = useState(false);

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

  const refresh = () => {
    dispatch(feedAction.getSuggestedPages(() => setSuggestedLoader(false)));
  };

  useEffect(() => {
    if (!suggestedPages?.data || suggestedPages?.data?.length === 0) {
      setSuggestedLoader(true);
      // dispatch(feedAction.getSuggestedPages(() => setSuggestedLoader(false)));
      refresh();
    }
  }, [isUserLogin]);

  const LoaderComponent = () => (
    <div style={{
      display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <FlCircularProgress />
    </div>
  );

  return (
    <FlBox>
      <div style={{ display: isUserLogin ? 'none' : '' }}>
        <LoginCard />
      </div>
      <div style={{ marginLeft: '30px' }}>
        <FlTypography style={{
          fontWeight: 600, fontSize: '14px', lineHeight: '17px', color: '#888F9D', marginBottom: '20px',
        }}
        >
          {suggestedPages?.message}
        </FlTypography>
        <FlBox style={{ height: isUserLogin ? 'calc(100vh - 120px)' : 'calc(100vh - 420px)', overflowY: 'scroll' }}>
          { suggestedLoader ? <LoaderComponent />
            : suggestedPages?.data?.length > 0 ? suggestedPages?.data?.map((item) => (
              <FlBox key={item._id}>
                <SuggestedCardWeb
                  message={suggestedPages?.message}
                  pageName={item.title}
                  postsCount={item.postCount}
                  followers={item.followerCount}
                  image={item.image}
                  key={item._id}
                  goToPage={goToPage}
                  url={item.url}
                  id={item._id}
                  refresh={refresh}
                  selectedPageId={location?.state?.pageid || ''}
                />
              </FlBox>
            )) : (
              <FlTypography>
                No suggested pages
              </FlTypography>
            )}
        </FlBox>
      </div>
    </FlBox>
  );
}

export default FeedRightSide;
