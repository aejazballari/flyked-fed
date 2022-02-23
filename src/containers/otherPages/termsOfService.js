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

const TermsOfService = () => {
  const footer = true;
  const classes = useStyles();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout footer={footer}>
      <PageMetaTags title="Flyked - Terms of Service" description="Terms of Service" image="" currentUrl={window?.location?.href || ''} />
      <FlContainer style={{ marginTop: isMobile ? '4rem' : '4.5rem', marginBottom: isMobile ? '6rem' : '4.5rem' }}>
        <FlGrid container spacing={0}>
          <FlGrid item md={1} />
          <FlGrid item md={10}>
            <FlBox style={{ backgroundColor: '#ffffff', padding: isMobile ? '1rem' : '3rem' }}>
              <FlTypography
                className={classes.heading}
              >
                Terms & Conditions
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
                Terms of Use
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                By using the Flyked.com website and Flyked service you are agreeing to be bound by the following terms and conditions (“Terms of Use” ).
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
                Flyked Service
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                The Service includes all of the Flyked products, features, applications, services, technologies and software: To bring you
                closer to the people and things you love. The Service is made up of the following aspects:
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
                Basic Terms
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                <ol style={{ padding: '0px', paddingLeft: '1rem' }}>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must be 13 years or the minimum legal age in your country to use this site.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You may not post nude, partially nude, or sexually suggestive photos.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You are responsible for any activity that occurs under your screen name.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You are responsible for keeping your password secure.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not abuse, harass, threaten, impersonate or intimidate other Flyked users.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You may not use the Flyked service for any illegal or unauthorized purpose. International users agree to comply with all
                      local laws regarding online conduct and acceptable content.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You are solely responsible for your conduct and any data, text, information, screen names, graphics, photos, profiles,
                      audio and video clips, links (“Content”) that yousubmit, post, and display on the Flyked service.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not modify, adapt or hack Flyked or modify another website so as to falsely imply that it is associated with
                      Flyked.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not access Flyked&#39;s private API by any other means other than the Flyked application itself.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not crawl, scrape, or otherwise cache any content from Flyked including but not limited to user profiles and
                      photos.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not create or submit unwanted email or comments to any Flyked members (“Spam”).
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not use web URLs in your name without prior written consent from Flyked,inc.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not transmit any worms or viruses or any code of a destructive nature.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You must not, in the use of Flyked, violate any laws in your jurisdiction (including but not limited to copyright laws).
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      Violation of any of these agreements will result in the termination of your Flyked account. While Flyked prohibits such
                      conduct and content on its site, you understand and agree that Flyked cannot be responsible for the Content posted on
                      its web site and you nonetheless may be exposed to such materials and that you use the Flyked service at your own
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You can’t modify, translate, create derivative works of or reverse engineer our products or their components.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You can’t use a domain name or URL in your username without our prior written consent.
                    </FlTypography>
                  </li>
                </ol>
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
                General Conditions
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                <ol style={{ padding: '0px', paddingLeft: '1rem' }}>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      We reserve the right to modify or terminate the Flyked service for any reason, without notice at any time.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      We reserve the right to alter these Terms of Use at any time. If the alterations constitute a material change to the Terms
                      of Use, we will notify you via internet mail according to the preference expressed on your account. What constitutes a
                      “material change” will be determined at our sole discretion, in good faith and using common sense and reasonable
                      judgement.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      We reserve the right to refuse service to anyone for any reason at any time.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      We reserve the right to force forfeiture of any username that becomes inactive, violates trademark, or may mislead
                      other users.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      We may, but have no obligation to, remove content and accounts containing content that we determine in our sole
                      discretion are unlawful, offensive, threatening, libelous, defamatory, obscene or otherwise objectionable or violates any
                      party’s intellectual property or these Terms of Use.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      We reserve the right to reclaim usernames on behalf of businesses or individuals that hold legal claim or trademark on
                      those usernames.
                    </FlTypography>
                  </li>
                </ol>
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
                Proprietary Rights in Content on Flyked
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                <ol style={{ padding: '0px', paddingLeft: '1rem' }}>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      Flyked does NOT claim ANY ownership rights in the text, files, images, photos, video, sounds, musical works, works of
                      authorship, applications, or any other materials (collectively, &quot;Content&quot;) that you post on or through the
                      Flyked services. By displaying or publishing (&quot;posting&quot;) any content on or through the Flyked Services, you
                      hereby grant to Flyked a non-exclusive, fully paid and royalty-free, worldwide, limited license to use, modify, delete from,
                      add to, publicly perform, publicly display, reproduce and translate such content, including without limitation distributing
                      part or all of the site in any media formats through any media channels, except content not shared publicly (“private”)
                      will not be distributed outside the Flyked services.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      Some of the Flyked services are supported by advertising revenue and may display advertisements and promotions, and
                      you hereby agree that Flyked may place such advertising and promotions on the Flyked services or on, about, or in
                      conjunction with your content. The manner, mode and extent of such advertising and promotions are subject to change
                      without specific notice to you.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You represent and warrant that: (i) you own the content posted by you on or through the Flyked Services or otherwise
                      have the right to grant the license set forth in this section, (ii) the posting and use of your content on or through the
                      Flyked Services does not violate the privacy rights, publicity rights, copyrights, contract rights, intellectual property rights
                      or any other rights of any person, and (iii) the posting of your content on the site does not result in a breach of contract
                      between you and a third party. You agree to pay for all royalties, fees, and any other monies owing any person by reason
                      of content you post on or through the Flyked Services.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      The Flyked Services contain content of Flyked (&quot;Flyked Content&quot;). Flyked content is protected by copyright,
                      trademark, patent, trade secret and other laws, and Flyked owns and retains all rights in the Flyked content and the
                      Flyked services. Flyked hereby grants you a limited, revocable, non-sublicensable license to reproduce and display the
                      Flyked content (excluding any software code) solely for your personal use in connection with viewing the site and using
                      the Flyked services.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      The Flyked services contain content of users and other Flyked licensors. Except as provided within this agreement, you
                      may not copy, modify, translate, publish, broadcast, transmit, distribute, perform, display, or sell any content appearing
                      on or through the Flyked services.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      Flyked performs technical functions necessary to offer the Flyked services, including but not limited to transcoding and/
                      or reformatting content to allow its use throughout the Flyked services.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      Although the site and other Flyked services are normally available, there will be occasions when the site or other Flyked
                      services will be interrupted for scheduled maintenance or upgrades, for emergency repairs, or due to failure of
                      telecommunications links and equipment that are beyond the control of Flyked. Also, although Flyked will normally only
                      delete content that violates this agreement, Flyked reserves the right to delete any Content for any reason, without prior
                      notice. Deleted content may be stored by Flyked in order to comply with certain legal obligations and is not retrievable
                      without a valid court order. Consequently, Flyked encourages you to maintain your own backup of your content. In other
                      words, Flyked is not a backup service. Flyked will not be liable to you for any modification, suspension, or
                      discontinuation of the Flyked services, or the loss of any content.
                    </FlTypography>
                  </li>
                  <li style={{ fontWeight: 'bold' }}>
                    <FlTypography className={classes.text}>
                      You can’t sell, licence or purchase any account or data obtained from us or our service. This includes attempts to buy,
                      sell or transfer any aspect of your account (including your username); solicit, collect or use login credentials or badges
                      of other users; or request or collect Flyked usernames, passwords or misappropriate access tokens.
                    </FlTypography>
                  </li>
                </ol>
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
                Liability
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                <ul style={{ padding: '0px', paddingLeft: '1rem' }}>
                  <li>
                    Our Service is provided &quot;as is&quot;, and we can&#39;t guarantee that it will be safe and secure or will work perfectly
                    all the time. TO THE EXTENT PERMITTED BY LAW, WE ALSO DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR
                    IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE
                    AND NON-INFRINGEMENT.
                  </li>
                  <li>
                    We also don’t control what people and others do or say, and we aren’t responsible for their (or your) actions or conduct
                    (whether online or offline) or content (including unlawful or objectionable content). We also aren’t responsible for services
                    and features offered by other people or companies, even if you access them through our Service.
                  </li>
                  <li>
                    Our responsibility for anything that happens on the service (also called “liability&quot”) is limited as much as the law will
                    allow. If there is an issue with our service, we can’t know what all the possible impacts might be. You agree that we won’t
                    be responsible (“liable”) for any lost profits, revenues, information or data, or consequential, special, indirect, exemplary,
                    punitive or incidental damages arising out of or related to these Terms, even if we know that they are possible. This
                    includes when we delete your content, information or account.
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
                Jurisdiction
              </FlTypography>
              <FlTypography
                className={classes.text}
                style={{ marginTop: '0.5rem' }}
              >
                If you are a consumer, the laws of the country in which you reside will apply to any claim, cause of action or dispute that
                you have against us that arises out of or relates to these Terms (“claim”), and you may resolve your claim in any competent
                court in that country that has jurisdiction over the claim. In all other cases, you agree that the claim must be resolved
                exclusively in the courts in Bangalore, Karnataka, India, that you submit to the personal jurisdiction of these courts for the
                purpose of litigating any such claim, and that the Indian laws will govern these Terms and any claim, without regard to
                conflict of law provisions.
              </FlTypography>
            </FlBox>
          </FlGrid>
          <FlGrid item md={1} />
        </FlGrid>
      </FlContainer>
    </PageLayout>
  );
};

export default TermsOfService;
