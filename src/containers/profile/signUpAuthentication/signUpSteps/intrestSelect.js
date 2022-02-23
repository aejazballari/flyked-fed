/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWithLoader from '../../../../elements/buttonWithLoader';
import { AlertNotificationContext } from '../../../../elements/alert-notfication/alertState';
import './style.css';
import { SELECTED_INTREST } from '../../../../actions/authAction';
import * as authAction from '../../../../actions/authAction';
import { FlGrid, FlTypography } from '../../../../elements/index';

const IntrestSelect = () => {
  const { setAlert } = useContext(AlertNotificationContext);
  const history = useHistory();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const dispatch = useDispatch();
  const intrestList = useSelector((state) => state.auth.intrestList);
  const selectedIntrest = useSelector((state) => state.auth.selectedIntrest);
  const loading = useSelector((state) => state.auth.loading);

  const handelSelect = (option) => {
    const currentIndex = selectedIntrest.indexOf(option);
    const newChecked = [...selectedIntrest];
    if (currentIndex === -1) {
      newChecked.push(option);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch({ type: SELECTED_INTREST, payload: newChecked });
  };

  function setBackgroundUrl(url) {
    return `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${url})`;
  }

  return (
    <FlGrid container spacing={1} className="intrest-select-main-card">
      <FlGrid item md={12} xs={12}>
        <FlTypography className="intrest-select-card-title">Just a step ahead</FlTypography>
      </FlGrid>
      <FlGrid item md={12} xs={12}>
        <FlTypography className="intrest-select-card-sub-title">Select your interests</FlTypography>
      </FlGrid>
      <FlGrid item md={12} xs={12}>
        <FlTypography className="intrest-select-card-sub-sub-title">Select minimum 3 interests</FlTypography>
      </FlGrid>
      <FlGrid item md={12} xs={12} className="intrest-select-card-list-main">
        <FlGrid container spacing={2}>
          {intrestList?.map((item) => (
            <FlGrid item md={3} sm={3} xs={6} key={item?._id}>
              <FlGrid container spacing={2} style={{ padding: '8px' }}>
                <FlGrid
                  item
                  md={12}
                  xs={12}
                  onClick={() => handelSelect(item?._id)}
                  className={selectedIntrest.indexOf(item?._id) !== -1 ? 'intrest-select-card-item-list-selected' : 'intrest-select-card-item-list'}
                  style={{
                    background: setBackgroundUrl(item?.image || ''),
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {selectedIntrest.indexOf(item?._id) !== -1 ? <CheckIcon size="small" className="intrest-select-card-selected-icon" /> : ''}
                  <FlGrid container>
                    <FlGrid item md={12} xs={12}>
                      <FlTypography className="intrest-select-card-list-lables">{item?.title || ''}</FlTypography>
                    </FlGrid>
                  </FlGrid>
                </FlGrid>
              </FlGrid>
            </FlGrid>
          ))}
        </FlGrid>
      </FlGrid>
      <FlGrid item md={12} xs={12} className="intrest-select-card-confirm-button-div">
        <ButtonWithLoader loading={loading} onClick={() => dispatch(authAction.updateSelectedIntrest(selectedIntrest, setAlert, history))} disabled={selectedIntrest?.length < 3 || loading} variant="contained" color="primary" className="intrest-select-confirm-button" fullWidth={isMobile} style={{ display: isMobile && selectedIntrest?.length < 3 ? 'none' : '' }}>
          <FlTypography className="intrest-select-card-button">Continue</FlTypography>
        </ButtonWithLoader>
      </FlGrid>
    </FlGrid>
  );
};

export default IntrestSelect;
