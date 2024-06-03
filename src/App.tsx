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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import ProfilePage from './pages/Profile';

setupIonicReact();

const App: React.FC = () => {
  const [authUser, setAuthUser] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
        if (adminAuth.includes(user.uid)) {
          setAdminUser(true);
        } else {
          setAdminUser(false);
        }
      } else {
        setAuthUser(false);
        setAdminUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
        </IonToolbar>
      </IonHeader>
      <IonContent className='main-content'>
        <IonReactRouter>
          <IonTabs>

            {/* Routing */}
            <IonRouterOutlet>
              <Route exact path="/">
                {authUser ? <HomePage /> : <LoginPage />}
              </Route>
              <Route exact path="/Profile">
                <ProfilePage />
              </Route>
            </IonRouterOutlet>

            {/* Tab Bar */}
            <IonTabBar slot={'bottom'}>
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
              <IonTabButton tab='Profile' href='/Profile'>
                <IonIcon icon={square} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
