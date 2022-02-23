/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FlTypography, FlBox, FlButton } from '../../elements';
import * as feedAction from '../../actions/feedAction';
import * as postAction from '../../actions/postAction';
import { CLEAR_FILTER } from '../../actions/feedAction';
import styles from '../../containers/landing.module.css';

function LandingMobileView({ isUserLogin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const categoryIds = useSelector((state) => state.feeds.categoryIds);
  const categoryList = useSelector((state) => state.category.categories);
  const handleCategoryId = (id) => {
    dispatch(feedAction.categoryFeeds(id));
    dispatch(postAction.scrollToView('feed'));
  };

  return (
    <FlBox className={styles.mobile}>
      <FlBox display="flex" style={{ overflowX: 'scroll', padding: '10px 5px' }}>
        {
            categoryList.length > 0 && (
            <FlButton
              variant="contained"
              style={{ textTransform: 'capitalize', whiteSpace: 'nowrap', marginRight: '10px' }}
              color={categoryIds.length === 0 ? 'primary' : 'default'}
              onClick={() => dispatch({ type: CLEAR_FILTER, payload: [] })}
            >
              All
            </FlButton>
            )
          }
        {
              categoryList.length > 0 ? categoryList.map((item) => (
                <FlBox style={{ width: '100%', marginRight: '10px' }} key={item?._id}>
                  <FlButton
                    variant="contained"
                    style={{ textTransform: 'capitalize', whiteSpace: 'nowrap', width: '100%' }}
                    onClick={() => handleCategoryId(item?._id)}
                    color={categoryIds.includes(item?._id) ? 'primary' : 'default'}
                  >
                    {item?.title}
                  </FlButton>
                </FlBox>
              )) : <FlTypography style={{ textAlign: 'center', width: '100%' }}> No Categories Found </FlTypography>
            }
      </FlBox>
      { isUserLogin ? (
        <FlTypography style={{
          fontSize: '18px', lineHeight: '21px', fontWeight: 600, padding: '10px', color: '#172849',
        }}
        >
          Your feed
        </FlTypography>
      ) : (
        null
      ) }

    </FlBox>
  );
}

export default LandingMobileView;

LandingMobileView.defaultProps = {
  isUserLogin: false,
};
LandingMobileView.propTypes = {
  isUserLogin: PropTypes.bool,
};
