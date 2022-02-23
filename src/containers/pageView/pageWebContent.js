/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  FlBox,
  FlDivider,
  FlMakeStyles, FlTypography,
} from '../../elements';
import PagePosts from './pagePosts';
import AddIcon from '../../assets/AddIcon.svg';
import PostClear from '../createPosts/clearPostData';
import { POST_ROUTE_FROM, POST_PAGE_SELECTED } from '../../actions/postAction';
import { retrieveLocalStorage } from '../../services/storageServices';

const useStyles = FlMakeStyles(() => ({
  heading: {
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  createBox: {
    marginTop: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    cursor: 'pointer',
  },
}));

const PageWebContent = ({ pageId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const pageDetails = useSelector((state) => state?.page?.pageDetails);
  const isUserLogin = retrieveLocalStorage('userLogin');

  const handleCreatePost = () => {
    PostClear(dispatch);
    dispatch({ type: POST_ROUTE_FROM, payload: 'pageDetail' });
    dispatch({ type: POST_PAGE_SELECTED, payload: pageDetails });
    history.push('/post/create');
  };
  return (
    <>
      <FlTypography className={classes.heading}>
        Posts
      </FlTypography>
      <FlDivider />
      <div style={{ paddingBottom: '15px' }}>
        <FlBox style={{ display: !isUserLogin ? 'none' : '' }} className={classes.createBox} onClick={() => handleCreatePost()}>
          <img
            src={AddIcon}
            alt="add post"
            style={{
              paddingRight: '10px',
              height: '14px',
              objectFit: 'contain',
              aspectRatio: '1/1',
            }}
          />
          <FlTypography style={{ color: '#172849', fontSize: '14px', paddingTop: '5px' }}>
            Add Post
          </FlTypography>
        </FlBox>
      </div>
      <PagePosts type="Feeds" pageId={pageId} />
    </>
  );
};

export default PageWebContent;

PageWebContent.propTypes = {
  pageId: PropTypes.string.isRequired,
};
