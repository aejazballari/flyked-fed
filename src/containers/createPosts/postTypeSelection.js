/* eslint-disable linebreak-style */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlButton, FlGrid, FlTypography } from '../../elements/index';
import icons1 from '../../assets/postCategoryIcons/bulbIcon.svg';
import icons2 from '../../assets/postCategoryIcons/birthdayIcon.svg';
import icons3 from '../../assets/postCategoryIcons/calendarIcon.svg';
import icons4 from '../../assets/postCategoryIcons/newsIcon.svg';
import icons5 from '../../assets/postCategoryIcons/bulbIconMobile.svg';
import icons6 from '../../assets/postCategoryIcons/birthdayIconMobile.svg';
import icons7 from '../../assets/postCategoryIcons/calendarIconMobile.svg';
import icons8 from '../../assets/postCategoryIcons/newsIconMobile.svg';

import './style.css';
import { POST_PAGE_TYPE_SELECTED, DATE_OF_BIRTH } from '../../actions/postAction';

const PostTypeSelection = ({ viewType }) => {
  const dispatch = useDispatch();
  const postTypeSelected = useSelector((state) => state?.post?.postTypeSelected);

  const postCategoryList = [
    {
      id: 1, name: 'Facts', icon: icons1, mobileIcon: icons5, key: 'fact',
    },
    {
      id: 2, name: 'Birthday', icon: icons2, mobileIcon: icons6, key: 'onBirthday',
    },
    {
      id: 3, name: 'On this day', icon: icons3, mobileIcon: icons7, key: 'onThisDay',
    },
    {
      id: 4, name: 'In the news', icon: icons4, mobileIcon: icons8, key: 'inNews',
    },
  ];

  function handleRecord(item) {
    dispatch({ type: POST_PAGE_TYPE_SELECTED, payload: item });
    dispatch({ type: DATE_OF_BIRTH, payload: null });
  }

  const mobileVersion = () => (
    <FlGrid item md={12} xs={12} style={{ margin: '20px 0px' }}>
      <FlGrid container spacing={1} alignItems="center" justifyContent="flex-start" style={{ width: '23.5rem' }} className="post-category-select-mobile-view-div">
        {postCategoryList?.map((item) => (
          <FlButton key={item?.id} onClick={() => handleRecord(item)} className="post-step-post-type-btn-mobile" style={postTypeSelected?.id === item?.id ? { color: '#F7F7F8', backgroundColor: '#EF613B' } : { color: '#FFFFFF', backgroundColor: '#4c4c4c' }}>
            <FlGrid container direction="row" justifyContent="center" alignItems="center">
              <img className="post-type-selection-icons-mobile" src={item?.mobileIcon} alt="icons" />
            &nbsp;&nbsp;
              <FlTypography>{item?.name}</FlTypography>
            </FlGrid>
          </FlButton>
        ))}
      </FlGrid>
    </FlGrid>
  );

  const deskTopView = () => (
    <FlGrid item md={12} xs={12} style={{ margin: '10px 0px' }}>
      <FlGrid container className="post-type-selection-main-div-desktop" spacing={2} justifyContent={window.innerWidth > 1400 ? 'center' : 'flex-start'} alignItems="center" style={{ width: window.innerWidth > 1400 ? 'auto' : '50vw', overflowY: 'auto' }}>
        {postCategoryList?.map((item) => (
          <FlButton key={item?.id} onClick={() => handleRecord(item)} className="post-step-post-type-btn" style={postTypeSelected?.id === item?.id ? { color: '#F7F7F8', backgroundColor: '#EF613B' } : { color: '#172849', backgroundColor: '#F7F7F8' }}>
            <FlGrid container direction="row" justifyContent="center" alignItems="center">
              <img className="post-type-selection-icons-desktop" src={postTypeSelected?.id === item?.id ? item?.mobileIcon : item?.icon} alt="icons" />
              &nbsp;&nbsp;
              <FlTypography>{item?.name}</FlTypography>
            </FlGrid>
          </FlButton>
        ))}
      </FlGrid>
    </FlGrid>
  );

  return (viewType === 'desktop' ? deskTopView() : mobileVersion());
};

export default PostTypeSelection;
