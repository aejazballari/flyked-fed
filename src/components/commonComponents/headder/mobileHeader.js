/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
// import UserIcon from '../../../assets/userPrimary.svg';
import {
  FlTypography,
  FlButton,
  FlDrawer,
  FlDivider,
  FlList,
  FlListItem,
  // FlListItemIcon,
  // FlListItemText,
  FlGrid,
  FlAvatar,
  FlIconButton,
  FlBox,
  FlMakeStyles,
} from '../../../elements';
import { retrieveLocalStorage } from '../../../services/storageServices';
import FlykedICon from '../../../assets/FlykedLogo.svg';
import LogoutIcon from '../../../assets/Logout.svg';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import { logout } from '../../../config/firebase';
import NavFeadsList from './navBarList';
// import { FEED_TYPE_SELECTED } from '../../../actions/postAction';
// import FlDropdownWithImage from '../../../elements/FlDropdownWithImage';
import * as postAction from '../../../actions/postAction';
import * as feedAction from '../../../actions/feedAction';
import { GET_SUGGESTED_PAGES } from '../../../actions/feedAction';
import Tick from '../../../assets/tick.svg';

const useStyles = FlMakeStyles(() => ({
  selected: {
    color: '#f1846b',
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: '21px',
    letterSpacing: '0.02em',
  },

  feedList: {
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    color: '#172849',
  },

  text: {
    fontSize: '1rem',
    lineHeight: '17px',
    color: '172849',
    paddingLeft: '10px',
  },

  selectedText: {
    fontSize: '1rem',
    lineHeight: '17px',
    color: '#EF613B',
    fontWeight: 600,
    paddingLeft: '10px',
  },

  category: {
  },

  selectedCategory: {
    // background: '#EF613B',
    color: '#EF613B',
  },
  drawerPaper: {
    width: '100%',
  },
}));

const MobileHeader = ({
  open, handleDrawerClose, classes, theme,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();
  const { setAlert } = useContext(AlertNotificationContext);
  const profileCard = useSelector((state) => state.profile.userDetails);
  const list = useSelector((state) => state.category.categories);
  const categoryIds = useSelector((state) => state.feeds.categoryIds);
  const selectedFeed = useSelector((state) => state.post.element);
  const birthdayFeeds = useSelector((state) => state?.feeds.birthdayList);
  const thisDayFeeds = useSelector((state) => state?.feeds.thisDayList);
  const newsList = useSelector((state) => state?.feeds.inNews?.results);
  // const feedTypeSelected = useSelector((state) => state?.post?.feedTypeSelected);
  const [user, setUser] = useState(profileCard);
  // const [selectedFeed, setSelectedFeed] = useState('feed');
  const isUserLogin = retrieveLocalStorage('userLogin');
  useEffect(() => {
    setUser(profileCard);
  }, [profileCard]);

  // const handleChange = (value) => {
  //   setSelected(value);
  // };

  const handleCategoryId = (id) => {
    dispatch(feedAction.categoryFeeds(id));
    dispatch(postAction.scrollToView('feed'));
    handleDrawerClose();
  };

  return (
    <FlDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <FlGrid container alignItems="center" justifyContent="space-between" className={classes.drawerHeader}>
        <FlTypography variant="h6" className={classes.title}>
          <Link className={classes.primaryColor} to="/">
            <img
              src={FlykedICon}
              alt="Logo"
              style={{ height: '20px', objectFit: 'contain', marginLeft: '10px' }}
              onClick={() => {
                // window.scrollTo(0, 0);
                dispatch(postAction.scrollToView('feed'));
              }}
            />
          </Link>
        </FlTypography>
        <FlIconButton size="small" onClick={handleDrawerClose} style={{ textAlign: 'right', background: '#E3E5E8', borderRadius: '4px' }}>
          {theme.direction === 'ltr' ? <ClearIcon style={{ color: '#172849', padding: '3px', fontSize: '20px' }} /> : <ChevronRightIcon />}
        </FlIconButton>
        {/* <FlIconButton >
        <img
                    src={navSelected === 'search' ? SearchSelectedIcon : SearchIcon}
                    alt="Search"
                    style={{
                      height: '24px',
                      objectFit: 'contain',
                      aspectRatio: '1/1',
                    }}
                  />
        </FlIconButton> */}
      </FlGrid>
      <FlDivider />
      <FlList>
        {NavFeadsList?.map((item, index) => (
          <FlListItem
            button
            key={item?.id}
            disabled={(index === 1 && birthdayFeeds?.length === 0) || (index === 2 && thisDayFeeds?.length === 0) || (index === 3 && newsList?.length === 0)}
          >
            <FlGrid
              container
              justifyContent="flex-start"
              alignItems="center"
              style={{ margin: '.2rem 0' }}
              onClick={() => {
                handleDrawerClose();
                if (history.location.pathname !== '/') {
                  history.push('/');
                  setTimeout(() => {
                    dispatch(postAction.scrollToView(item.key));
                    // setSelectedFeed(item.key);
                  }, 500);
                  return;
                }
                dispatch(postAction.scrollToView(item.key));
                if (selectedFeed === item.key) {
                  dispatch(postAction.scrollToView(''));
                  setTimeout(() => dispatch(postAction.scrollToView(item.key)), 0);
                }
              }}
            >
              <img src={selectedFeed === item?.key ? item?.selectedIcon : item?.icon} alt="icon" height="16" width="16" />
              &nbsp;&nbsp;&nbsp;
              <span className={selectedFeed === item?.key ? classes.selected : classes.feedList} style={{ fontSize: '1.1rem' }}>{isUserLogin ? item.name : item.mName}</span>
            </FlGrid>
          </FlListItem>
        ))}
      </FlList>
      <FlDivider />
      <FlGrid container style={{ width: '100%', margin: '0 auto' }} item>
        <FlListItem button key="1">
          <FlGrid
            container
            justifyContent="flex-start"
            alignItems="center"
            style={{
              margin: '.2rem 0',
              // color: location.pathname === '/settings/terms_and_conditions' ? '#EF613B' : '#172849',
            }}
            onClick={() => {
              handleDrawerClose();
              history.push('/settings/terms_and_conditions');
            }}
          >
            Terms & Conditions
          </FlGrid>
        </FlListItem>
        <FlListItem button key="1">
          <FlGrid
            container
            justifyContent="flex-start"
            alignItems="center"
            style={{ margin: '.2rem 0' }}
            onClick={() => {
              handleDrawerClose();
              history.push('/settings/privacy_policy');
            }}
          >
            Privacy Policy
          </FlGrid>
        </FlListItem>
      </FlGrid>
      <FlDivider />
      <FlGrid container style={{ width: '100%', margin: '0 auto' }} item>
        {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <FlInputBase
              placeholder="Search here…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
        {/* <FlDropdownWithImage
          open={open}
          list={list}
          selected={selected}
          onChange={handleChange}
        /> */}
        <FlBox style={{ width: '100%' }}>
          <FlTypography style={{
            fontSize: '1rem', lineHeight: '17px', color: '#4D586F', margin: '20px 20px 10px 20px',
          }}
          >
            Category
          </FlTypography>
          <FlBox style={{
            height: isUserLogin ? 'calc(100vh - 432px)' : 'calc(100vh - 376px)', overflowY: 'scroll', width: '100%', overflowX: 'hidden',
          }}
          >
            {list.map((item, index) => (
              <FlBox
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                style={{
                  width: '100%', margin: '3px 0px', padding: '2px 20px', paddingBottom: (index === list.length - 1) ? '110px' : '0px',
                }}
                key={item.id}
                onClick={() => handleCategoryId(item?._id)}
                className={categoryIds.includes(item?._id) ? styles.selectedCategory : styles.category}
              >
                <FlBox display="flex" alignItems="center">
                  <FlAvatar src={item.image} alt="category-icon" variant="rounded" style={{ width: '48px', height: '48px' }} />
                  <FlTypography className={categoryIds.includes(item?._id) ? styles.selectedText : styles.text}>
                    {item.title}
                  </FlTypography>
                </FlBox>
                {categoryIds.includes(item?._id) && <img src={Tick} alt="tick" />}
              </FlBox>
            ))}
          </FlBox>
        </FlBox>
      </FlGrid>
      {isUserLogin
        ? (
          <div className={classes.drawerFooter}>
            <Link to="/user/profile" className={classes.profileCard}>
              <FlGrid container item md={1} spacing={0} style={{ width: '30%' }}>
                <FlAvatar alt={user?.name} src={user?.profileImage} className={classes.small} />
              </FlGrid>
              <FlGrid container item md={4} spacing={0}>
                <FlTypography className={classes.headerMobileViewProfileIcon} style={{ fontSize: '14px' }}>
                  {user?.name}
                </FlTypography>
              </FlGrid>
            </Link>
            <FlGrid
              container
              item
              md={3}
              spacing={2}
              className={classes.headeMobileViewLogOutButton}
            >
              <FlButton
                size="small"
                variant="text"
                style={{ textTransform: 'capitalize', fontSize: '14px' }}
                onClick={() => {
                  window.localStorage.clear();
                  logout();
                  handleDrawerClose();
                  history.push('/');
                  setAlert('success', 'Successfully logged out');
                  dispatch({ type: GET_SUGGESTED_PAGES, payload: [] });
                }}
              >
                <img src={LogoutIcon} alt="Logo" style={{ height: '15px', objectFit: 'contain', paddingRight: '8px' }} />
                Logout
              </FlButton>
            </FlGrid>
          </div>
        ) : null}
    </FlDrawer>
  );
};

MobileHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
};

export default MobileHeader;
