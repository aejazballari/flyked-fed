/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
import StoryHeader from './StoryHeader';
import StoryBody from './StoryBody';
import StoryFooter from './StoryFooter';

const useStyles = makeStyles(() => ({
  root: {
    // padding: '0 10px',
    height: window.innerHeight,
    width: window.innerWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: window.innerWidth > 1000 ? 'hidden' : 'scroll',
    overflowX: 'hidden !important',
  },
}));

const StoryDetails = (props) => {
  const classes = useStyles();
  const {
    data,
    handleClose,
    storyProps,
    handleNext,
    handlePrevious,
    storyActions,
    count,
    handleCount,
  } = props;
  const { createdBy, postPage } = data;
  return (
    <div className={classes.root} style={{ backgroundColor: '#363636' }}>
      <div
        // style={{ backgroundImage: 'url(\'https://upload.wikimedia.org/wikipedia/commons/8/8c/Phare_petit_minou_600x800.JPG\')', backgroundSize: 'cover', width: '100%', height: '100%' }}
        // style={{ backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.9) 10%, transparent, rgba(0,0,0,0.4) 100%), url(\'https://user-images.githubusercontent.com/140403/57094582-4016ec00-6ce7-11e9-9528-d36f5fd062bc.jpg\')', backgroundSize: 'cover', width: '100%', height: '100%' }}
        // style={{ background: 'linear-gradient(360deg, rgba(0,0,0,0.85) 14%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.1) 90%), url(\'https://user-images.githubusercontent.com/140403/57094582-4016ec00-6ce7-11e9-9528-d36f5fd062bc.jpg\') no-repeat center/cover', backgroundSize: 'cover', width: '100%', height: '100%' }}
        style={{ backgroundImage: `linear-gradient(360deg, rgba(0,0,0,0.9) 14%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.0) 50%), url(${data?.image})`, aspectRatio: '9/16', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 540 }}
      >
        {/* <Box
          onClick={handlePrevious}
          style={{
            width: '20%',
            height: '100%',
            position: 'absolute',
            background: 'transparent',
            zIndex: 10000,
            backgroundColor: 'red',
          }}
        />
        <Box
          onClick={handleNext}
          style={{
            width: '80%',
            height: '100%',
            position: 'absolute',
            background: 'transparent',
            zIndex: 10000,
            right: 0,
            backgroundColor: 'yellow',
          }}
        /> */}
        {/* <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 60, width: '100%', position: 'absolute', top: 0, zIndex: 1 }} /> */}
        <StoryHeader data={createdBy} handleClose={handleClose} />
        <StoryBody
          data={data}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          storyProps={storyProps}
        />
      </div>

      <StoryFooter
        postPage={postPage}
        data={data}
        storyActions={storyActions}
        count={count}
        handleCount={handleCount}
        storyProps={storyProps}
        handleClose={handleClose}
      />
    </div>
  );
};

export default StoryDetails;

StoryDetails.propTypes = {
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  count: PropTypes.number.isRequired,
  handleCount: PropTypes.func.isRequired,
};
