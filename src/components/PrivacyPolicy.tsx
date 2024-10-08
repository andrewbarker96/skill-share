import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonLabel, IonButton, IonButtons, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

interface PrivacyPolicyProps {
  dismissModal: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ dismissModal }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot='start'>
                <IonButton size='large' slot='icon-only' fill='clear' onClick={dismissModal}>
                <IonIcon icon={arrowBack} />
                </IonButton>
            </IonButtons>
          <IonTitle>Return</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <div>
            <strong>
              <span style={{ fontSize: '26px' }}>
                <span>PRIVACY POLICY</span>
              </span>
            </strong>
          </div>
          <div><br /></div>
          <div>
            <span style={{ color: 'rgb(127, 127, 127)' }}>
              <strong>
                <span style={{ fontSize: '15px' }}>
                  Last updated <span>June 24, 2024</span>
                </span>
              </strong>
            </span>
          </div>
          <div><br /></div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <span style={{ color: 'rgb(127, 127, 127)' }}>
              <span style={{ color: 'rgb(89, 89, 89)', fontSize: '15px' }}>
                This privacy notice for <span>Skill Swap</span> ("<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>"), describes how and why we might collect, store, use, and/or share ("<strong>process</strong>") your information when you use our services ("<strong>Services</strong>"), such as when you:
              </span>
            </span>
          </div>
          <ul>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <span>Download and use our mobile application (Skill Swap), or any other application of ours that links to this privacy notice</span>
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <span>Engage with us in other related ways, including any sales, marketing, or events</span>
              </IonText>
            </li>
          </ul>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong>Questions or concerns? </strong>Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <span>ablack5@live.maryville.edu</span>.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>SUMMARY OF KEY POINTS</span></strong>
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px' }}>
            <strong><em>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our </em></strong>
            <a href="#toc"><span style={{ color: 'rgb(0, 58, 250)', fontSize: '15px' }}><strong><em>table of contents</em></strong></span></a>
            <strong><em> below to find the section you are looking for.</em></strong>
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about 
            <a href="#personalinfo"><span style={{ color: 'rgb(0, 58, 250)', fontSize: '15px' }}>personal information you disclose to us</span></a>.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about 
            <a href="#infouse"><span style={{ color: 'rgb(0, 58, 250)', fontSize: '15px' }}>how we process your information</span></a>.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about 
            <a href="#whoshare"><span style={{ color: 'rgb(0, 58, 250)', fontSize: '15px' }}>when and with whom we share your personal information</span></a>.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>How do we keep your information safe?</strong> We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about 
            <a href="#infosafe"><span style={{ color: 'rgb(0, 58, 250)', fontSize: '15px' }}>how we keep your information safe</span></a>.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about 
            <a href="#privacyrights"><span style={{ color: 'rgb(0, 58, 250)', fontSize: '15px' }}>your privacy rights</span></a>.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by 
            <a href="https://app.termly.io/notify/2bf8a6d8-c390-455f-8da0-98c5495fc22e" rel="noopener noreferrer" target="_blank" style={{ color: 'rgb(0, 58, 250)' }}>submitting a data subject access request</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            Want to learn more about what we do with any information we collect? 
            <a href="#toc" style={{ color: 'rgb(0, 58, 250)' }}>Review the privacy notice in full</a>.
          </div>
          <div><br /></div>
          <div><br /></div>
          <div id="toc" style={{ lineHeight: '1.5' }}>
            <span style={{ fontSize: '26px' }}><span>TABLE OF CONTENTS</span></span>
          </div>
          <div><br /></div>
          <ul>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>1. WHAT INFORMATION DO WE COLLECT?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>2. HOW DO WE PROCESS YOUR INFORMATION?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>4. HOW DO WE KEEP YOUR INFORMATION SAFE?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>5. WHAT ARE YOUR PRIVACY RIGHTS?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>6. CONTROLS FOR DO-NOT-TRACK FEATURES</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>7. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>8. DO WE MAKE UPDATES TO THIS NOTICE?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>9. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</IonText>
            </li>
            <li>
              <IonText style={{ fontSize: '15px', color: 'rgb(89, 89, 89)' }}>10. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</IonText>
            </li>
          </ul>
          <div><br /></div>
          <div id="personalinfo" style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>1. WHAT INFORMATION DO WE COLLECT?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>Personal information you disclose to us</span></strong>
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em>
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
          </div>
          <ul>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <span>names</span>
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <span>email addresses</span>
              </IonText>
            </li>
          </ul>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Sensitive Information.</strong> We do not process sensitive information.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>Information automatically collected</span></strong>
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em>
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
          </div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            Like many businesses, we also collect information through cookies and similar technologies.
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>The information we collect includes:</span></strong>
          </div>
          <ul>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps'), and hardware settings).
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>Location Data.</strong> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type of settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. Note, however, if you choose to opt out, you may not be able to use certain aspects of the Services.
              </IonText>
            </li>
          </ul>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>2. HOW DO WE PROCESS YOUR INFORMATION?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
          </div>
          <ul>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see "WHAT ARE YOUR PRIVACY RIGHTS?" below).
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To deliver targeted advertising to you.</strong> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more. For more information see our <a href="https://www.termsfeed.com/live/ff8da558-66f2-45d5-bf38-d55b3a73a655" target="_blank" rel="noopener">Cookie Notice</a>.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To determine the effectiveness of our marketing and promotional campaigns.</strong> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.
              </IonText>
            </li>
          </ul>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>We may share information in specific situations described in this section and/or with the following third parties.</em>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            We may need to share your personal information in the following situations:
          </div>
          <ul>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                <strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.
              </IonText>
            </li>
          </ul>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>4. HOW DO WE KEEP YOUR INFORMATION SAFE?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>We aim to protect your personal information through a system of organizational and technical security measures.</em>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>5. WHAT ARE YOUR PRIVACY RIGHTS?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>You may review, change, or terminate your account at any time.</em>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(0, 58, 250)' }}>here</a>.
          </div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            If you are located in Switzerland, the contact details for the data protection authorities are available <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(0, 58, 250)' }}>here</a>.
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            However, please note that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Account Information</strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            If you would at any time like to review or change the information in your account or terminate your account, you can:
          </div>
          <ul>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                Log in to your account settings and update your user account.
              </IonText>
            </li>
            <li style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
              <IonText>
                Contact us using the contact information provided.
              </IonText>
            </li>
          </ul>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt out of interest-based advertising by advertisers on our Services visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(0, 58, 250)' }}>http://www.aboutads.info/choices/</a>.
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>6. CONTROLS FOR DO-NOT-TRACK FEATURES</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>7. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            If you are under 18 years of age, reside in California, and have a registered account with the Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>8. DO WE MAKE UPDATES TO THIS NOTICE?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(127, 127, 127)' }}>
            <strong><em>In Short:</em></strong> <em>Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>9. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            If you have questions or comments about this notice, you may email us at <a href="mailto:herbacide25@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(0, 58, 250)' }}>herbacide25@gmail.com</a> or by post to:
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            <div>Herbacide Inc.</div>
            <div>1447 W 92 St</div>
            <div>Los Angeles, CA 90047</div>
            <div>United States</div>
          </div>
          <div><br /></div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5' }}>
            <strong><span style={{ fontSize: '15px' }}>10. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</span></strong>
          </div>
          <div><br /></div>
          <div style={{ lineHeight: '1.5', fontSize: '15px', color: 'rgb(89, 89, 89)' }}>
            Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request form by clicking <a href="https://app.termly.io/notify/54cbfbd2-1eec-4b95-85f7-d83c7ff2c0f6" target="_blank" rel="noopener" style={{ color: 'rgb(0, 58, 250)' }}>here</a>. We will respond to your request within 30 days.
          </div>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;
