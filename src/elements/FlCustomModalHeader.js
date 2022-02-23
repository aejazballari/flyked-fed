/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ClearIcon from '@material-ui/icons/Clear';
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

const FlCustomModalHeader = ({ heading, closeModal }) => {
  const classes = useStyles();
  return (
    <FlAppBar
      position="fixed"
      color="inherit"
      className="header_block"
      style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
    >
      <FlToolbar
        className="container"
        style={{ paddingLeft: '0px', minHeight: '56px', paddingRight: '0px' }}
      >
        <FlIconButton>
          <ChevronLeftIcon style={{ display: 'none' }} />
        </FlIconButton>
        <FlGrid container spacing={2}>
          <FlGrid
            item
            md={10}
            xs={10}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <FlTypography variant="h4" className={classes.title}>
              {heading}
            </FlTypography>
          </FlGrid>
          <FlGrid
            item
            md={2}
            xs={2}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            }}
          >
            <FlIconButton onClick={closeModal}>
              <ClearIcon style={{ color: '#172849', padding: '3px', fontSize: '20px' }} />
            </FlIconButton>
          </FlGrid>
        </FlGrid>
      </FlToolbar>
    </FlAppBar>
  );
};

export default FlCustomModalHeader;

FlCustomModalHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
