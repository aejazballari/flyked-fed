/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React, {
  useCallback, useContext, useRef, useEffect,
} from 'react';
import debounce from 'lodash/debounce';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  FlGrid, FlTypography, FlButton, FlDialog, FlDialogContent, FlDialogTitle, FlSlide, FlDivider,
  FlDialogActions, FlAvatar, FlInputAdornment, FlInput, FlCircularProgress,
} from '../../elements/index';
import ButtonWithLoader from '../../elements/buttonWithLoader';
import {
  SEARCH_TEXT, PAGE_MODEL, POST_PAGE_SELECTED, CURRENT_STEP,
} from '../../actions/postAction';
import { PAGR_ROUTE_FROM } from '../../actions/pageAction';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import * as postAction from '../../actions/postAction';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <FlSlide direction="up" ref={ref} {...props} />);

const PageSelectionModel = () => {
  const appTheme = useTheme();
  const history = useHistory();
  const searchRef = useRef(null);
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const dispatch = useDispatch();
  const { setAlert } = useContext(AlertNotificationContext);
  const postPage = useSelector((state) => state?.post?.postPage);
  const postPageList = useSelector((state) => state?.post?.postPageList);
  const searchValue = useSelector((state) => state?.post?.searchText);
  const openModel = useSelector((state) => state?.post?.openModel);
  const isloading = useSelector((state) => state?.post?.loading);

  const handleSearch = useCallback(debounce((value) => {
    dispatch(postAction.handleSearchPage(value, 1, setAlert));
    dispatch({ type: POST_PAGE_SELECTED, payload: '' });
  }, 500), []);

  const handleSelect = (data) => {
    if (postPage?._id === data?._id) {
      dispatch({ type: POST_PAGE_SELECTED, payload: '' });
    } else if (data) {
      dispatch({ type: POST_PAGE_SELECTED, payload: data });
    }
  };

  const handleTitleId = (value) => `title${value}`;

  useEffect(() => {
    const ids = [];
    if (postPageList?.results?.length > 0) {
      for (let i = 0; i < postPageList?.results?.length; i += 1) {
        const value = `title${postPageList?.results?.[i]?._id}`;
        ids.push(document?.getElementById(value));
      }
    }
    if (ids?.length > 0) {
      for (let i = 0; i < ids?.length; i += 1) {
        const textItem = ids?.[i];
        // const special = /[\\[{().+*?|^$]/g;
        if (textItem) {
          const inputValue = searchValue;
          const regx = new RegExp(inputValue, 'gi');
          textItem.innerHTML = textItem.textContent.replace(regx, '<mark style="color: #EF613B;background: none">$&</mark>');
        }
      }
    }
  }, [postPageList]);

  useEffect(() => {
    if (openModel) {
      setTimeout(() => {
        searchRef.current.focus();
      }, 10);
    }
  }, [searchRef, openModel]);

  const fetchPosts = () => {
    if (postPageList?.hasNextPage) {
      dispatch(postAction.handleSearchPage(searchValue, postPageList?.nextPage,
        setAlert, postPageList?.results));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return false;
    }

    if (reason === 'escapeKeyDown') {
      return false;
    }
    return true;
  };

  return (
    <FlDialog
      open={openModel}
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        style: {
          width: isMobile ? '100%' : '520px',
          maxWidth: isMobile ? '100%' : '520px',
          borderRadius: isMobile ? '20px 20px 0px 0px' : '10px',
          margin: isMobile ? '0px' : '',
          bottom: isMobile ? '0px' : '',
          position: isMobile ? 'absolute' : '',

        },
      }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {isMobile ? <FlDivider className="page-select-model-mobile-top-icon" onClick={() => dispatch({ type: PAGE_MODEL, payload: false })} /> : ''}
      <FlDialogTitle className="page-select-model-header">
        <FlButton variant="text" className="page-select-model-header-label" onClick={() => dispatch({ type: PAGE_MODEL, payload: false })}>
          <ArrowBackIosIcon style={{ color: '#EF613B', display: isMobile ? 'none' : '' }} />
          &nbsp;&nbsp;
          Select a page to post
        </FlButton>
      </FlDialogTitle>
      <FlDialogContent>
        <FlGrid container spacing={2} style={{ marginTop: '10px' }} className="page-select-model-main-content-div">
          <FlGrid item md={12} xs={12}>
            <FlInput
              inputRef={searchRef}
              startAdornment={(
                <FlInputAdornment position="start">
                  <SearchIcon />
                </FlInputAdornment>
              )}
              endAdornment={(
                <FlInputAdornment position="end" style={{ display: !isloading ? 'none' : '' }}>
                  <FlCircularProgress size={20} />
                </FlInputAdornment>
              )}
              disableUnderline
              fullWidth
              placeholder="Search pages..."
              value={searchValue}
              className="page-select-model-search-input-field"
              onChange={(e) => {
                dispatch({ type: SEARCH_TEXT, payload: e.target.value.trimLeft() });
                handleSearch(e.target.value.trimLeft());
              }}
            />
          </FlGrid>
          {postPageList?.results?.length > 0 ? (
            <FlGrid item md={12} xs={12}>
              <FlTypography className="page-select-model-suggested-label">{isMobile && searchRef?.current?.value === '' ? null : 'Suggested pages'}</FlTypography>
            </FlGrid>
          ) : ''}
          <FlGrid item md={12} xs={12} className="page-select-model-page-list-main-div" id="pageInfinateScrollModel">
            <InfiniteScroll
              scrollableTarget="pageInfinateScrollModel"
              dataLength={parseInt(postPageList?.results?.length, 10) || 0}
              style={{ overflow: 'hidden' }}
              next={fetchPosts}
              hasMore={postPageList?.hasNextPage || false}
              endMessage={(
                <p style={{ textAlign: 'center', display: postPageList?.results?.length ? '' : 'none' }}>
                  <b>{isMobile && searchRef?.current?.value === '' ? null : 'Yay! You have seen it all'}</b>
                </p>
                    )}
            >
              <FlGrid container spacing={2} style={{ padding: '0px 5px' }}>
                {isMobile && searchRef?.current?.value === '' ? null : postPageList?.results?.map((item) => (
                  <FlGrid
                    item
                    md={12}
                    xs={12}
                    key={item?._id}
                    onClick={() => handleSelect(item)}
                    style={{
                      backgroundColor: postPage?._id === item?._id ? 'rgba(239, 97, 59, 0.1)' : '', margin: '5px', borderRadius: '5px', cursor: 'pointer', position: 'relative',
                    }}
                  >
                    <FlGrid container spacing={2} justifyContent="space-between" alignItems="center" style={{ padding: '8px' }}>
                      <FlGrid container justifyContent="flex-start" alignItems="center" style={{ width: 'auto' }}>
                        <FlGrid>
                          <FlAvatar src={item?.image} height="40px" width="50px" style={{ backgroundSize: 'cover' }} />
                        </FlGrid>
                        <FlGrid style={{ marginLeft: '10px' }}>
                          <FlTypography title={item?.title} id={handleTitleId(item?._id)} className="page-select-model-list-title">
                            {item?.title}
                          </FlTypography>
                          <FlTypography title={item?.description} className="page-select-model-list-desc">{item?.description}</FlTypography>
                        </FlGrid>
                      </FlGrid>
                      <FlGrid style={{
                        float: 'right', display: postPage?._id === item._id ? '' : 'none', position: 'absolute', right: '10px',
                      }}
                      >
                        <DoneIcon fontSize="small" color="primary" />
                      </FlGrid>
                    </FlGrid>
                  </FlGrid>
                ))}
                {postPageList?.results?.length === 0 && searchValue ? (
                  <FlGrid item md={12} xs={12}>
                    <FlTypography className="page-select-modle-records-not-found-message">
                      <span style={{ color: '#EF613B' }}>{searchValue}</span>
                    &nbsp;Page not found on this search
                    </FlTypography>
                  </FlGrid>
                ) : ''}
              </FlGrid>
            </InfiniteScroll>
          </FlGrid>
          <FlGrid item md={12} xs={12}>
            <FlTypography className="page-select-model-page-footer-label">
              Can’t find a page?
              <FlButton
                onClick={() => {
                  dispatch({ type: PAGR_ROUTE_FROM, payload: 'createPost' });
                  history.push('/page/create');
                }}
                variant="text"
                color="primary"
                className="page-select-model-page-footer-label-link"
              >
                Create a page
              </FlButton>
            </FlTypography>
          </FlGrid>
        </FlGrid>
      </FlDialogContent>
      <FlDialogActions className="page-select-model-footer">
        <ButtonWithLoader
          disabled={isloading || !postPage}
          loading={Boolean(isloading)}
          variant="contained"
          color="primary"
          className="page-select-model-footer-btn"
          onClick={() => {
            dispatch({ type: PAGE_MODEL, payload: false });
            dispatch({ type: CURRENT_STEP, payload: 2 });
          }}
        >
          Preview Post
        </ButtonWithLoader>
      </FlDialogActions>
    </FlDialog>
  );
};

export default PageSelectionModel;
