/* eslint-disable linebreak-style */
import {
  CURRENT_STEP, POST_IMAGE, POST_TEXT, DATE_OF_BIRTH, POST_ROUTE_FROM, PALLET_COLOR,
  POST_PAGE_SELECTED, POST_PAGE_LIST, POST_PAGE_TYPE_SELECTED, SEARCH_TEXT,
} from '../../actions/postAction';

const PostClear = (dispatch) => {
  dispatch({ type: CURRENT_STEP, payload: 1 });
  dispatch({ type: POST_IMAGE, payload: '' });
  dispatch({ type: POST_TEXT, payload: '' });
  dispatch({ type: POST_PAGE_SELECTED, payload: '' });
  dispatch({ type: POST_PAGE_LIST, payload: '' });
  dispatch({ type: POST_PAGE_TYPE_SELECTED, payload: '' });
  dispatch({ type: SEARCH_TEXT, payload: '' });
  dispatch({ type: DATE_OF_BIRTH, payload: '' });
  dispatch({ type: POST_ROUTE_FROM, payload: '' });
  dispatch({ type: PALLET_COLOR, payload: '' });
};

export default PostClear;
