/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import {
  FlBox, FlDialog, FlDivider, FlMakeStyles, FlSlide,
} from '.';

const Transition = React.forwardRef((props, ref) => <FlSlide direction="up" ref={ref} {...props} />);

const FlBottomDrawer = ({
  open, onClose, children,
}) => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const [drawerHeight, setDrawerHeight] = useState('auto');
  const useStyles = FlMakeStyles(() => ({
    drawerbottom: {
      height: drawerHeight,
      borderTopLeftRadius: '1rem',
      borderTopRightRadius: '1rem',
      overflow: 'hidden',
    },
    drawerBox: {
      padding: '0',
      paddingTop: '1rem',
      minHeight: '15rem',
    },
    drawerBorderIcon: {
      // borderBottom: '3px solid #E6E8E8',
      height: '4px',
      marginTop: '10px',
      width: '60px',
      borderRadius: '9px',
      position: 'absolute',
      background: '#E6E8E8',
      left: '50%',
      right: '50%',
      transform: 'translate(-50%, -50%) !important',
    },
  }));
  const classes = useStyles();

  const handleDrawerHeight = () => {
    if (drawerHeight === '100vh') {
      setDrawerHeight('auto');
    } else {
      setDrawerHeight('100vh');
    }
  };

  return (
    <>
      {isMobile
        ? (
          <FlDialog
            open={open}
            TransitionComponent={Transition}
            // keepMounted
            PaperProps={{
              style: {
                width: '100%',
                borderRadius: isMobile ? '20px 20px 0px 0px' : '10px',
                margin: isMobile ? '0px' : '',
                bottom: isMobile ? '0px' : '',
                position: isMobile ? 'absolute' : '',
                height: drawerHeight,
                maxHeight: '100vh',
                maxWidth: '1000px',
              },
            }}
            onClose={() => onClose(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <FlDivider className={classes.drawerBorderIcon} onClick={() => handleDrawerHeight()} />
            <FlBox className={classes.drawerBox}>
              {children}
            </FlBox>
          </FlDialog>
        ) : null}
    </>
  );
};

export default FlBottomDrawer;

FlBottomDrawer.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
