/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { FlGrid, FlMakeStyles, FlTypography } from '.';
import CircleIcon from '../assets/Ellipse 44.svg';
import FlDropdownWithImage from './FlDropdownWithImage';

const useStyles = FlMakeStyles(() => ({
  box: {
    border: '0.5px solid #cecece',
    marginTop: '10px',
    borderRadius: '30px',
    height: '50px',
    marginBottom: '8px',
    position: 'relative',
    cursor: 'pointer',
  },
  image: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    padding: '5px',
  },
  content: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: '11px',
    fontWeight: '400',
    color: '#999999',
    paddingTop: '5px',
  },
  primaryText: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#172849',
    paddingTop: '0px',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const FlCustomSelectInput = ({
  label,
  secondaryLabel,
  term,
  list,
  onChange,
  openDropdown,
  open,
  closeDropdown,
  position,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);

  const handleChange = (value) => {
    setSelected(value);
    onChange(value);
    closeDropdown();
  };

  return (
    <>
      <FlGrid
        container
        spacing={0}
        className={classes.box}
        onClick={openDropdown}
        onBlur={closeDropdown}
      >
        <FlGrid item md={3}>
          <img
            src={term === '' ? CircleIcon : selected?.image}
            // eslint-disable-next-line jsx-quotes
            alt='Icon'
            className={classes.image}
          />
        </FlGrid>
        <FlGrid item md={7}>
          <FlTypography className={classes.secondaryText}>
            {secondaryLabel}
          </FlTypography>
          <FlTypography className={classes.primaryText}>
            {term === '' ? label : selected?.title}
          </FlTypography>
        </FlGrid>
        <FlGrid
          item
          md={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <KeyboardArrowDownIcon />
        </FlGrid>
      </FlGrid>
      {open ? (
        <FlDropdownWithImage
          open={open}
          list={list}
          selected={selected}
          onChange={handleChange}
          position={position}
        />
      ) : null}
    </>
  );
};

export default FlCustomSelectInput;

FlCustomSelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  term: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  openDropdown: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};
