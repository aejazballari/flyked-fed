/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLocalStorage } from '../../services/storageServices';
import {
  FlMakeStyles,
  FlAppBar,
  FlToolbar,
  FlGrid,
  FlIconButton,
  // FlButton,
} from '../../elements';
import HomeIcon from '../../assets/homeIcon.svg';
import HomeSelectedIcon from '../../assets/footerIcons/home_selected.svg';
import SearchIcon from '../../assets/Search.svg';
import SearchSelectedIcon from '../../assets/footerIcons/search_selected.svg';
import AddIcon from '../../assets/Add.svg';
import BellIcon from '../../assets/Bell.svg';
import BellSelectedIon from '../../assets/footerIcons/bell_selected.svg';
import UserIcon from '../../assets/user.svg';
import UserSelectedIon from '../../assets/footerIcons/user_selected.svg';
import { NAV_SELECTED } from '../../actions/navBarAction';
import PostClear from '../../containers/createPosts/clearPostData';
import * as postAction from '../../actions/postAction';
// import * as authAction from '../../actions/authAction';

const useStyles = FlMakeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    // backgroundColor: '#FFFFFF',
  },
  primaryColor: {
    color: '#f1846b',
  },
}));

export default function Bottombar() {
  const classes = useStyles();
  const history = useHistory();
  const isUserLogin = retrieveLocalStorage('userLogin');
  const navSelected = useSelector((state) => state?.navBar?.navSelected);
  const dispatch = useDispatch();
  // const { setAlert } = useContext(AlertNotificationContext);

  const location = useLocation();
  useEffect(() => {
    if (location?.pathname === '/page/search' || (location?.pathname?.split('/')?.[2] === 'details' && location?.pathname?.split('/')?.[1] === 'page')) {
      dispatch({ type: NAV_SELECTED, payload: 'search' });
    } else if (location?.pathname === '/user/profile') {
      dispatch({ type: NAV_SELECTED, payload: 'profile' });
    } else if (location?.pathname === '/post/create') {
      dispatch({ type: NAV_SELECTED, payload: 'postCreate' });
    } else {
      dispatch({ type: NAV_SELECTED, payload: 'home' });
    }
  }, [location]);

  return (
    <>
      <FlAppBar position="fixed" color="inherit" className={classes.appBar}>
        {isUserLogin ? (
          <FlToolbar>
            <FlGrid
              container
              item
              md={2}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/" color="inherit">
                <FlIconButton>
                  <img
                    src={navSelected === 'home' ? HomeSelectedIcon : HomeIcon}
                    alt="Home"
                    style={{
                      height: '20px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                    onClick={() => {
                      dispatch(postAction.scrollToView('feed'));
                    }}
                  />
                </FlIconButton>
              </Link>
            </FlGrid>
            <FlGrid
              container
              item
              md={2}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/page/search" color="inherit">
                <FlIconButton>
                  <img
                    src={navSelected === 'search' ? SearchSelectedIcon : SearchIcon}
                    alt="Search"
                    style={{
                      height: '24px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                  />
                </FlIconButton>
              </Link>
            </FlGrid>
            <FlGrid
              container
              item
              md={2}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <>
                <FlIconButton
                  className={classes.primaryColor}
                  onClick={() => {
                    PostClear(dispatch);
                    history.push('/post/create');
                  }}
                >
                  <img
                    src={AddIcon}
                    alt="Create"
                    style={{
                      height: '38px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                  />
                </FlIconButton>
              </>
            </FlGrid>
            <FlGrid
              container
              item
              md={2}
              spacing={3}
              justifyContent="center"
              alignItems="center"
              onClick={() => dispatch({ type: NAV_SELECTED, payload: 'bell' })}
            >
              {/* <Link to="/" color="inherit"> */}
              <FlIconButton>
                <img
                  src={navSelected === 'bell' ? BellSelectedIon : BellIcon}
                  alt="Notification"
                  style={{
                    height: '24px',
                    objectFit: 'contain',
                    aspectRatio: '1/1',
                  }}
                />
              </FlIconButton>
              {/* </Link> */}
            </FlGrid>
            <FlGrid
              container
              item
              md={2}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/user/profile" color="inherit">
                <FlIconButton onClick={() => dispatch(postAction.postType('Feeds'))}>
                  <img
                    src={navSelected === 'profile' ? UserSelectedIon : UserIcon}
                    alt="Profile"
                    style={{
                      height: '17px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                  />
                </FlIconButton>
              </Link>
            </FlGrid>
          </FlToolbar>
        ) : (
          // <FlToolbar style={{
          //   minHeight: '50px', padding: '0px', margin: '0px', width: '100%',
          // }}
          // >
          //   <FlGrid container style={{ padding: '0px', margin: '0px' }}>
          //     <FlGrid item md={12} xs={12}>
          //       <FlButton
          //         style={{ borderRadius: '0px', height: '50px' }}
          //         fullWidth
          //         variant="contained"
          //         color="primary"
          //         onClick={() => dispatch(authAction.OpenLoginModel())}
          //       >
          //         Login / Sign Up
          //       </FlButton>
          //     </FlGrid>
          //   </FlGrid>
          // </FlToolbar>
          null
        ) }
      </FlAppBar>
    </>
  );
}
