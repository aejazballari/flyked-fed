/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import debounce from 'lodash/debounce';
import { Link, useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserIcon from '../../../assets/UserPrimary.svg';
import { logout } from '../../../config/firebase';
import {
  FlAppBar,
  FlToolbar,
  FlTypography,
  FlIconButton,
  FlGrid,
  FlInputBase,
  FlButton,
  FlAvatar,
  FlClickAwayListener,
  FlGrow,
  FlPopper,
  FlPaper,
  FlMenuList,
  FlMenuItem,
  FlCircularProgress,
} from '../../../elements';
import FlykedICon from '../../../assets/FlykedLogo.svg';
import styles from './header.style';
import MobileHeader from './mobileHeader';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import { retrieveLocalStorage } from '../../../services/storageServices';
import * as profileAction from '../../../actions/profileAction';
import * as postAction from '../../../actions/postAction';
import * as pageAction from '../../../actions/pageAction';
import * as authAction from '../../../actions/authAction';
import { GET_SUGGESTED_PAGES } from '../../../actions/feedAction';
import FlPageList from '../../../elements/FlPageList';
import PostClear from '../../../containers/createPosts/clearPostData';

const Header = () => {
  const searchField = useRef(null);
  const { setAlert } = useContext(AlertNotificationContext);
  const user = useSelector((state) => state.profile.userDetails);
  const dispatch = useDispatch();
  const classes = styles();
  const [open, setOpen] = useState(false);
  // const [user, setUser] = useState(profileDetails);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const history = useHistory();
  const isUserLogin = retrieveLocalStorage('userLogin');
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [loader, setLoader] = useState(false);
  const searchText = useSelector((state) => state.page.pageSearchText);
  const list = useSelector((state) => state.page.pageList);
  const totalResults = useSelector((state) => state.page.totalResults);
  const hasNextPage = useSelector((state) => state.page.hasNextPage);
  const nextPage = useSelector((state) => state.page.nextPage);
  const [morefeeds, setMoreFeeds] = useState(true);
  // const [list, setList] = useState(pageList);
  let dropdown = null;

  useEffect(() => {
    if (isUserLogin && user?.name === undefined) {
      dispatch(profileAction.viewProfile());
    }
  }, [isUserLogin]);

  useEffect(() => {
    if (searchDropdown) {
      dispatch(
        pageAction.getSearchPageResults(searchText, 1, () => setLoader(false)),
      );
    }
  }, [searchText]);

  // useEffect(() => {
  //   setList(pageList);
  // }, [pageList]);

  // if (loader) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh',
  //       }}
  //     >
  //       Loading..
  //     </div>
  //   );
  // }

  const sendQuery = (value) => {
    dispatch(pageAction.searchPage(value));
  };

  const search = useCallback(debounce(sendQuery, 500), []);

  const searchResults = (value) => {
    search(value);
  };

  const fetchNextPages = () => {
    if (hasNextPage && searchDropdown) {
      dispatch(pageAction.getSearchPageResults(searchText, nextPage));
    } else {
      setMoreFeeds(false);
    }
  };

  // useEffect(() => {
  //   setUser(profileCard);
  // }, [profileCard]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseDropdown = () => {
    setTimeout(() => {
      setSearchDropdown(false);
    }, 400);
  };

  const handleInputClick = () => {
    if (isMobile) {
      history.push('/page/search');
    } else {
      setSearchDropdown(true);
      // setLoader(true);
      dispatch(
        pageAction.getSearchPageResults(searchText, 1, () => setLoader(false)),
      );
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (dropdown.current && dropdown.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    }
  };

  const Logo = () => (
    <FlTypography variant="h4" className={classes.title}>
      <Link className={classes.primaryColor} to="/">
        <img
          src={FlykedICon}
          alt="Logo"
          style={{ aspectRatio: '4/1', height: '20px', objectFit: 'contain' }}
          onClick={() => {
            // window.scrollTo(0, 0);
            dispatch(postAction.scrollToView('feed'));
          }}
        />
      </Link>
    </FlTypography>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    logout();
    history.push('/');
    dispatch({ type: GET_SUGGESTED_PAGES, payload: [] });
    dispatch(postAction.scrollToView('feed'));
    setAlert('success', 'Successfully logged out');
  };

  const MobileHead = () => (
    <FlGrid container spacing={2} justifyContent="space-between" alignItems="center">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FlIconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </FlIconButton>
        {Logo()}
      </div>
      {!isUserLogin && (
      <FlIconButton onClick={() => dispatch(authAction.OpenLoginModel())}>
        <img
          src={UserIcon}
          alt="user"
          style={{
            height: '17px',
            objectFit: 'contain',
          }}
        />
      </FlIconButton>
      )}
    </FlGrid>
  );

  const handleRedirect = (e) => {
    if (isUserLogin) {
      history.push('/page/create');
    } else {
      e.preventDefault();
      setAlert('error', 'Login or SignUp Required!');
      dispatch(authAction?.OpenLoginModel());
    }
  };

  const DeskTopHeader = () => (
    <FlGrid container justifyContent="center" alignItems="center" spacing={2} style={{ height: '64px' }}>
      <FlGrid item md={4} xs={6} style={{ textAlign: 'center' }}>
        {Logo()}
      </FlGrid>
      <FlGrid item md={4} xs={6}>
        <FlGrid container alignItems="center" className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon style={{ color: '#EF613B' }} />
          </div>
          <FlInputBase
            defaultValue={searchText}
            ref={searchField}
            placeholder="Search here…"
            classes={{
              root: classes.inputRoot,
              input: classes.searchInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            // onFocus={handleInputClick}
            onChange={(e) => searchResults(e.target.value)}
            onBlur={handleCloseDropdown}
            onClick={handleInputClick}
          />
          <div style={{ display: searchDropdown ? '' : 'none' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0px 2px 1px 1px #e8e9ec',
                position: 'fixed',
                top: '4rem',
                left: '35%',
                width: '30vw',
                maxHeight: '60vh',
                height: 'auto',
                minHeight: '80px',
                padding: '0px 10px',
              }}
            >
              {list && totalResults < 1 ? (
                <FlTypography
                  style={{
                    marginLeft: '1rem',
                    marginTop: '1rem',
                    fontSize: '13px',
                  }}
                >
                  Page Not Found!
                </FlTypography>
              ) : (
                <div className={classes.dropdownItem} id="searchResults">
                  <InfiniteScroll
                    scrollableTarget="searchResults"
                    style={{ overflowY: 'hidden', marginBottom: '3rem' }}
                    dataLength={list?.length}
                    next={fetchNextPages}
                    hasMore={morefeeds}
                    loader={(
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <FlCircularProgress />
                      </div>
                    )}
                    endMessage={(
                      <p style={{ textAlign: 'center', fontSize: '11px' }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    )}
                    // below props only for pull down functionality
                    // refreshFunction={refresh}
                    // pullDownToRefresh
                    // pullDownToRefreshThreshold={50}
                    // pullDownToRefreshContent={
                    //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    // }
                    // releaseToRefreshContent={
                    //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    // }
                  >
                    {list?.map((page) => (
                      <FlPageList
                        key={page?._id}
                        id={page?._id}
                        title={page?.title}
                        url={page?.url}
                        image={page?.image}
                        postCount={page.postCount ? page.postCount : parseInt('0', 10)}
                        followerCount={
                          page.followerCount ? page.followerCount : parseInt('0', 10)
                        }
                      />
                    ))}
                  </InfiniteScroll>
                </div>
              )}
              <FlTypography variant="h5" className={classes.bottomText}>
                Can&#39;t find a Page?
                <Link to="/page/create" className={classes.linkText} onClick={(e) => handleRedirect(e)}>
                  <span>&nbsp;Create a Page.</span>
                </Link>
              </FlTypography>
            </div>
          </div>
        </FlGrid>
      </FlGrid>
      <FlGrid item md={4} xs={6}>
        {isUserLogin ? (
          <FlGrid container justifyContent="space-evenly">
            <FlIconButton
              onClick={() => {
                PostClear(dispatch);
                history.push('/post/create');
              }}
              size="small"
              className={classes.headderIconButtons}
            >
              <AddIcon />
            </FlIconButton>
            <FlIconButton size="small" className={classes.headderIconButtons}>
              <NotificationsNoneOutlinedIcon />
            </FlIconButton>
            <FlGrid item md={8} xs={4} className={classes.profileInfo}>
              <FlAvatar
                alt={user?.name}
                src={user?.profileImage}
                className={classes.small}
              />
              <FlTypography
                className={classes.profileCardName}
                ref={(div) => {
                  dropdown = div;
                }}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {user?.name}
              </FlTypography>
              <KeyboardArrowDownIcon
                ref={(div) => {
                  dropdown = div;
                }}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.headerProfileMenuArrowIcon}
              />
              {open
                ? (
                  <FlPopper
                    open={open}
                    anchorEl={dropdown?.current}
                    role={undefined}
                    transition
                    disablePortal
                    className={classes.dropdownDiv}
                  >
                    {({ TransitionProps }) => (
                      <FlGrow {...TransitionProps}>
                        <FlPaper>
                          <FlClickAwayListener onClickAway={handleClose}>
                            <FlMenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              className={classes.menuDropdown}
                              onKeyDown={handleListKeyDown}
                            >
                              <Link to="/user/profile" className={classes.link}>
                                <FlMenuItem
                                  onClick={() => {
                                    dispatch(postAction.postType('Feeds'));
                                    handleClose();
                                  }}
                                  style={{ backgroundColor: '#ffffff' }}
                                >
                                  Profile
                                </FlMenuItem>
                              </Link>
                              <FlMenuItem
                                style={{ backgroundColor: '#ffffff' }}
                                className={classes.link}
                                onClick={() => {
                                  handleClose();
                                  history.push('/settings/terms_and_conditions');
                                }}
                              >
                                Terms & Conditions
                              </FlMenuItem>
                              <FlMenuItem
                                style={{ backgroundColor: '#ffffff' }}
                                className={classes.link}
                                onClick={() => {
                                  handleClose();
                                  history.push('/settings/privacy_policy');
                                }}
                              >
                                Privacy Policy
                              </FlMenuItem>
                              <FlMenuItem
                                style={{ backgroundColor: '#ffffff' }}
                                className={classes.link}
                                onClick={() => {
                                  handleClose();
                                  handleLogout();
                                }}
                              >
                                Logout
                              </FlMenuItem>
                            </FlMenuList>
                          </FlClickAwayListener>
                        </FlPaper>
                      </FlGrow>
                    )}
                  </FlPopper>
                )
                : null}
            </FlGrid>
          </FlGrid>
        ) : (
          <FlGrid container style={{ textAlign: 'right' }}>
            <FlGrid item md={window.innerWidth > 1400 ? 9 : 12} xs={12}>
              <FlButton
                variant="contained"
                color="primary"
                className={classes.label}
                onClick={() => {
                  dispatch(authAction?.OpenLoginModel());
                }}
              >
                Sign up
              </FlButton>
            </FlGrid>
          </FlGrid>
        )}
      </FlGrid>
    </FlGrid>
  );

  return (
    <>
      <FlAppBar
        color="inherit"
        // className="header_block"
        style={{
          height: isMobile ? '56px' : '64px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
        // style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
      >
        <FlToolbar>
          {isMobile ? MobileHead() : DeskTopHeader()}
        </FlToolbar>
      </FlAppBar>
      {isMobile ? (
        <>
          <MobileHeader
            open={open}
            handleDrawerClose={handleDrawerClose}
            classes={classes}
            theme={theme}
          />
        </>
      ) : null}
    </>
  );
};

export default Header;
