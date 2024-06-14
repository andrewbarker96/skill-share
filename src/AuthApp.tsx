import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { adminAuth, auth } from '../util/firebase';
import { add, addCircle, calendar, chatbubble, chatbubbleEllipses, ellipse, home, person, search, square, triangle } from 'ionicons/icons';
import TopMenu from './components/TopMenu';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import UserProfilePage from './components/UserProfilePage';
import EventsPage from './pages/Events';
import SkillSwapPage from './pages/SkillSwap';
import ChatView from './components/Messaging/ChatView';
import { NewChatView } from './components/Messaging/NewChat';
import ChatDashboard from './pages/ChatDashboard';

setupIonicReact();

const AuthApp: React.FC = () => {

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonButton fill='clear' slot='icon-only'>
            <IonIcon icon={search} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className='main-content'>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/home" to="/" />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile" component={UserProfilePage} />
              <Route exact path="/events" component={EventsPage} />
              <Route exact path="/skills" component={SkillSwapPage} />
              <Route exact path="/chat" component={ChatDashboard} />
              <Route exact path="/chat/:id" component={ChatView} />
              <Route exact path="/chat/new" component={NewChatView} />
            </IonRouterOutlet>

            <IonTabBar slot={'bottom'}>
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
              <IonTabButton tab='Profile' href='/profile'>
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default AuthApp;
