import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-mini';
import {
  FlAvatar, FlTypography, FlBox, FlMakeStyles, FlGrid,
} from '../../elements';
// import PostPreview from '../PostPreview';

const useStyles = FlMakeStyles(() => ({
  card: {
    borderRadius: '20px',
    // height: '380px',
    width: '265px',
    cursor: 'pointer',
    marginBottom: '5px',
  },

  cardHeader: {
    background: 'linear-gradient(181.47deg, #000000 1.03%, #000000 50.95%, rgba(0, 0, 0, 0) 87.67%), black',
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '17px',
    borderRadius: '20px 20px 0px 0px',
    padding: '10px',
  },

  body: {
    // height: '320px',
    borderRadius: '0px 0px 20px 20px',
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '0px',
    aspectRatio: '3/4',
  },

  text: {
    color: 'white',
    marginBottom: '10px',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    width: '100%',
    letterSpacing: '0.5px',
  },
  desc: {
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
  },
  spanText: {
    fontSize: '12px',
    lineHeight: '14px',
    color: '#FFFFFF',
    opacity: 0.5,
    display: 'inline-block',
    paddingRight: 5,
  },
}));

function CommonCard({
  pageName, image, description, avatar, setOpenPreview, type, dob, createdAt,
}) {
  const classes = useStyles();
  const birth = moment(dob);
  const news = new Date(createdAt);
  const today = moment();
  const birthday = today.diff(birth, 'years');
  const diff = today - news;
  const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHrs = diff / (1000 * 60 * 60);
  const diffMin = diff / (1000 * 60);

  let commentTime = '';
  let thisDayDate = '';
  if (diffMin < 1) {
    commentTime = 'now';
    // thisDayTime = 'Today';
  } else if (diffMin > 1 && diffMin < 60) {
    commentTime = `${Math.floor(diffMin)} min ago`;
    // thisDayTime = 'Today';
  } else if (diffMin >= 60 && diffHrs < 24) {
    commentTime = `${Math.floor(diffHrs)} hrs ago`;
    // thisDayTime = 'Today';
  } else if (diffHrs >= 24 && diffDays < 30) {
    commentTime = `${Math.floor(diffDays)} ${Math.floor(diffDays) === 1 ? 'day' : 'days'} ago`;
  } else if (diffDays >= 30 && diffMonths < 12) {
    commentTime = `${Math.floor(diffMonths)} months ago`;
  } else {
    commentTime = `${Math.floor(diffYear)} years ago`;
    // thisDayTime = `${Math.floor(diffYear)} years ago`;
  }

  if (birthday > 1) {
    thisDayDate = `${birthday} years ago`;
  } else if (birthday === 1) {
    thisDayDate = `${birthday} year ago`;
  } else {
    thisDayDate = 'Today';
  }

  return (
    <>
      <FlGrid className={classes.card} onClick={() => setOpenPreview()}>
        <FlBox
          display="flex"
          className={classes.cardHeader}
        >
          <FlAvatar alt="Remy Sharp" src={avatar} style={{ background: 'gray', width: '38px', height: '38px' }} />
          <FlBox style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '10px',
          }}
          >
            <FlTypography style={{ textAlign: 'left', fontSize: '14px', lineHeight: '17px' }}>
              <span style={{ fontWeight: 600, display: 'inline-block', paddingBottom: '3px' }}>
                {pageName}
              </span>
              {/* <br />
              <span className={classes.spanText}>
                on
              </span>
              <span>
                {pageName}
              </span> */}
            </FlTypography>
          </FlBox>

        </FlBox>
        <FlBox className={classes.body} style={{ background: `linear-gradient(359.55deg, #000000 -0.47%, rgba(0, 0, 0, 0.8) 18.05%, rgba(28, 33, 33, 0.15) 40.51%, rgba(0, 0, 0, 0.1) 40.51%), url(${image}) no-repeat center/cover` }}>
          <div style={{ margin: '15px', textAlign: 'center' }}>
            <FlTypography className={classes.text}>
              {description.length > 65 ? `${description.slice(0, 65)}...` : description}
            </FlTypography>
            {type === 'onBirthday' && (
              <FlTypography className={classes.desc} style={{ color: '#44F4FF', textTransform: 'uppercase', display: birthday >= 0 ? '' : 'none' }}>
                turns
                {' '}
                {birthday}
                {' '}
                today
              </FlTypography>
            )}
            {type === 'onThisDay' && (
            <FlTypography className={classes.desc} style={{ color: '#FFF844', textTransform: 'uppercase' }}>
              {thisDayDate}
            </FlTypography>
            )}
            {type === 'inNews' && (
            <FlTypography className={classes.desc} style={{ color: '#FF7DB3', textTransform: 'uppercase' }}>
              {commentTime}
            </FlTypography>
            )}
          </div>
        </FlBox>
      </FlGrid>
    </>
  );
}

export default CommonCard;

CommonCard.defaultProps = {
  dob: '',
  setOpenPreview: () => {},
};

CommonCard.propTypes = {
  pageName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setOpenPreview: PropTypes.func,
  type: PropTypes.string.isRequired,
  dob: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};
