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
import { home, addCircle, chatbubbleEllipses, person, search } from 'ionicons/icons';
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
interface AppProps {
  isAuthenticated: boolean;
}

const App: React.FC<AppProps> = ({ isAuthenticated }) => {
  const uid = auth.currentUser?.uid;
  console.log(uid)
  const history = useHistory();

  const goToProfile = () => {
    if (uid) {
      history.push(`/profile/${uid}`);
    } else {
      console.error('No user is currently logged in.');
    }
  };

  return (
    <IonApp>
      {isAuthenticated && (
        <IonHeader>
          <IonToolbar>
            <TopMenu />
            <IonButton fill='clear' slot='icon-only' onClick={goToProfile}>
              <IonIcon icon={search} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent className='main-content'>
        <IonReactRouter>
          {isAuthenticated ? (
            <IonTabs>
              <IonRouterOutlet><Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile/:uid" component={UserProfilePage} exact />
                <Route exact path="/events" component={EventsPage} />
                <Route exact path="/skill-swap" component={SkillSwapPage} />
                <Route exact path="/chat" component={ChatDashboard} />
                <Route exact path="/chat/new" component={NewChatPage} />
                <Route exact path="/chats/:chatId" component={IndividualChat} />
                <Route exact path="/update-profile" component={UpdateProfilePage} />
              </Switch>
              </IonRouterOutlet>
              <IonTabBar slot='bottom'>
                <IonTabButton tab='Home' href='/'>
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Skill Swap' href='/skill-swap'>
                  <IonIcon icon={addCircle} />
                  <IonLabel>Skill Swap</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Messages' href='/chat'>
                  <IonIcon icon={chatbubbleEllipses} />
                  <IonLabel>Chat</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Profile' href={uid ? `/profile/${uid}` : '#'}>
                  <IonIcon icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <IonRouterOutlet><Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/create-account" component={CreateAccountPage} />
              <Route exact path="/password-reset" component={ForgotPasswordPage} /></Switch>
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            </IonRouterOutlet>
          )}
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
