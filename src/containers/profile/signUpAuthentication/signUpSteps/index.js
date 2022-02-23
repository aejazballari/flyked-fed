/* eslint-disable linebreak-style */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SocialAuth from './sociaAuth';
import ProfileUpdate from './profileUpdate';
import IntrestSelect from './intrestSelect';
import CustomDialog from '../../../../elements/customDialog';
import ImageCrop from './imageCrop';
import PageMetaTags from '../../../../elements/pageMetaTags';
import * as authAction from '../../../../actions/authAction';
import { FlGrid, FlIconButton } from '../../../../elements/index';

const SignUpSteps = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openModel = useSelector((state) => state.auth.openModel);
  const currentStep = useSelector((state) => state.auth.currentStep);
  const viewType = useSelector((state) => state.auth.viewType);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return false;
    }
    if (reason === 'escapeKeyDown') {
      return false;
    }
    dispatch(authAction.CloseLoginModel());
    return true;
  };

  const LoginSteper = (view) => (
    <FlGrid container style={{ padding: '0px', margin: '0px', overflow: 'hidden' }}>
      {viewType !== 'model' && !isMobile ? <FlGrid item md={4} /> : ''}
      {view === 'page' ? <FlGrid item md={12} xs={12} style={{ textAlign: 'right' }}><FlIconButton size="small" onClick={() => history.goBack()}><CloseIcon /></FlIconButton></FlGrid> : null}
      <FlGrid item md={viewType !== 'model' && !isMobile ? 4 : 12} xs={12} style={{ padding: '0px', margin: '0px', overflow: 'hidden' }}>
        {currentStep === 1 ? <SocialAuth /> : ''}
        {currentStep === 2 ? <ProfileUpdate /> : ''}
        {currentStep === 3 ? <IntrestSelect /> : ''}
        {currentStep === 4 ? <ImageCrop /> : ''}
      </FlGrid>
      {viewType !== 'model' && !isMobile ? <FlGrid item md={4} /> : ''}
    </FlGrid>
  );

  return (
    <>
      <PageMetaTags title="Flyked - Home" image="" description="Flyked - Home Page" currentUrl={window?.location?.href || ''} />
      {viewType === 'model' ? (
        <CustomDialog
          handleClose={handleClose}
          open={openModel}
          fullScreen={isMobile}
          hideCloseBtn={currentStep !== 1}
          style={{ borderRadius: isMobile ? '0px' : '10px', width: (parseInt(currentStep, 10) === 1 && !isMobile) ? '382px' : '' }}
        // eslint-disable-next-line no-nested-ternary
          maxWidth={parseInt(currentStep, 10) === 1 ? 'xs' : (parseInt(currentStep, 10) === 2 || parseInt(currentStep, 10) === 4) ? 'sm' : 'md'}
        >
          <FlGrid container style={{ padding: isMobile ? '0px' : '8px 24px' }}>
            {LoginSteper()}
          </FlGrid>
        </CustomDialog>
      ) : null}
    </>
  );
};

export default SignUpSteps;
