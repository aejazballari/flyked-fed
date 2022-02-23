/* eslint-disable linebreak-style */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import { FlGrid, FlMakeStyles } from '.';
import { baseAppURL } from '../constants/common';

const useStyles = FlMakeStyles(() => ({
  root: {
    padding: '1rem 1rem 0',
  },
  customShareButton: {
    borderRadius: '50%',
  },
}));

const FlCustomShare = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FlGrid container spacing={3}>
        <FlGrid item md={3}>
          <FacebookShareButton
            url='https://flyked-dev.s3.ap-south-1.amazonaws.com/images/user/1633425692975.jpeg'
            quote='Dog Lovers'
            hashtag='#hashtag'
            description='aiueo'
            // url={`${baseAppURL}page/details/DogLovers-5Nus8K`}
            // title="Flyked - Dog Lovers"
            // shareImage="https://flyked-dev.s3.ap-south-1.amazonaws.com/images/user/1633425692975.jpeg"
            // size="2.5rem"
            // className={classes.customShareButton}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </FlGrid>
        <FlGrid item md={3}>
          <WhatsappShareButton
            url={`${baseAppURL}page/details/DogLovers-5Nus8K`}
            title='Flyked - Dog Lovers'
            shareImage='https://flyked-dev.s3.ap-south-1.amazonaws.com/images/user/1633425692975.jpeg'
            size='2.5rem'
            className={classes.customShareButton}
          >
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
        </FlGrid>
      </FlGrid>
    </div>
  );
};

export default FlCustomShare;
