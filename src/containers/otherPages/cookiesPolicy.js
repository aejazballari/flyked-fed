/* eslint-disable max-len */
import React, { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import {
  FlBox, FlContainer, FlGrid, FlMakeStyles, FlTypography,
} from '../../elements';
import PageMetaTags from '../../elements/pageMetaTags';
import PageLayout from '../../layouts/createLayout';

const useStyles = FlMakeStyles((theme) => ({
  heading: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '44px',
    lineHeight: '64px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '44px',
    },
  },
  text: {
    color: '#333333',
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: '12px',
    lineHeight: '20px',
  },
}));
const CookiesPolicy = () => {
  const footer = true;
  const classes = useStyles();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout footer={footer}>
      <PageMetaTags title="Flyked - Cookies Policy" description="Cookies Policy" image="" currentUrl={window?.location?.href || ''} />
      <FlContainer style={{ marginTop: isMobile ? '4rem' : '4.5rem', marginBottom: isMobile ? '6rem' : '4.5rem' }}>
        <FlGrid container spacing={0}>
          <FlGrid item md={1} />
          <FlGrid item md={10}>
            <FlBox style={{ backgroundColor: '#ffffff', padding: isMobile ? '1rem' : '3rem' }}>
              <FlTypography
                className={classes.heading}
              >
                Cookies Policy
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#B9BDC1',
                }}
              >
                As updated on October 17, 2020
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '1.2rem' }}
              >
                Cookies are small pieces of text used to store information on web browsers. Cookies are used to store and receive
                identifiers and other information on computers, phones and other devices. Other technologies including data, that we store
                on your web browser or devices, identifiers associated with your device and other software, are used for similar purposes.
                In this software we refer to all of these technologies as “cookies”.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies if you have a Flyked.com Account, use our Products, including apps and website, or visit other websites
                and apps that use Flyked.com Products. Cookies enable Flyked.com to offer the Flyked.com Products to you and to
                understand the information that we receive about you, including information about your use of other websites and apps,
                whether or not you are registered or logged in.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                The Policy explains how we use Cookies and the choices you have. Except and other wise as stated in this policy, the
                Privacy Policy shall apply to our processing of the data that we collect via cookies.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Why do we use cookies?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Cookies help us provide, protect and improve the Flyked.com Products, such as by personalising content, tailoring and
                measuring ads, and providing a safer experience. The cookies that we use include session cookies, which are deleted
                when you close your browser, and persistent cookies, which stay in your browser until they expire or you delete them.
                While the cookies that we use may change from time to time as we improve and update the Flyked.com products, we
                use them for the following purposes:
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Authentication
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies to verify your account and determine when you’re logged in so that we can make it easier for you to
                access the Flyked.com products and show you the appropriate experience and features.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Security, site and product integrity
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies to help us keep your account, data and the Flyked.com products safe and secure.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Advertising, recommendations, insights and measurement
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies to help us show ads and to make recommendations for businesses and other organizations to people who
                may be interested in the products, services or causes they promote. Cookies help us serve and measure ads across
                different browsers and devices used by the same person.
                <br />
                <b>For example:</b>
                {' '}
                We can use cookies to prevent you from seeing the same ad over and over again across the different devices
                that you use.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Cookies also allow us to provide insights about the people who use the Flyked.com products, as well as the people who
                interact with the ads, websites and apps of our advertisers and the businesses that use the Flyked.com products.
                <br />
                <b>For example:</b>
                {' '}
                We use cookies to help businesses understand the kinds of people who like their Flyked.com page or use
                their apps so that they can provide more relevant content and develop features that are likely to be interesting to their
                customers.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We also use cookies, to help you opt out of seeing ads from Flyked.com based on your activity on third-party websites.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Site features and services
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies to enable the functionality that helps us provide the Flyked.com products.
                <br />
                <b>For example:</b>
                {' '}
                Cookies help us store preferences, know when you’ve seen or interacted with Flyked.com products’ content
                and provide you with customised content and experiences. For instance, cookies allow us to make suggestions to you and
                others, and to customise content on third-party sites that integrate our social plugins.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Performance
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies to provide you with the best experience possible.
                <br />
                <b>For example:</b>
                {' '}
                Cookies help us route traffic between servers and understand how quickly Flyked.com products load for
                different people. Cookies also help us record the ratio and dimensions of your screen and windows and know whether
                you’ve enabled high-contrast mode, so that we can render our sites and apps correctly to deliver an optimal experience for
                your device’s screen.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Analytics and research
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies to better understand how people use the Flyked.com products so that we can improve them.
                <br />
                <b>For example:</b>
                {' '}
                Cookies can help us understand how people use the Flyked.com service, analyse which parts of the
                Flyked.com products people find most useful and engaging, and identify features that could be improved.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Third-party websites and apps
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Our business partners may also choose to share information with Flyked.com from cookies set in their own websites’
                domains, whether or not you have a Flyked.com account or are logged in. Unlike cookies that are set on Flyked.com’s own
                domains, these cookies aren’t accessible by Flyked.com when you’re on a site other than the one on which they were set,
                including when you are on one of our domains. They serve the same purposes as cookies set in Flyked.com’s own domain,
                which are to personalise content (including ads), measure ads, produce analytics and provide a safer experience, as set
                out in this Cookies Policy.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Where do we use cookies?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We may place cookies on your computer or device and receive information stored in cookies when you use or visit:
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                <ul style={{ padding: '0px', paddingLeft: '1rem' }}>
                  <li>
                    The Flyked.com products;
                  </li>
                  <li>
                    Websites and apps provided by other companies that use the Flyked.com products, including companies that incorporate
                    the Flyked.com technologies into their websites and apps. Flyked.com uses cookies and receives information when you
                    visit those sites and apps, including device information and information about your activity, without any further action
                    from you. This occurs whether or not you have a Flyked.com account or are logged in.
                  </li>
                </ul>
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Browser cookie controls
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                In addition, your browser or device may offer settings that allow you to choose whether browser cookies are set and to
                delete them. These controls vary by browser, and manufacturers may change both the settings that they make available
                and how they work at any time. Certain parts of the Flyked.com products may not work properly if you have disabled
                browser cookie use.
              </FlTypography>
            </FlBox>
          </FlGrid>
          <FlGrid item md={1} />
        </FlGrid>
      </FlContainer>
    </PageLayout>
  );
};

export default CookiesPolicy;
