/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import '../profileCard.css';
import { useHistory } from 'react-router-dom';
import { retrieveLocalStorage } from '../../../services/storageServices';
import HomeLayout from '../../../layouts/homeLayout';
import PageMetaTags from '../../../elements/pageMetaTags';
import {
  FlButton, FlCard, FlCircularProgress, FlGrid, FlMakeStyles,
} from '../../../elements';
import ProfileCardHeader from './profileCardHeader';
import ProfileCardTabs from '../../../components/profile/profileCardTabs';
import SettingsIcon from '../../../assets/settingsIcon.svg';
import Settings from '../../../assets/Settings.svg';
import * as profileAction from '../../../actions/profileAction';

const useStyles = FlMakeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      position: 'inherit',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px !important',
    },
  },
  settingIcon: {
    position: 'absolute',
    top: 30,
    right: 10,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: 10,
      right: 0,
      zIndex: 9999,
      position: 'fixed',
    },
  },
}));

const ProfileCard = () => {
  const classes = useStyles();
  const isUserLogin = retrieveLocalStorage('userLogin');
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const userDetails = useSelector((state) => state.profile.userDetails);
  const footer = true;

  useEffect(() => {
    dispatch(profileAction.viewProfile());
  }, []);

  const refresh = () => {
    dispatch(profileAction.viewProfile());
  };

  return (
    <HomeLayout pageName="My Profile" footer={footer}>
      <div className="profile-card-main">
        <PageMetaTags title="Flyked - Profile" image="" description="Profile" currentUrl={window?.location?.href || ''} />
        { !userDetails?.name
          ? (
            <div style={{
              height: '6rem',
              overflow: 'hidden',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <FlCircularProgress />
            </div>
          )
          : isUserLogin
            ? (
              <FlGrid container justifyContent="center" align="center" style={{ paddingTop: isMobile ? '0px !important' : '' }}>
                <FlGrid style={{ width: '100%' }}>
                  <FlGrid item className="card_details">
                    <FlCard className={`${classes.root} profile`} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                      <ProfileCardHeader
                        userDetails={userDetails}
                        refresh={refresh}
                      />
                      <div className={classes.settingIcon}>
                        <FlButton aria-label="Update Profile" className={classes.settingBtn} onClick={() => history.push('/user/updateView')}>
                          {
                      isMobile
                        ? <img src={SettingsIcon} alt="settings Icon" style={{ height: '20px', objectFit: 'contain', aspectRatio: '1/1' }} />
                        : <img src={Settings} alt="settings Icon" style={{ height: '25px', objectFit: 'contain', aspectRation: '1/1' }} />
                    }
                        </FlButton>
                      </div>
                    </FlCard>
                    {userDetails?._id ? (
                      <div>
                        <ProfileCardTabs
                          userId={userDetails._id}
                          followers={parseInt(userDetails?.followerCount, 10) || parseInt('0', 10)}
                          following={parseInt(userDetails?.followingCount, 10) || parseInt('0', 10)}
                          refresh={refresh}
                        />
                      </div>
                    ) : null}
                  </FlGrid>
                </FlGrid>
              </FlGrid>
            )
            : null}
      </div>
    </HomeLayout>
  );
};

export default ProfileCard;
