/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import moment from 'moment-mini';
import { FlTypography, FlBox } from '../../../elements';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '88%',
    // marginTop: '-20px',
    // padding: '20px 0',
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    aspectRatio: '1/1',
  },
  text: {
    // position: 'absolute',
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    fontWeight: 500,
    width: '95%',
    // padding: '0 4px',
  },
  textContainer: {
    // position: 'absolute',
    textAlign: 'center',
    // padding: 20,
    width: '100%',
    fontFamily: 'Poppins',
  },
  desc: {
    marginBottom: 10,
  },
}));

function StoryBody({
  data, storyProps, handleNext, handlePrevious,
}) {
  const classes = useStyles();
  const appTheme = useTheme();
  // const mousedownId = useRef();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const { action, isPaused } = storyProps;
  const { text, createdAt } = data;
  const birth = moment(data.dob);
  const thisDay = moment(data.thisDayDate);
  const news = new Date(createdAt);
  const today = moment();
  const birthday = today.diff(birth, 'years');
  const thisDayYears = today.diff(thisDay, 'years');
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
  } else if (diffMin > 1 && diffMin < 60) {
    commentTime = `${Math.floor(diffMin)} min ago`;
  } else if (diffMin >= 60 && diffHrs < 24) {
    commentTime = `${Math.floor(diffHrs)} hrs ago`;
  } else if (diffHrs >= 24 && diffDays < 30) {
    commentTime = `${Math.floor(diffDays)} ${Math.floor(diffDays) === 1 ? 'day' : 'days'} ago`;
  } else if (diffDays >= 30 && diffMonths < 12) {
    commentTime = `${Math.floor(diffMonths)} months ago`;
  } else {
    commentTime = `${Math.floor(diffYear)} years ago`;
  }

  if (thisDayYears > 1) {
    thisDayDate = `${thisDayYears} years ago`;
  } else if (thisDayYears === 1) {
    thisDayDate = `${thisDayYears} year ago`;
  } else {
    thisDayDate = 'Today';
  }

  const debouncePause = () => {
    setTimeout(() => {
      action('pause');
    }, 200);
  };

  const mouseUp = (type = String) => {
    if (isPaused) {
      action('play');
    } else if (!isPaused && type === 'next') {
      handleNext();
      setTimeout(() => {
        action('play');
      }, 500);
    } else if (!isPaused && type === 'previous') {
      handlePrevious();
      setTimeout(() => {
        action('play');
      }, 500);
    }
  };

  return (
    <FlBox className={classes.root}>
      <FlBox
        onTouchStart={isMobile ? debouncePause : () => {}}
        onTouchEnd={isMobile ? () => mouseUp('previous') : () => {}}
        onMouseDown={!isMobile ? debouncePause : () => {}}
        onMouseUp={!isMobile ? () => mouseUp('previous') : () => {}}
        style={{
          width: '20%',
          height: '100%',
          position: 'absolute',
          background: 'transparent',
          zIndex: 10000,
          // backgroundColor: 'red',
          left: 0,
        }}
      />
      <FlBox
        onMouseDown={!isMobile ? debouncePause : () => {}}
        onMouseUp={!isMobile ? () => mouseUp('next') : () => {}}
        onTouchStart={isMobile ? debouncePause : () => {}}
        onTouchEnd={isMobile ? () => mouseUp('next') : () => {}}
        style={{
          width: '80%',
          height: '100%',
          position: 'absolute',
          background: 'transparent',
          zIndex: 10000,
          right: 0,
        }}
      />

      <div style={{ width: '100%' }}>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Phare_petit_minou_600x800.JPG" alt='profile pic' className={classes.image} /> */}
        <FlBox className={classes.textContainer}>
          <h4 className={classes.text} style={{ margin: '10px auto', textAlign: 'center' }}>
            {text}
          </h4>
          {data.postType === 'onBirthday' && (
          <FlTypography className={classes.desc} style={{ color: '#44F4FF', textTransform: 'uppercase', textAlign: 'center' }}>
            turns
            {' '}
            {birthday}
            {' '}
            today
          </FlTypography>
          )}
          {data.postType === 'onThisDay' && (
          <FlTypography className={classes.desc} style={{ color: '#FFF844', textTransform: 'uppercase', textAlign: 'center' }}>
            {thisDayDate}
          </FlTypography>
          )}
          {data.postType === 'inNews' && (
          <FlTypography className={classes.desc} style={{ color: '#FF7DB3', textTransform: 'uppercase', textAlign: 'center' }}>
            {commentTime}
          </FlTypography>
          )}
        </FlBox>
      </div>
    </FlBox>
  );
}

export default StoryBody;

StoryBody.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
