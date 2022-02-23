/* eslint-disable linebreak-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { FlBox, FlTypography } from '../../elements';

const HorizontalScroll = ({
  children, title, image, color, bgColor,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  return (
    <FlBox style={title.toLowerCase().includes('page') ? {
      background: 'transparent', marginBottom: '20px',
    } : {
      background: bgColor, borderRadius: '10px', padding: '10px 0', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(22, 48, 72, 0.1)', marginBottom: '20px',
    }}
    >
      <FlBox style={{ display: 'flex', alignItems: 'center', padding: '5px 0px' }}>
        {isMobile ? null : image && (
        <span style={{
          background: color, borderRadius: '50%', display: 'inline-block', padding: '3px 4px', marginLeft: '10px', marginRight: '10px',
        }}
        >
          <img src={image} alt="event-images" height={14} width={14} />
        </span>
        )}
        <FlTypography style={isMobile ? {
          textTransform: 'capitalize', marginLeft: '15px', fontSize: '18px', lineHeight: '21px', fontWeight: 600, marginBottom: title.includes('page') ? 10 : 0,
        } : { textTransform: 'capitalize' }}
        >
          {title}
        </FlTypography>
      </FlBox>
      <div style={{
        display: 'flex', overflowX: 'auto', padding: '0px 10px',
      }}
      >
        {children}
      </div>
    </FlBox>
  );
};

HorizontalScroll.defaultProps = {
  image: '',
  title: '',
  children: <div />,
};

HorizontalScroll.propTypes = {
  children: PropTypes.instanceOf(Object),
  image: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default HorizontalScroll;
