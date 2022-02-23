/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import PropTypes from 'prop-types';
import {
  useTheme, useMediaQuery, Slide,
} from '@material-ui/core';
import './sharePopOver.css';
import WhatsAppIcon from '../../assets/shareIcons/whatsUp.svg';
import FaceBookIcon from '../../assets/shareIcons/FaceBook.svg';
import LinkIcon from '../../assets/shareIcons/link.svg';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import {
  FlButton,
  FlDialog,
  FlDivider,
  FlGrid,
  FlPopover,
  FlTypography,
} from '../../elements';
// import DivImageConverter from './converDivToImage';
import { shareURL } from '../../constants/common';

const SharePopOver = ({
  openPopover, closePopover, postDetails,
}) => {
  const { setAlert } = useContext(AlertNotificationContext);
  const open = Boolean(openPopover);
  const id = open ? 'simple-popover' : undefined;
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  const Transition = React.forwardRef((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slide direction="up" ref={ref} {...props} />
  ));

  const copyLinkFun = (txt) => {
    const cb = document.getElementById('cb');
    cb.value = txt;
    cb.style.display = 'block';
    cb.select();
    document.execCommand('copy');
    cb.style.display = 'none';
    setAlert('success', 'Link Copied Successfully');
  };

  const ShareList = () => (
    <>
      {/* <PageMetaTags title={`Flyked - ${postDetails?.postPage?.title}` || 'Flyked'}
      description={postDetails?.text || ''} image={postDetails?.image || ''}
       currentUrl={`${window?.location?.origin}/page/details/${postDetails?.postPage?.url}`}
       hashtag={postDetails?.postType || '#flyked'} quote={postDetails?.quote || ':: '} /> */}
      <FlGrid container spacing={2} className="share-popover-main">
        <FlGrid item md={12} xs={12} className="share_pop_over_header">
          <FlTypography className="share_pop_over_header_title">Share via...</FlTypography>
        </FlGrid>
        <FlGrid item md={12} xs={12} className="share_pop_over_content" onClick={closePopover}>
          <FlGrid container spacing={2}>
            <WhatsappShareButton
              style={{ width: '100%' }}
              url={`${postDetails?.text} \n\n ${shareURL}/${postDetails?.postPage?.url}/${postDetails?.url} \n\n Get the best of what really interests you. Flyked is free and open for everyone to post, share facts and explore more facts.`}
              // url={`${shareURL}/${postDetails?.postPage?.url}/${postDetails?.url}`}
              // title="Get the best of what really interests you. Flyked is free and open for everyone to post, share facts and explore more facts."
              separator=" "
            >
              <FlButton className="share_pop_over_button" variant="text" fullWidth>
                <img src={WhatsAppIcon} alt="icon" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
                Share to WhatsApp
              </FlButton>
            </WhatsappShareButton>
          </FlGrid>
          <FlGrid container spacing={2}>
            <FacebookShareButton
              style={{ width: '100%' }}
              url={`${shareURL}/${postDetails?.postPage?.url}/${postDetails?.url}`}
              quote={`Read more interesting facts, insights and trivia about ${postDetails?.postPage?.title} on`}
              // quote="Get the best of what really interests you. Flyked is free and open for everyone to post, share facts and explore more facts."
              // hashtag={`#${postDetails?.postType}`}
              // description={postDetails?.text}
            >
              <FlButton className="share_pop_over_button" variant="text" fullWidth>
                <img src={FaceBookIcon} alt="icon" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
                Share to Facebook
              </FlButton>
            </FacebookShareButton>
          </FlGrid>
          <FlGrid container spacing={2}>
            <FlButton onClick={() => copyLinkFun(`${shareURL}/${postDetails?.postPage?.url}/${postDetails?.url}`)} className="share_pop_over_button" variant="text" fullWidth>
              <img src={LinkIcon} alt="icon" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
              Copy link
            </FlButton>
          </FlGrid>
          <FlGrid container spacing={2}>
            <input id="cb" type="text" hidden />
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </>
  );

  return (
    <>
      {openPopover && isMobile ? (
        <FlDialog
          open={open}
          onClose={closePopover}
          TransitionComponent={Transition}
          keepMounted
          PaperProps={{
            style: {
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              margin: '0px',
              bottom: '0px',
              position: 'absolute',
              overflow: 'hidden',
              paddingBottom: '10px',
              maxWidth: '1000px',
            },
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <FlGrid container spacing={2} style={{ width: '100%', padding: '0px', margin: '0px' }}>
            <FlGrid
              item
              md={12}
              xs={12}
              style={{
                textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
              }}
            >
              <FlDivider className="share-model-mobile-top-icon" onClick={closePopover} />
            </FlGrid>
            <FlGrid item md={12} xs={12} style={{ width: '100%', padding: '0px', margin: '0px' }}>
              {ShareList()}
            </FlGrid>
          </FlGrid>
        </FlDialog>
      ) : (
        <FlPopover
          id={id}
          open={open}
          anchorEl={openPopover}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            square: true,
            style: { borderRadius: '10px', overflow: 'hidden' },
          }}
          className="share_popover"
          style={{ display: 'absolute' }}
        >
          {ShareList()}
        </FlPopover>
      )}
    </>
  );
};

SharePopOver.propTypes = {
  openPopover: PropTypes.instanceOf(Object).isRequired,
  closePopover: PropTypes.func.isRequired,
  postDetails: PropTypes.instanceOf(Object).isRequired,
};

export default SharePopOver;
