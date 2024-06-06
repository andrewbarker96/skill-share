import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { adminAuth, auth } from '../util/firebase';
import { ellipse, square, triangle } from 'ionicons/icons';
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
import ProfilePage from './pages/Profile';
import CreateAccountPage from './pages/CreateAccount';
import ForgotPasswordPage from './pages/ForgotPassword';
import ProfileForm from './components/ProfileForm';

setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <IonContent className='main-content'>
        <IonReactRouter>
          <IonRouterOutlet>
            <Redirect exact path="/home" to="/" />
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route exact path="/create-account">
              <CreateAccountPage />
            </Route>
            <Route exact path="/password-reset">
              <ForgotPasswordPage />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
