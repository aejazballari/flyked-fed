/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import LandingMobileView from '../../components/feeds/LandingMobileView';
import { retrieveLocalStorage } from '../../services/storageServices';
import * as categoryAction from '../../actions/categoryAction';

function categoriesMobileList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const categoryList = useSelector((state) => state.category.categories);
  const feedElement = useSelector((state) => state?.post?.scroll.feed);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const allCategories = ['all', ...new Set(categoryList.map((item) => item.title))];
  const isUserLogin = retrieveLocalStorage('userLogin');

  useEffect(() => {
    if (categoryList?.length === 0) {
      dispatch(categoryAction.getCategories(() => {}));
    }
  }, [categoryList]);

  return (
    <div id={isMobile ? feedElement : null} style={{ padding: '5px' }}>
      <LandingMobileView allCategories={allCategories} isUserLogin={isUserLogin} />
    </div>
  );
}

export default categoriesMobileList;
