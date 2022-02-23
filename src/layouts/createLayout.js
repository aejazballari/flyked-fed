/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import PropTypes from 'prop-types';
import Header from '../components/commonComponents/headder';
import Bottombar from '../components/commonComponents/bottomBar';
import './style.css';
import FlBreadCrumb from '../elements/FlBreadCrumb';

const PageLayout = (props) => {
  const {
    children, footer, header, pageName,
  } = props;
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  return (
    <div>
      {/* <div className="main-layout-header" style={{ display: !header ? 'none' : '' }}>
        {isMobile ? <FlBreadCrumb pageName={pageName} /> : <Header />}
      </div> */}
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
        {children}
      </div>
      <div className="main-layout-footer" style={{ display: !footer ? 'none' : '' }}>
        {isMobile ? <Bottombar /> : null}
      </div>
    </div>
  );
};

PageLayout.defaultProps = {
  header: true,
  pageName: '',
};

PageLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  footer: PropTypes.bool.isRequired,
  header: PropTypes.bool,
  pageName: PropTypes.string,
};

export default PageLayout;
