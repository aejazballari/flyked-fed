import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as postAction from '../../actions/postAction';
import PostClear from './clearPostData';
import {
  FlGrid, FlButton, FlTypography, FlAvatar,
} from '../../elements/index';

const PostReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const selectedImage = useSelector((state) => state?.post?.postImage);
  const postText = useSelector((state) => state?.post?.postText);
  const postPage = useSelector((state) => state?.post?.postPage);

  const handleBack = () => {
    dispatch(postAction.postType('Pending'));
    PostClear(dispatch);
    history.push('/user/profile');
  };

  return (
    <FlGrid container spacing={2}>
      {isMobile ? (
        <FlGrid item md={12} xs={12} className="post-review-header-div">
          <FlButton variant="text" className="post-review-header-btn" onClick={handleBack}>
            <ArrowBackIosIcon fontSize="small" color="primary" />
                &nbsp;&nbsp;Post
          </FlButton>
        </FlGrid>
      ) : ''}
      <FlGrid item md={11} xs={12} style={{ width: '100%', height: '100%' }}>
        <FlGrid container spacing={2} className="post-review-card">
          <FlGrid item md={12} xs={12} style={{ textAlign: 'center' }}>
            <FlGrid container spacing={1}>
              <FlGrid item md={3} xs={1} />
              <FlGrid
                item
                md={6}
                xs={10}
                style={{
                  backgroundImage: `linear-gradient(359.55deg, #000000 -0.47%, rgba(0, 0, 0, 0) 18.05%, rgba(28, 33, 33, 0) 42.51%, rgba(0, 0, 0, 0) 42.51%), url(${typeof selectedImage === 'object' ? URL.createObjectURL(selectedImage) : selectedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom, top center',
                  backgroundRepeat: 'no-repeat, no-repeat',
                  borderRadius: '10px',
                  margin: '20px 0',
                  aspectRatio: '3/4',
                }}
              >
                <FlGrid container spacing={2} className="post-review-image">
                  <FlGrid item md={12} xs={12} style={{ textAlign: 'left', padding: '5px' }}>
                    <div style={{ background: 'rgba(28, 33, 33, .1)', borderRadius: '10px 10px 0 0', width: '100%' }}>
                      <FlButton type="text" className="post-review-page-overview">
                        <FlAvatar src={postPage?.image} className="post-review-page-overview-user-icon" />
                        <FlTypography className="post-review-page-overview-user-name">{postPage?.title}</FlTypography>
                      </FlButton>
                    </div>
                  </FlGrid>
                  <FlGrid item md={12} xs={12}>
                    <FlTypography className="post-review-text">{postText}</FlTypography>
                  </FlGrid>
                </FlGrid>
              </FlGrid>
              <FlGrid item md={3} xs={1} />
              <FlGrid item md={2} />
              <FlGrid item md={8} xs={12}>
                <FlTypography className="post-review-message-label">Your post is being reviewed</FlTypography>
                <FlTypography className="post-review-message-content">
                  We’ll review and publish the post if it is relevant.
                  You’ll get a notification to know about the status.
                </FlTypography>
              </FlGrid>
              <FlGrid item md={2} />
            </FlGrid>
          </FlGrid>
          <FlGrid item md={12} xs={12} className="post-review-footer-btns-div">
            <FlButton
              onClick={handleBack}
              className="post-review-footer-post-btn"
              variant="contained"
              color="primary"
            >
              OK
            </FlButton>
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </FlGrid>
  );
};

export default PostReview;
