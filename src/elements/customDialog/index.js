/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  DialogContent, Dialog, IconButton, Typography, Divider,
} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#888F9D',
    // color: theme.palette.grey[500],
  },
  dialogModel: {
    // background: 'rgba(0, 151, 19, 0.3)',
    background: 'rgba(0,0,0,.1)',
    // backgroundColor: 'green',
    // background: '#000000',
    // opacity: '15%',
    // borderRadius: '10px',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    hideCloseBtn, title, children, classes, onClose, ...other
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4" className={classes.title} style={{ display: title ? 'none' : '' }}>
        {children}
      </Typography>
      {onClose && !hideCloseBtn ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const CustomDialog = withStyles(styles)((props) => {
  const {
    handleClose,
    open,
    dialogTitle,
    maxWidth,
    children,
    fullScreen,
    style = {},
    classes,
    hideCloseBtn,
  } = props;
  return (
    <Dialog
      className={classes.dialogModel}
      onClose={handleClose}
      PaperProps={{
        style: {
          ...style,
        },
      }}
      open={open}
      maxWidth={maxWidth || 'sm'}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} title={dialogTitle} hideCloseBtn={hideCloseBtn}>
        {dialogTitle}
      </DialogTitle>
      {dialogTitle ? <Divider /> : ''}
      <DialogContent style={{ padding: '0px' }}>{children}</DialogContent>
    </Dialog>
  );
});
CustomDialog.defaultProps = {
  fullScreen: false,
  maxWidth: 'md',
  dialogTitle: '',
  style: {},
  hideCloseBtn: false,
};

CustomDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string,
  maxWidth: PropTypes.string,
  children: PropTypes.instanceOf(Object).isRequired,
  fullScreen: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  hideCloseBtn: PropTypes.bool,
};

export default CustomDialog;
