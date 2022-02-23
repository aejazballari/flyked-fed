/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import pageReducer from './pageReducer';
import profileReducer from './profileReducer';
import navReduser from './navReduser';
import postReducer from './postReducer';
import profilePostReducer from './profilePostReducer';
import PagePostReducer from './pagePostReducer';
import feedReducer from './feedReducer';
import FeedPostPreviewReduser from './postFeedsPreviewReduser';

const rootReducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
  post: postReducer,
  profile: profileReducer,
  category: categoryReducer,
  navBar: navReduser,
  profilePost: profilePostReducer,
  pagePost: PagePostReducer,
  feeds: feedReducer,
  feedPreview: FeedPostPreviewReduser,
});

export default rootReducers;
