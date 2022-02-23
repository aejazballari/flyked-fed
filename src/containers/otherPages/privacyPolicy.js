/* eslint-disable max-len */
import React, { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { Link } from 'react-router-dom';
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
const PrivacyPolicy = () => {
  const footer = true;
  const classes = useStyles();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout footer={footer}>
      <PageMetaTags title="Flyked - Privacy Policy" description="Privacy Policy" image="" currentUrl={window?.location?.href || ''} />
      <FlContainer style={{ marginTop: isMobile ? '4rem' : '4.5rem', marginBottom: isMobile ? '6rem' : '4.5rem' }}>
        <FlGrid container spacing={0}>
          <FlGrid item md={1} />
          <FlGrid item md={10}>
            <FlBox style={{ backgroundColor: '#ffffff', padding: isMobile ? '1rem' : '3rem' }}>
              <FlTypography
                className={classes.heading}
              >
                Privacy Policy
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
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                What kinds of information do we collect?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Depending on which Services you use, we collect different kinds of information from or about you.
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
                Things you do and information you provide
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We collect the content and other information that you provide when you use our services, including when you sign up for
                an account, create or share, and message or communicate with others. This can include information in or about the
                content that you provide, such as the location of a photo or the date a file was created. We also collect information about
                how you use our services, such as the types of content you view or engage with or the frequency and duration of your
                activities.
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
                Things others do and information they provide
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We also collect content and information that other people provide when they use our services, including information about
                you, such as when they share a photo of you, send a message to you or upload, sync or import your contact information.
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
                Your networks and connections
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We collect information about the people and pages you are connected to and how you interact with them, such as the
                people you communicate with the most or the pages you like to share with. We also collect contact information that you
                provide if you upload, sync or import this information (such as an address book) from a device.
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
                Device information
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We collect information from or about the computers, phones or other devices where you install or access our services,
                depending on the permissions you’ve granted. We may associate the information we collect from your different devices,
                which helps us provide consistent services across your devices. Here are some examples of the device information that
                we collect:
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                <ul style={{ padding: '0px', paddingLeft: '1rem' }}>
                  <li>
                    Attributes such as the operating system, hardware version, device settings, file and software names and types, battery and
                    signal strength, and device identifiers.
                  </li>
                  <li>
                    Device locations, including specific geographic locations, such as through GPS, Bluetooth or WiFi signals.
                  </li>
                  <li>
                    Connection information such as the name of your mobile operator or ISP, browser type, language and time zone, mobile phone number and IP address.
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
                Information from websites and apps that use our services
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We collect information when you visit or use third-party websites and apps that use our services. This includes
                information about the websites and apps that you visit, your use of our services on those websites and apps, as well as
                information the developer or publisher of the app or website provides to you or us.
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
                How do we use this information?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We are passionate about creating engaging and customised experiences for people. We use all of the information we have to help us provide and support our services. Here’s how:
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
                Provide, improve and develop Services
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We are able to deliver our Services, personalise content and make suggestions for you by using this information to
                understand how you use and interact with our services and the people or things you’re connected to and interested in on
                and off our services.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We also use information we have to provide shortcuts and suggestions to you. When we have location information, we use
                it to tailor our services for you and others, such as helping you to check in and find local events or offers in your area or
                telling your friends that you are nearby.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We conduct surveys and research, test features in development and analyse the information that we have in order to
                evaluate and improve products and services, develop new products or features and conduct audits and troubleshooting
                activities.
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
                Communicate with you
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use your information to send you marketing communications, communicate with you about our services and let you
                know about our policies and terms. We also use your information to respond to you when you contact us.
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
                Promote safety and security
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use the information we have to help verify accounts and activity, and to promote safety andsecurity on and off our
                services, such as by investigating suspicious activity or violations of our terms or policies. We work hard to protect your
                account using teams of engineers, automated systems and advanced technology such as encryption and machine learning. We also offer easy-to-use security tools that add an extra layer of security to your account.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We use cookies and similar technologies to provide and support our services and each of the uses outlined and described in this section of our policy.
                <br />
                Read our&nbsp;
                <Link to="/settings/cookies_policy" style={{ color: '#1c71fb' }}>
                  Cookies Policy
                </Link>
                &nbsp;to learn more.
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
                How is this information shared?
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                Sharing on our Services
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                People use our services to connect and share with others. We make this possible by sharing your information in the following ways:
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                People you share and communicate with
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                When you share and communicate using our services, you choose the audience who can see what you share.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Public information is any information that you share with a public audience, as well as information in your public profile or
                content you share on Flyked.com or another public forum. Public information is available to anyone on or off our services
                and can be seen or accessed through online search engines, APIs and offline media, such as on TV.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                In some cases, people you share and communicate with may download or re-share this content with others on and off our
                services. When you comment on another person&#39;s post or like their content on Flyked.com, that person decides the
                audience who can see your comment or like. If their audience is public, your comment will also be public.
              </FlTypography>
              <FlTypography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333333',
                  marginTop: '1rem',
                }}
              >
                People that see content that others share about you
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Other people may use our services to share content about you with the audience they choose. For example, people may
                share a photo of you, mention or tag you at a location in a post or share information about you that you shared with them.
                If you have concerns with someone’s post, social reporting is a way for people to quickly and easily ask for help from
                someone they trust.
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
                Apps, websites and third-party integrations on or using our services
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                When you use third-party apps, websites or other services that use, or are integrated with, our services, they may receive
                information about what you post or share. In addition, when you download or use such third-party services, they can
                access your public profile, which includes your username or user ID, your age range and country/language, your list of
                friends, as well as any information that you share with them. Information collected by these apps, websites or
                integrated services is subject to their own terms and policies.
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
                New owner
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                If the ownership or control of all or part of our services or their assets changes, we may transfer your information to the
                new owner.
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
                Sharing with third-party partners and customers
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We work with third-party companies who help us provide and improve our services or who use advertising or related
                products, which makes it possible to operate our companies and provide free services to people around the world.
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                Here are the types of third parties that we can share information with about you:
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
                Advertising, measurement and analytics services (non-personally identifiable information only)
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We want our advertising to be as relevant and interesting as the other information you find on our services. With this in
                mind, we use all of the information that we have about you to show you relevant ads. We do not share information that
                personally identifies you (personally identifiable information is information such as a name or email address that can by
                itself be used to contact you or identify who you are) with advertising, measurement or analytics partners unless you give
                us permission. We may provide these partners with information about the reach and effectiveness of their advertising
                without providing information that personally identifies you, or if we have aggregated the information so that it does not
                personally identify you.
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
                Vendors, service providers and other partners
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We transfer information to vendors, service providers and other partners who globally support our business, such as
                providing technical infrastructure services, analyzing how our services are used, measuring the effectiveness of ads and
                services, providing customer service, facilitating payments or conducting academic research and surveys. These partners
                must adhere to strict confidentiality obligations in a way that is consistent with this Data Policy and the agreements
                that we enter into with them.
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
                How can I manage or delete information about me?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We store data for as long as it is necessary to provide products and services to you and others, including those described
                above. Information associated with your account will be kept until your account is deleted, unless we no longer need the
                data to provide products and services. Bear in mind that information that others have shared about you is not part of your
                account and will not be deleted even if your account is deleted. Currently users don’t have an option to delete their account
                on the website.
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
                How do we respond to legal requests or prevent harm?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We may access, preserve and share your information in response to a legal request (e.g. a search warrant, court order or
                subpoena) if we have a good faith belief that the law requires us to do so. This may include responding to legal requests
                from jurisdictions outside of India where we have a good faith belief that the response is required by law in that
                jurisdiction, affects users in that jurisdiction and is consistent with internationally recognized standards. We may also
                access, preserve and share information when we have a good faith belief that it is necessary to: detect, prevent  and
                address fraud and other illegal activity; to protect ourselves, you and others, including as part of investigations; or to
                prevent death or imminent bodily harm. For example, we may provide information to third-party partners about the
                reliability of your account to prevent fraud and abuse on and off our services. Information that we receive about you,
                including financial transaction data related to purchases made with Flyked.com, may be accessed, processed and retained
                for an extended period of time when it is the subject of a legal request or obligation, governmental investigation, or
                investigations concerning possible violations of our terms or policies, or otherwise to prevent harm. We also may retain
                information from accounts disabled for violations of our terms for at least a year to prevent repeat abuse or other violations of our terms.
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
                How will we notify you of changes to this policy?
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                We’ll notify you before we make changes to this policy and give you the opportunity to review and comment on the revised
                policy before continuing to use our services.
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
                How to contact Flyked.com with questions
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                To learn more about how privacy works on Flyked.com, here&#39;s how you can reach us:
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '1.8rem' }}
              >
                Address: 1093, Prestige Shantiniketan, Whitefield, Bengaluru – 560066 or alternatively you can reach at&nbsp;
                <a href="mailto:info@flyked.com" style={{ color: '#1c71fb' }}>info@flyked.com</a>
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '1.8rem' }}
              >
                Click here to know more about &nbsp;
                <Link to="/settings/cookies_policy" style={{ color: '#1c71fb' }}>
                  Cookies Policy
                </Link>
              </FlTypography>
            </FlBox>
          </FlGrid>
          <FlGrid item md={1} />
        </FlGrid>
      </FlContainer>
    </PageLayout>
  );
};

export default PrivacyPolicy;
