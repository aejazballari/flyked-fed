/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router-dom';
import {
  FlAppBar, FlGrid, FlIconButton, FlMakeStyles, FlToolbar, FlTypography,
} from '.';

const useStyles = FlMakeStyles((theme) => ({
  title: {
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  primaryColor: {
    color: '#f1846b',
  },
}));

const FlBreadCrumb = ({ pageName }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <FlAppBar position="fixed" color="inherit" className="header_block">
        <FlToolbar className="container" style={{ paddingLeft: '0px' }}>
          <FlIconButton onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </FlIconButton>
          <FlGrid container item md={3} spacing={2}>
            <FlTypography variant="h4" className={classes.title}>
              {pageName}
            </FlTypography>
          </FlGrid>
        </FlToolbar>
      </FlAppBar>
    </>
  );
};

export default FlBreadCrumb;

FlBreadCrumb.propTypes = {
  pageName: PropTypes.string.isRequired,
};
