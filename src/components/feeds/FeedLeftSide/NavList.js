/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLocalStorage } from '../../../services/storageServices';
import {
  FlTypography, FlButton, FlBox, FlGrid,
} from '../../../elements';
import NavFeadsList from '../../commonComponents/headder/navBarList';
import * as postAction from '../../../actions/postAction';

function NavList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedFeed = useSelector((state) => state.post.element);
  const feedLoader = useSelector((state) => state.post.feedLoader);
  const isUserLogin = retrieveLocalStorage('userLogin');
  const birthdayFeeds = useSelector((state) => state?.feeds.birthdayList);
  const thisDayFeeds = useSelector((state) => state?.feeds.thisDayList);
  const newsList = useSelector((state) => state?.feeds.inNews?.results);

  useEffect(() => {
    // if (window.innerWidth > 1024) {
    //   dispatch(postAction.scrollToView('feed'));
    // }
    if (history.location.pathname !== '/') {
      dispatch(postAction.scrollToView(''));
    }
  }, []);

  return (
    <>
      <div style={window.innerWidth >= 1024 ? { display: 'flex', justifyContent: 'flex-end' } : { display: 'none' }}>
        <div style={{ width: '53%', marginRight: '20px', borderBottom: '1px solid #E3E5E8' }}>
          {NavFeadsList.map((item, index) => (
            <FlBox key={item?.id}>
              <FlButton
                disabled={(index === 1 && birthdayFeeds?.length === 0) || (index === 2 && thisDayFeeds?.length === 0) || (index === 3 && newsList?.length === 0)}
                onClick={() => {
                  if (!feedLoader) {
                    if (history.location.pathname !== '/') {
                      history.push('/');
                      setTimeout(() => {
                        dispatch(postAction.scrollToView(item.key));
                        // setSelectedFeed(item.key);
                      }, 500);

                      return;
                    }
                    // if (item.key === 'birthday') {
                    dispatch(postAction.scrollToView(item.key));
                    if (selectedFeed === item.key) {
                      dispatch(postAction.scrollToView(''));
                      setTimeout(() => dispatch(postAction.scrollToView(item.key)), 0);
                    }
                  }
                }}
                style={selectedFeed === item.key ? {
                  width: '100%', height: '40px', borderRadius: '30px', marginRight: '20px', padding: '20px', background: 'white', marginBottom: '10px', fontSize: '16px', lineHeight: '19px',
                } : {
                  width: '100%', height: '40px', borderRadius: '30px', marginRight: '20px', padding: '20px', marginBottom: '10px', fontSize: '16px', lineHeight: '19px',
                }}
              >
                <FlGrid container direction="row" justifyContent="flex-start" alignItems="center">
                  <span style={{ width: '20px', display: 'line-block' }}>
                    <img
                      style={{ height: '18px', objectFit: 'contain', aspectRatio: '1/1' }}
                      src={selectedFeed === item.key ? item.selectedIcon : item.icon}
                      alt="icon"
                    />
                  </span>
                          &nbsp;&nbsp;
                  <FlTypography style={selectedFeed === item.key ? {
                    textTransform: 'capitalize', color: '#EF613B', fontSize: '16px', lineHeight: '19px',
                  } : { textTransform: 'capitalize', fontSize: '16px', lineHeight: '19px' }}
                  >
                    {isUserLogin ? item.name : item.mName}
                  </FlTypography>
                </FlGrid>
              </FlButton>
            </FlBox>
          ))}
        </div>
      </div>
    </>

  );
}

export default NavList;
