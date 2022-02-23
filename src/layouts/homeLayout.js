/* eslint-disable no-dupe-keys */
/* eslint-disable no-nested-ternary */
import React, {
  lazy, Suspense, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Header from '../components/commonComponents/headder';
import Bottombar from '../components/commonComponents/bottomBar';
import FlBreadCrumb from '../elements/FlBreadCrumb';
import { FlGrid } from '../elements';
import './style.css';
import { retrieveLocalStorage } from '../services/storageServices';

const FeedLeftSide = lazy(() => import('../components/feeds/FeedLeftSide/index'));
const FeedRightSide = lazy(() => import('../components/feeds/FeedRightSide'));

const HomeLayout = (props) => {
  const {
    children, footer, header, pageName,
  } = props;
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const isUserLoggedIn = retrieveLocalStorage('userLogin');
  const handleView = () => {
    const bh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${bh}px`);
  };

  handleView();

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('resize', handleView);
    }
    return () => {
      if (isMobile) {
        window.removeEventListener('resize', handleView);
      }
    };
  }, [isUserLoggedIn]);

  return (
    <div>
      {isMobile
        ? pageName
          ? (
            <div className="main-layout-header" style={{ display: !header ? 'none' : '' }}>
              <FlBreadCrumb pageName={pageName} />
            </div>
          )
          : (
            <div className="main-layout-header" style={{ display: !header ? 'none' : '' }}>
              <Header />
            </div>
          )
        : null}
      <div className="main-layout-body">
        <FlGrid container style={{ paddingTop: isMobile ? '2.5rem' : '4rem' }}>
          <FlGrid item md={4} sm={12} xs={12}>
            {!isMobile ? (
              <Suspense fallback={<div style={{ height: '100vh', width: '100%', background: '#f7f7f8' }} />}>
                <FeedLeftSide />
              </Suspense>
            )
              : null}
          </FlGrid>
          {isMobile
            ? (
              <FlGrid
                id="pageInfinateScrollModel"
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  height: isUserLoggedIn ? 'calc(100vh - 112px)' : `calc(${window.innerHeight}px - 56px)`, overflowY: 'scroll', scrollBehavior: 'smooth', paddingBottom: '4rem',
                }}
              >
                {
            children
          }
              </FlGrid>
            )
            : (
              <FlGrid
                id="pageInfinateScrollModel"
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  height: 'calc(100vh - 80px)', overflowY: 'scroll', scrollBehavior: 'smooth', paddingBottom: '4rem',
                }}
              >
                {
            children
          }
              </FlGrid>
            )}
          {isMobile ? null : (
            <FlGrid item md={4} sm={12} xs={12}>
              <Suspense fallback={<div style={{ height: '100vh', width: '100%', background: '#f7f7f8' }} />}>
                <FeedRightSide />
              </Suspense>
            </FlGrid>
          )}
        </FlGrid>
      </div>
      <div className="main-layout-footer" style={{ display: !footer ? 'none' : '' }}>
        {isMobile ? <Bottombar /> : null}
      </div>
    </div>
  );
};

export default HomeLayout;

HomeLayout.defaultProps = {
  header: true,
  pageName: '',
};

HomeLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  footer: PropTypes.bool.isRequired,
  header: PropTypes.bool,
  pageName: PropTypes.string,
};
