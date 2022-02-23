/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  buttonProgress: {
    position: 'absolute',
  },
}));

const ButtonWithLoader = ({ loading, ...props }) => {
  const classes = useStyles();
  return (
    <Button {...props}>
      {props.children}
      {loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : ''}
    </Button>
  );
};
ButtonWithLoader.defaultProps = {
  loading: false,
};

ButtonWithLoader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default ButtonWithLoader;
