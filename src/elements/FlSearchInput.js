/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { FlInputBase, FlMakeStyles } from '.';

const useStyles = FlMakeStyles((theme) => ({
  search: {
    position: 'relative',
    height: '40px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    marginLeft: 0,
    marginTop: theme.spacing(2),
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#EF613B',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: '17px',
    paddingLeft: `calc(2em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      fontWeight: '200',
    },
  },
}));

const FlSearchInput = ({ term, onChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon className="icon_size" />
      </div>
      <FlInputBase
        placeholder="Search here…"
        defaultValue={term}
        onChange={(e) => onChange(e.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.searchInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        autoFocus
      />
    </div>
  );
};

export default FlSearchInput;

FlSearchInput.propTypes = {
  term: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
