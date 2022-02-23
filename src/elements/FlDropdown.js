/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import {
  FlInputLabel, FlListItemText, FlMakeStyles, FlMenuItem, FlSelect,
} from '.';

const useStyles = FlMakeStyles((theme) => ({
  formControl: {
    marginTop: '10px',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FlDropdown = ({
  label, list, term, onChange, name,
}) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small">
      <FlInputLabel id="demo-simple-select-outlined-label">
        {label}
        <span style={{ color: 'red' }}>*</span>
      </FlInputLabel>
      <FlSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        required
        style={{ backgroundColor: 'white' }}
        value={term}
        label={label}
        name={name}
        onChange={(e) => onChange(e.target)}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {list.map((text) => (
          <FlMenuItem value={text} key={text.id} style={{ borderBottom: '0.5px solid #cecece' }}>
            <FlListItemText>{text.title}</FlListItemText>
          </FlMenuItem>
        ))}
      </FlSelect>
    </FormControl>
  );
};

export default FlDropdown;

FlDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.instanceOf(Array).isRequired,
  term: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
