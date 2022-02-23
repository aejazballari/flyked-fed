/* eslint-disable linebreak-style */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const PageMetaTags = ({
  title, description, image, currentUrl, hashtag, quote,
}) => (
  <Helmet
    defer={false}
    defaultTitle={title}
    titleTemplate="%s"
  >
    <title>{title || 'Flyked'}</title>
    <meta charset="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="csrf_token" content="" />
    <meta property="type" content="website" />
    <meta property="url" content={currentUrl} />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="_token" content="" />
    <meta name="robots" content="noodp" />
    <meta property="title" content={title} />
    <meta name="description" content={description} />
    <meta property="image" itemProp="image" content={image} />
    <meta content="image/*" property="og:image:type" />
    <meta property="quote" content={quote} />
    <meta property="og:quote" content={quote} />
    <meta property="og:hashtag" content={hashtag} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={image || 'https://flyked-dev.s3.ap-south-1.amazonaws.com/images/user/1634572650088.blob'} />
    <meta property="og:url" content={currentUrl} />
    <meta property="og:site_name" content="Flyked" />
    <meta property="og:description" content={description} />
  </Helmet>
);
PageMetaTags.defaultProps = {
  image: '',
  currentUrl: window?.location?.href,
  hashtag: '#flyked',
  quote: ':: ',
  title: 'Flyked',
  description: 'Flyked',
};

PageMetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  currentUrl: PropTypes.string,
  hashtag: PropTypes.string,
  quote: PropTypes.string,
};

export default PageMetaTags;
