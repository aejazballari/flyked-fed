/* eslint-disable linebreak-style */
import React from 'react';
import { useHistory } from 'react-router-dom';
import NavList from './NavList';
import CategoryList from './CategoryList';

const FeedLeftSide = () => {
  const history = useHistory();
  return (
    <>
      <NavList />
      {
      history?.location?.pathname === '/' ? <CategoryList /> : null
     }
    </>
  );
};

export default FeedLeftSide;
