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
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/profile/:uid" component={UserProfilePage} exact />
                  <Route path="/events" render={() => <EventsPage />} exact={true} />
                  <Route path="/skill-swap" render={() => <SkillSwapPage />} />
                  <Route path="/chat" render={() => <ChatDashboard />} />
                  <Route path="/chat/new" render={() => <NewChatPage />} />
                  <Route path="/chats/:chatId" render={() => <IndividualChat />} />
                  <Route path="/update-profile" render={() => <UpdateProfilePage />} />
                </Switch>
              </IonRouterOutlet>
              <IonTabBar slot='bottom' selectedTab='Home'>
                <IonTabButton tab='Home' href='/' selected={location.pathname === '/'} >
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Skill Swap' href='/skill-swap' selected={location.pathname === '/skill-swap'}>
                  <IonIcon icon={addCircle} />
                  <IonLabel>Skill Swap</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Messages' href='/chat' selected={location.pathname === '/chat'}>
                  <IonIcon icon={chatbubbleEllipses} />
                  <IonLabel>Chat</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Profile' href={uid ? `/profile/${uid}` : '#'} selected={location.pathname.startsWith('/profile')}>
                  <IonIcon icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <IonRouterOutlet>
              <Switch>
                <Route path="/" render={() => <LoginPage />} />
                <Route path="/create-account" render={() => <CreateAccountPage />} />
                <Route path="/password-reset" render={() => <ForgotPasswordPage />} />
              </Switch>
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            </IonRouterOutlet>
          )}
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
