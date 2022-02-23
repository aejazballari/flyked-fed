/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment-mini';
import { CURRENT_STEP, PROGRESS_UPLOAD } from '../../actions/postAction';
import ButtonWithLoader from '../../elements/buttonWithLoader';
import * as postAction from '../../actions/postAction';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import FileUpload from '../../config/fileUpload';
import {
  FlGrid, FlButton, FlTypography, FlAvatar,
} from '../../elements/index';

const PostPreview = () => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const dispatch = useDispatch();
  const selectedImage = useSelector((state) => state?.post?.postImage);
  const postText = useSelector((state) => state?.post?.postText);
  // const gradient = useSelector((state) => state?.post?.palletColor);
  const postTypeSelected = useSelector(
    (state) => state?.post?.postTypeSelected,
  );
  const dateOfBirth = useSelector((state) => state?.post?.dateOfBirth);
  const postPage = useSelector((state) => state?.post?.postPage);
  const isloading = useSelector((state) => state?.post?.loading);
  const { setAlert } = useContext(AlertNotificationContext);

  // function urltoFile(url, filename, mimeType) {
  //   // eslint-disable-next-line no-param-reassign
  //   mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
  //   return fetch(url)
  //     .then((res) => res.arrayBuffer())
  //     .then((buf) => new File([buf], filename, { type: mimeType }));
  // }

  const setProgressBar = (value) => {
    dispatch({ type: PROGRESS_UPLOAD, payload: value });
  };

  const handlePostCreation = async () => {
    dispatch(postAction.handleLoading());
    const jpegFile = new File([selectedImage], 'jpeg', { type: 'image/jpeg' });
    const fileData = await FileUpload(jpegFile, setProgressBar, setAlert, 'post');
    if (fileData) {
      const data = {
        // eslint-disable-next-line no-underscore-dangle
        postPage: postPage?._id,
        image: fileData,
        text: postText,
        postType: postTypeSelected?.key,
        // gradient,
      };

      if (postTypeSelected?.key === 'onThisDay') {
        data.thisDayDate = moment(dateOfBirth).format('YYYY-MM-DD');
      }
      if (postTypeSelected?.key === 'onBirthday') {
        data.dob = moment(dateOfBirth).format('YYYY-MM-DD');
      }
      dispatch(postAction.handleSubmitPost(data, setAlert));
    }
    // urltoFile(selectedImage, 'image.jpeg', 'image/jpeg')
    //   .then(async (file) => {

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <FlGrid container spacing={2}>
      {isMobile ? (
        <FlGrid item md={12} xs={12} className="post-preview-header-div">
          <FlButton
            variant="text"
            className="post-preview-header-btn"
            onClick={() => dispatch({ type: CURRENT_STEP, payload: 1 })}
          >
            <ArrowBackIosIcon fontSize="small" color="primary" />
            &nbsp;&nbsp;Post Preview
          </FlButton>
        </FlGrid>
      ) : (
        ''
      )}
      <FlGrid item md={11} xs={12}>
        <FlGrid container spacing={2} className="post-preview-card">
          <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
            <FlButton
              className="post-preview-post-type-btn"
              style={{
                color: '#F7F7F8',
                backgroundColor: '#EF613B',
                padding: '5px 15px',
              }}
            >
              <FlGrid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={postTypeSelected?.mobileIcon}
                  alt="crash"
                  height="12px"
                />
                <FlGrid>
                  &nbsp;&nbsp;
                  <span>{postTypeSelected?.name}</span>
                </FlGrid>
              </FlGrid>
            </FlButton>
          </FlGrid>
          <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
            <FlGrid container spacing={2}>
              <FlGrid item md={2} xs={1} />
              <FlGrid
                item
                md={8}
                xs={10}
                style={{
                  backgroundImage: `linear-gradient(359.55deg, #000000 -0.47%, rgba(0, 0, 0, 0.8) 18.05%, rgba(28, 33, 33, 0) 42.51%, rgba(0, 0, 0, 0) 42.51%), url(${typeof selectedImage === 'object' ? URL.createObjectURL(selectedImage) : selectedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom, top center',
                  backgroundRepeat: 'no-repeat, no-repeat',
                  borderRadius: '10px',
                  margin: '20px 0',
                  aspectRatio: '3/4',
                  marginBottom: isMobile ? '10rem' : '',
                }}
              >
                <FlGrid container spacing={2} className="post-preview-image">
                  <FlGrid item md={12} xs={12} style={{ textAlign: 'left', background: 'rgba(28, 33, 33, .1)', borderRadius: '10px 10px 0 0' }}>
                    <FlButton type="text" className="post-preview-page-overview">
                      <FlAvatar
                        src={postPage?.image}
                        className="post-preview-page-overview-user-icon"
                      />
                      <FlTypography className="post-preview-page-overview-user-name">
                        {postPage?.title}
                      </FlTypography>
                    </FlButton>
                  </FlGrid>
                  <FlGrid item md={12} xs={12}>
                    <FlTypography className="post-preview-text">
                      {postText}
                    </FlTypography>
                  </FlGrid>
                </FlGrid>
              </FlGrid>
              <FlGrid item md={2} xs={1} />
              {/* <FlGrid item md={2} xs={1} /> */}
              {/* <FlGrid item md={8} xs={12}>
                <Typography className="post-preview-message-content">
                  We’ll review and publish the  post if it relevant.
                  You’ll get a notification to know about the status
                </Typography>
              </FlGrid> */}
              {/* <FlGrid item md={2} xs={1} /> */}
            </FlGrid>
          </FlGrid>
          <FlGrid item md={12} xs={12} className="post-preview-footer-btns-div">
            <FlGrid
              container
              spacing={2}
              className="post-preview-footer-buttons-container"
            >
              <FlGrid
                item
                md={6}
                xs={12}
                className="post-preview-footer-back-div"
              >
                <FlButton
                  className="post-preview-footer-back-btn"
                  variant="text"
                  color="primary"
                  onClick={() => {
                    dispatch({ type: CURRENT_STEP, payload: 1 });
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    style={{ display: isMobile && 'none' }}
                  />
                  &nbsp;&nbsp;Edit Post
                </FlButton>
              </FlGrid>
              <FlGrid
                item
                md={6}
                xs={12}
                className="post-preview-footer-post-div"
              >
                <ButtonWithLoader
                  onClick={() => {
                    handlePostCreation();
                  }}
                  loading={isloading}
                  disabled={isloading}
                  className="post-preview-footer-post-btn"
                  variant="contained"
                  color="primary"
                >
                  Post
                </ButtonWithLoader>
              </FlGrid>
            </FlGrid>
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </FlGrid>
  );
};

export default PostPreview;
