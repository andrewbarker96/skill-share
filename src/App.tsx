import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact,
  IonButton,
  IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../util/firebase';
import { home, addCircle, chatbubbleEllipses, person } from 'ionicons/icons';
import TopMenu from './components/TopMenu';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CreateAccountPage from './pages/CreateAccount';
import ForgotPasswordPage from './pages/ForgotPassword';
import UserProfilePage from './pages/UserProfile';
import EventsPage from './pages/Events';
import SkillSwapPage from './pages/SkillSwap';
import ChatDashboard from './pages/ChatDashboard';
import NewChatPage from './pages/NewChatPage';
import IndividualChat from './components/Messaging/chat/chat';
import UpdateProfilePage from './pages/UpdateProfile';
import PrivacyPolicy from './components/PrivacyPolicy';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <IonLoading isOpen={true} message={"Loading..."} />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonContent className='main-content'>
          {isAuth ? (
            <IonTabs>
              <IonRouterOutlet>
                <Redirect exact path="/" to="/home" />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/profile/:uid" component={UserProfilePage} />
                <Route exact path="/events" component={EventsPage} />
                <Route exact path="/skill-swap" component={SkillSwapPage} />
                <Route exact path="/chat" component={ChatDashboard} />
                <Route exact path="/chat/new" component={NewChatPage} />
                <Route exact path="/chats/:chatId" component={IndividualChat} />
                <Route exact path="/update-profile" render={() => <UpdateProfilePage />} />
              </IonRouterOutlet>
              <IonTabBar slot='bottom' style={{ paddingTop: '2%', paddingBottom: '1%' }}>
                <IonTabButton tab='home' href='/home'>
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='skill-swap' href='/skill-swap'>
                  <IonIcon icon={addCircle} />
                  <IonLabel>Skill Swap</IonLabel>
                </IonTabButton>
                <IonTabButton tab='chat' href='/chat'>
                  <IonIcon icon={chatbubbleEllipses} />
                  <IonLabel>Chat</IonLabel>
                </IonTabButton>
                <IonTabButton tab='profile' href={auth.currentUser?.uid ? `/profile/${auth.currentUser.uid}` : '#'}>
                  <IonIcon icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <IonRouterOutlet>
              <Redirect exact path="/home" to="/" />
              <Route exact path="/" component={LoginPage} />
              <Route path="/create-account" component={CreateAccountPage} />
              <Route exact path="/password-reset" component={ForgotPasswordPage} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            </IonRouterOutlet>
          )}
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
