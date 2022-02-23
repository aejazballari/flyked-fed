/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-quotes */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import {
  Flalpha,
  FlAvatar,
  FlInputBase,
  FlList,
  FlListItem,
  FlListItemAvatar,
  FlListItemText,
  FlMakeStyles,
} from '.';

const useStyles = FlMakeStyles((theme) => ({
  dropdown: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 1px 1px #e8e9ec',
    position: 'absolute',
    top: '80%',
    display: 'block',
    width: '400px',
    height: '330px',
    padding: '10px',
    zIndex: '99',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      width: '100%',
      top: 0,
      boxShadow: 'none',
      padding: '0px',
    },
  },
  search: {
    position: 'relative',
    height: '40px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Flalpha(theme.palette.common.black, 0.06),
    '&:hover': {
      backgroundColor: Flalpha(theme.palette.common.black, 0.1),
    },
    marginLeft: 0,
    marginTop: '0px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      margin: '10px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: '14px',
    paddingLeft: `calc(2em + ${theme.spacing(4)}px)`,
    paddingTop: '10px',
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  list: {
    height: '280px',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  listItem: {
    pointer: 'cursor',
  },
}));

const FlDropdownWithImage = ({
 open, list, onChange, position,
}) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [items] = useState(list);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div style={{ display: open ? '' : 'none' }}>
      <div
        className={classes.dropdown}
        style={{ left: position === 'left' ? 0 : 'auto', right: position === 'left' ? 'auto' : 0 }}
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon className='icon_size' />
          </div>
          <FlInputBase
            placeholder='Search here…'
            defaultValue={searchTerm}
            classes={{
              root: classes.inputRoot,
              input: classes.searchInput,
            }}
            onChange={(e) => handleSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
          />
        </div>
        <FlList className={classes.list}>
          {filteredItems.length === 0
            ? items.map((text) => (
                <FlListItem
                  className={classes.listItem}
                  key={text._id}
                  value={text}
                  onClick={() => {
                    if (text.title !== 'No Category Found') {
                      onChange(text);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <FlListItemAvatar>
                    <FlAvatar
                      alt={text.title}
                      src={text.image}
                      className={classes.image}
                    />
                  </FlListItemAvatar>
                  <FlListItemText primary={text.title} />
                </FlListItem>
              ))
            : filteredItems.map((text) => (
                <FlListItem
                  className={classes.listItem}
                  key={text._id}
                  value={text}
                  onClick={() => onChange(text)}
                  style={{ cursor: 'pointer' }}
                >
                  <FlListItemAvatar>
                    <FlAvatar
                      alt={text.title}
                      src={text.image}
                      className={classes.image}
                    />
                  </FlListItemAvatar>
                  <FlListItemText primary={text.title} />
                </FlListItem>
              ))}
        </FlList>
      </div>
    </div>
  );
};

export default FlDropdownWithImage;

FlDropdownWithImage.propTypes = {
  open: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};
