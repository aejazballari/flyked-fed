/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import DoneIcon from '../../assets/Done.svg';
import PageLayout from '../../layouts/createLayout';
import { PAGR_ROUTE_FROM } from '../../actions/pageAction';
import * as postAction from '../../actions/postAction';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import {
  FlButton, FlCard, FlContainer, FlGrid, FlList, FlListItem, FlMakeStyles, FlTypography, FlAppBar,
} from '../../elements';

const useStyles = FlMakeStyles(() => ({

  btnContainer: {
    padding: '0px',
    margin: '0px',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
  },
  card: {
    marginBottom: '0px',
    padding: '50px 35px',
  },
  heading: {
    fontSize: '15px',
    color: '#1C2121',
    marginTop: '20px',
    marginBottom: '0px',
  },
  title: {
    fontSize: '14px',
  },
  container: {
    paddingTop: '0px !important',
  },
  item: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  btnSection: {
    top: 'auto',
    bottom: 0,
    position: 'relative',
    height: '50px !important',
  },
  successDiv: {
    paddingTop: '45px',
  },
  primary: {
    textAlign: 'center',
    fontSize: '20px',
  },
  secondary: {
    textAlign: 'center',
    color: '#888F9D',
  },
}));

const Success = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const appTheme = useTheme();
  const pageRouteFrom = useSelector((state) => state?.page?.pageRouteFrom);
  const searchValue = useSelector((state) => state?.post?.searchText);
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const footer = false;
  const { setAlert } = useContext(AlertNotificationContext);

  return (
    <>
      <PageLayout pageName="Create Page" footer={footer}>
        {isMobile ? (
          <FlContainer className={classes.successDiv}>
            <FlList>
              <FlListItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={DoneIcon} alt="icon" />
              </FlListItem>
              <FlListItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FlTypography className={classes.primary}>
                  Create Page Request has been submitted
                </FlTypography>
              </FlListItem>
              <FlListItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FlTypography className={classes.secondary}>
                  We'll review and publish the page if it is relevant.
                  You'll get a notification to know about the status.
                </FlTypography>
              </FlListItem>
            </FlList>
          </FlContainer>
        )
          : (
            <FlContainer>
              <FlGrid container spacing={2} style={{ marginTop: '2rem' }}>
                <FlGrid item md={4} xs={3} />
                <FlGrid item md={4} xs={6} className={classes.container}>
                  <FlCard style={{ marginBottom: '10px', marginTop: '90px' }}>
                    <FlGrid container spacing={2} className={classes.card}>
                      <FlGrid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={DoneIcon} alt="icon" style={{ height: '100px', objectFit: 'contain' }} />
                      </FlGrid>
                      <FlGrid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FlTypography className={classes.primary}>
                          Create Page Request has been submitted
                        </FlTypography>
                      </FlGrid>
                      <FlGrid
                        item
                        md={12}
                        xs={12}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingLeft: '4rem',
                          paddingRight: '4rem',
                        }}
                      >
                        <FlTypography className={classes.secondary}>
                          We'll review and publish the page if it is relevant.
                          You'll get a notification to know about the status.
                        </FlTypography>
                      </FlGrid>
                      <FlGrid item md={2} xs={2} />
                      <FlGrid
                        item
                        md={8}
                        xs={8}
                        style={{
                          display: 'flex',
                          justifyContent:
                            'center',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <FlButton
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => {
                            if (pageRouteFrom === 'createPost') {
                              dispatch(postAction.handleSearchPage(searchValue, 1, setAlert));
                              history.push('/post/create');
                              dispatch({ type: PAGR_ROUTE_FROM, payload: '' });
                            } else {
                              history.push('/');
                            }
                          }}
                        >
                          OK
                        </FlButton>
                      </FlGrid>
                      <FlGrid item md={2} xs={2} />
                    </FlGrid>
                  </FlCard>
                </FlGrid>
                <FlGrid item md={4} xs={3} />
              </FlGrid>
            </FlContainer>
          )}
      </PageLayout>
      {isMobile
        ? (
          <FlAppBar position="fixed" color="inherit" className={classes.appBar}>
            <FlGrid container className={classes.btnContainer}>
              <FlGrid item md={12} xs={12}>
                <FlButton
                  style={{ borderRadius: '0px', height: '50px', dislay: 'none' }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (pageRouteFrom === 'createPost') {
                      dispatch(postAction.handleSearchPage(searchValue, 1, setAlert));
                      history.push('/post/create');
                      dispatch({ type: PAGR_ROUTE_FROM, payload: '' });
                    } else {
                      history.push('/page/search');
                    }
                  }}
                >
                  Ok
                </FlButton>
              </FlGrid>
            </FlGrid>
          </FlAppBar>
        )
        : null}
    </>
  );
};

export default Success;
