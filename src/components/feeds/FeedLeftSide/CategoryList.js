/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import * as postAction from '../../../actions/postAction';
import * as categoryAction from '../../../actions/categoryAction';
import * as feedAction from '../../../actions/feedAction';
import * as postAction from '../../../actions/postAction';
import {
  FlTypography, FlButton, FlBox, FlAvatar, FlMakeStyles,
} from '../../../elements';
import Tick from '../../../assets/tick.svg';

const useStyles = FlMakeStyles(() => ({
  selected: {
    color: '#f1846b',
  },

  text: {
    fontSize: '14px',
    // fontWeight: 600,
    lineHeight: '17px',
    color: '#4D586F',
    paddingLeft: '10px',
  },

  selectedText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: '#EF613B',
    fontWeight: 600,
    paddingLeft: '10px',
  },

  category: {
    padding: '5px 20px',
    cursor: 'pointer',
    margin: '2px',
  },

  selectedCategory: {
    padding: '5px 20px',
    cursor: 'pointer',
    borderRadius: '20px',
    // background: '#EF613B',
    margin: '2px',
  },
}));

function CategoryList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const categoryList = useSelector((state) => state.category.categories);
  const categoryIds = useSelector((state) => state.feeds.categoryIds);
  const [categoryloader, setCategoryLoader] = useState(false);
  const [moreCategory, setMoreCategory] = useState(false);
  const handleShowCategory = () => {
    setMoreCategory(!moreCategory);
  };

  useEffect(() => {
    if (!categoryList || categoryList.length === 0) {
      setCategoryLoader(true);
      dispatch(categoryAction.getCategories(() => setCategoryLoader(false)));
    }
  }, []);

  const showCategory = moreCategory ? categoryList : categoryList?.slice(0, 10);

  const handleCategoryId = (id) => {
    // console.log(id);
    dispatch(feedAction.categoryFeeds(id));
    dispatch(postAction.scrollToView('feed'));
  };
  return (
    <div style={{
      display: 'flex', justifyContent: 'flex-end', marginTop: '20px',
    }}
    >
      <div style={{
        width: '53%', marginRight: '20px', overflowY: 'scroll', height: 'calc(100vh - 325px)', display: window.innerWidth <= 1024 && 'none',
      }}
      >
        {categoryloader ? (
          <div>
            <FlTypography style={{ fontSize: 14, marginLeft: 12 }}>Loading Categories..</FlTypography>
          </div>
        ) : showCategory?.map((item) => (
          <FlBox key={item?._id} className={categoryIds.includes(item?._id) ? classes.selected : ''} onClick={() => handleCategoryId(item?._id)}>
            <FlBox display="flex" alignItems="center" justifyContent="space-between" className={categoryIds.includes(item?._id) ? classes.selectedCategory : classes.category}>
              <FlBox display="flex" alignItems="center">
                <FlAvatar src={item?.image} alt="category-image" variant="rounded" style={{ width: '26px', height: '26px' }} />
                <FlTypography className={categoryIds.includes(item?._id) ? classes.selectedText : classes.text}>
                  {item?.title}
                </FlTypography>
              </FlBox>
              {categoryIds.includes(item?._id) && <img src={Tick} alt="tick" />}
            </FlBox>
          </FlBox>
        ))}
        { categoryList.length > 10
       && (
       <FlButton
         onClick={handleShowCategory}
         style={{
           textTransform: 'capitalize', color: '#888F9D', cursor: 'pointer', display: categoryloader ? 'none' : '', marginLeft: '15px',
         }}
       >
         {moreCategory ? 'show less' : 'show more'}
       </FlButton>
       )}
      </div>
    </div>
  );
}

export default CategoryList;
