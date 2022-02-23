/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Stories from 'react-insta-stories';
import PropTypes from 'prop-types';
// import StoryComponent from './StoryComponent';
import StoryDetails from './StoryDetails';
import FinalPage from './finalPage';
import { FlCircularProgress } from '../../elements';
import { IMAGES } from '../../constants/images';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#363636',
    justifyContent: 'center',
    height: window.innerHeight,
    width: window.innerWidth,
    overflowX: 'hidden !important',
    overflowY: window.innerWidth > 1000 ? 'hidden' : 'scroll',
    alignItems: 'center',
  },
  arrowContainer: {
    position: 'fixed', width: 50, height: 50, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', margin: '0 20px', cursor: 'pointer',
  },
  mobileArrow: {
    position: 'fixed', width: 50, height: 50, display: 'grid', placeItems: 'center', margin: '0 10px',
  },
}));

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const PostPreview = ({
  open,
  handleClose,
  data,
  handleLike,
  handleLikeList,
  handleComment,
  handleCommenting,
  handleSave,
  handleShare,
  handleViewPage,
  handleViewProfile,
  selectedIndex,
  count,
  handleCount,
  loading,
  finalPage,
}) => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(selectedIndex);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(true);
    setTimeout(() => {
      setPaused(false);
    }, 10);
  }, [currentId]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        // PaperProps={{
        //   style: {
        //     height: window.innerHeight,
        //     width: '100%',
        //     position: 'fixed',
        //     perspective: '1000px',
        //   },
        // }}
      >
        <Box className={classes.root}>
          {loading ? (<FlCircularProgress />) : (
            <Stories
              loader
              onAllStoriesEnd={handleClose}
              stories={[
                ...data.map((item, index) => ({
                  content: (props) => (
                    <>
                      <Box
                        // className={classes.arrowContainer}
                        className={isMobile ? classes.mobileArrow : classes.arrowContainer}
                        style={{ left: 0, display: index === 0 ? 'none' : '' }}
                        onClick={() => {
                          if (index !== 0) {
                            setCurrentId(currentId - 1);
                          }
                        }}
                      >
                        <img
                          src={IMAGES.CHEVRON_RIGHT}
                          style={{
                            aspectRatio: '1/1',
                            transform: 'rotate(180deg)',
                            fontSize: '50px',
                            fontWeight: 'bold',
                          }}
                          alt="key"
                        />
                      </Box>
                      <Box
                        className={isMobile ? classes.mobileArrow : classes.arrowContainer}
                        style={{ right: 0, display: index === (finalPage ? data?.length : data.length - 1) ? 'none' : '' }}
                        onClick={() => {
                          if (index !== (finalPage ? data?.length : data.length - 1)) {
                            setCurrentId(currentId + 1);
                          }
                        }}
                      >
                        <img
                          src={IMAGES.CHEVRON_RIGHT}
                          style={{
                            aspectRatio: '1/1',
                          }}
                          alt="key"
                        />
                      </Box>
                      <StoryDetails
                        data={item}
                        key={item?._id}
                        handleClose={handleClose}
                        storyProps={props}
                        count={count}
                        handleCount={handleCount}
                        handleNext={() => {
                          if (index !== (finalPage ? data?.length : data.length - 1)) {
                            setCurrentId(currentId + 1);
                          }
                        }}
                        handlePrevious={() => {
                          if (index !== 0) {
                            setCurrentId(currentId - 1);
                          }
                        }}
                        storyActions={{
                          handleLike,
                          handleLikeList,
                          handleComment,
                          handleCommenting,
                          handleSave,
                          handleShare,
                          handleViewPage,
                          handleViewProfile,
                        }}
                      />
                    </>
                  ),
                  duration: 9000,
                })),
                ...finalPage ? [{
                  content: (props, index) => (
                    <>
                      <Box
                        className={isMobile ? classes.mobileArrow : classes.arrowContainer}
                        style={{ left: 0, display: index === 0 ? 'none' : '' }}
                        onClick={() => {
                          if (index !== 0) {
                            setCurrentId(currentId - 1);
                          }
                        }}
                      >
                        <img
                          src={IMAGES.CHEVRON_RIGHT}
                          style={{
                            aspectRatio: '1/1',
                            transform: 'rotate(180deg)',
                          }}
                          alt="key"
                        />
                      </Box>
                      <FinalPage
                        key="final_page_post_preview"
                        pageDetails={data?.[0]}
                        storyProps={props}
                        handleClose={handleClose}
                        handleNext={() => {
                          setCurrentId(currentId + 1);
                        }}
                        handlePrevious={() => {
                          setCurrentId(currentId - 1);
                        }}
                      />
                    </>
                  ),
                  duration: 9000,
                }] : [],
              ]}
              width={!isMobile && window.innerHeight < 1000 ? '32vw' : '100%'}
              height="auto"
              currentIndex={currentId}
              isPaused={paused}
              keyboardNavigation
              defaultInterval={9000}
              onStoryEnd={(index) => {
                if (index !== data.length - 1) {
                  setCurrentId(currentId + 1);
                }
              }}
            />
          )}
        </Box>
      </Dialog>
    </div>
  );
};

export default PostPreview;

PostPreview.defaultProps = {
  finalPage: false,
};

PostPreview.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleLikeList: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired,
  handleCommenting: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleViewPage: PropTypes.func.isRequired,
  handleViewProfile: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  handleCount: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  finalPage: PropTypes.bool,
};
