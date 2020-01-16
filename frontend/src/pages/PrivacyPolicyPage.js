import React from 'react';
import { Card, CardContent, Typography, Container, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  page: {
    display: 'flex',
    width: '100%',
    overflow: 'auto'
  },
  content: {
    marginTop: '10vh',
    paddingBottom: '5vh',
    '& p': {
      marginBottom: theme.spacing(5)
    }
  },
  card: {
    marginBottom: '10vh',
    padding: theme.spacing(2)
  }
}));

function PrivacyPolicyPage() {
  const classes = useStyle();

  return (
    <div className={classes.page}>
      <Container className={classes.content}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h2" component="h2">
              Privacy Policy
            </Typography>
            <Typography>Last updated January 06, 2020</Typography>
            <p>
              Thank you for choosing to be part of our community (“Company”, “we”, “us”, or “our”).
              We are committed to protecting your personal information and your right to privacy. If
              you have any questions or concerns about our notice , or our practices with regards to
              your personal information, please contact us at wanne036@umn.edu. When you visit our
              website classes-to-calendar.xyz, and use our services, you trust us with your personal
              information. We take your privacy very seriously. In this privacy notice, we seek to
              explain to you in the clearest way possible what information we collect, how we use it
              and what rights you have in relation to it. We hope you take some time to read through
              it carefully, as it is important. If there are any terms in this privacy notice that
              you do not agree with, please discontinue use of our Sites and our services.  This
              privacy notice applies to all information collected through our website (such as
              classes-to-calendar.xyz), and/or any related services, sales, marketing or events (we
              refer to them collectively in this privacy notice as the "Services").   Please read
              this privacy notice carefully as it will help you make informed decisions about
              sharing your personal information with us.  
            </p>
            <Typography variant="h6" component="h6">
              1. WHAT INFORMATION DO WE COLLECT AND HOW DO WE USE IT?  
            </Typography>
            <p>
              We collect no information from any users. All data that is used to complete the
              service provided by the website for a specific user is not knowingly retained
              anywhere. That is the design of the website. The data that is used during use is only
              for the function of the app and that is all.
            </p>
            <Typography variant="h6" component="h6">
              2. WILL YOUR INFORMATION BE SHARED WITH ANYONE?  
            </Typography>
            <p>
              In Short:  Your information will not be shared with anyone since we keep none of your
              information. If under any circumstance you find your information has been shared,
              please email wanne036 or report it.
            </p>
            <Typography variant="h6" component="h6">
              3. HOW LONG DO WE KEEP YOUR INFORMATION?
            </Typography>
             
            <p>
              In Short:  We don't keep any of your information. All information pertaining to a user
              is destroyed after they leave the site.
            </p>
            <Typography variant="h6" component="h6">
              4. HOW DO WE KEEP YOUR INFORMATION SAFE?
            </Typography>
              
            <p>
              In Short:  We aim to protect your personal information through a system of
              organizational and technical security measures.   We have implemented appropriate
              technical and organizational security measures designed to protect the security of any
              personal information we process. No personal information is retained after use, and
              all that is transmitted during use is sent with encryption over HTTPS. However, please
              also remember that we cannot guarantee that the internet itself is 100% secure.
              Although we will do our best to protect your personal information, transmission of
              personal information to and from our Services is at your own risk. You should only
              access the services within a secure environment. 
            </p>
            <Typography variant="h6" component="h6">
              5. DO WE COLLECT INFORMATION FROM MINORS?  
            </Typography>
             
            <p>
              In Short:  We do not knowingly collect data from or market to children under 18 years
              of age.   We do not knowingly solicit data from or market to children under 18 years
              of age. By using the Services, you represent that you are at least 18 or that you are
              the parent or guardian of such a minor and consent to such minor dependent’s use of
              the Services. If we learn that personal information from users less than 18 years of
              age has been collected, we will deactivate the account and take reasonable measures to
              promptly delete such data from our records. If you become aware of any data we have
              collected from children under age 18, please contact us at wanne036@umn.edu.
            </p>
            <Typography variant="h6" component="h6">
              6. WHAT ARE YOUR PRIVACY RIGHTS?
            </Typography>
              
            <p>
              If you are resident in the European Economic Area and you believe we are unlawfully
              processing your personal information, you also have the right to complain to your
              local data protection supervisory authority. You can find their contact details here: 
              <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
                http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
              </a>
              .
            </p>
            <Typography variant="h6" component="h6">
              7. CONTROLS FOR DO-NOT-TRACK FEATURES 
            </Typography>
             
            <p>
              Most web browsers and some mobile operating systems and mobile applications include a
              Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy
              preference not to have data about your online browsing activities monitored and
              collected. No uniform technology standard for recognizing and implementing DNT signals
              has been finalized. As such, we do not currently respond to DNT browser signals or any
              other mechanism that automatically communicates your choice not to be tracked online.
              If a standard for online tracking is adopted that we must follow in the future, we
              will inform you about that practice in a revised version of this privacy notice.
            </p>
            <Typography variant="h6" component="h6">
              8. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </Typography>
             
            <p>
              In Short:  Yes, if you are a resident of California, you are granted specific rights
              regarding access to your personal information.    California Civil Code Section
              1798.83, also known as the “Shine The Light” law, permits our users who are California
              residents to request and obtain from us, once a year and free of charge, information
              about categories of personal information (if any) we disclosed to third parties for
              direct marketing purposes and the names and addresses of all third parties with which
              we shared personal information in the immediately preceding calendar year. If you are
              a California resident and would like to make such a request, please submit your
              request in writing to us using the contact information provided below.  If you are
              under 18 years of age, reside in California, and have a registered account with the
              Services, you have the right to request removal of unwanted data that you publicly
              post on the Services. To request removal of such data, please contact us using the
              contact information provided below, and include the email address associated with your
              account and a statement that you reside in California. We will make sure the data is
              not publicly displayed on the Services, but please be aware that the data may not be
              completely or comprehensively removed from our systems.
            </p>
            <Typography variant="h6" component="h6">
              9. DO WE MAKE UPDATES TO THIS POLICY?
            </Typography>
              
            <p>
              In Short:  Yes, we will update this policy as necessary to stay compliant with
              relevant laws.   We may update this privacy notice from time to time. The updated
              version will be indicated by an updated “Revised” date and the updated version will be
              effective as soon as it is accessible. If we make material changes to this privacy
              notice, we may notify you either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review this privacy
              notice frequently to be informed of how we are protecting your information.
            </p>
            <Typography variant="h6" component="h6">
              10. HOW CAN YOU CONTACT US ABOUT THIS POLICY? 
            </Typography>
            <p>
              If you have questions or comments about this policy, you may email us at
              wanne036@umn.edu or by post to: Broden Wanner, 615 Fulton Street SE #214 Minneapolis,
              MN 55455, United States
            </p>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default PrivacyPolicyPage;
