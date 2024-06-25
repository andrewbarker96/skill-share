import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

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

const App: React.FC <{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const uid = auth.currentUser?.uid;
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
              <IonRouterOutlet>

              <Route path="/skill-swap" component={SkillSwapPage} exact />
              <Route path="/profile/:uid" component={UserProfilePage} exact />
              <Redirect from="/" to="/skill-swap" exact />

                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={UserProfilePage} />
                <Route exact path="/events" component={EventsPage} />
                <Route exact path="/skills" component={SkillSwapPage} />
                <Route exact path="/chat" component={ChatDashboard} />
                <Route exact path="/chat/new" component={NewChatPage} />
                <Route exact path="/chats/:chatId" component={IndividualChat} />
                <Route exact path="/update-profile" component={UpdateProfilePage} />
              </IonRouterOutlet>
              <IonTabBar slot='bottom'>
                <IonTabButton tab='Home' href='/'>
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Skills' href='/skills'>
                  <IonIcon icon={addCircle} />
                  <IonLabel>Skills</IonLabel>
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
            <IonRouterOutlet>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/create-account" component={CreateAccountPage} />
              <Route exact path="/password-reset" component={ForgotPasswordPage} />
            </IonRouterOutlet>
          )}
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
