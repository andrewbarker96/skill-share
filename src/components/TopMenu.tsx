import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonText,
  IonLoading,
} from '@ionic/react';
import { logOutOutline, close, calendarOutline, shieldHalf, home, personAdd, person, add, chatbubble, chatbubbleEllipses, addCircle } from 'ionicons/icons';
import Copyright from './Copyright';
import { adminAuth, auth } from '../../util/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const TopMenu: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <>
      {/* How Menu Appears after Clicked */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton>
                <IonIcon icon={close} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="block"
              routerLink='/'
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={home} style={{ marginRight: '10px' }} />
              <IonText>Home</IonText>
            </IonButton>
          </IonButtons>
          <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="block"
              routerLink={`/profile/${auth.currentUser?.uid}`}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={person} style={{ marginRight: '10px' }} />
              <IonText>Profile</IonText>
            </IonButton>
          </IonButtons>
          <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="block"
              routerLink='/chat'
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={chatbubbleEllipses} style={{ marginRight: '10px' }} />
              <IonText>Chat</IonText>
            </IonButton>
          </IonButtons>
          <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="block"
              routerLink='/skill-swap'
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={addCircle} style={{ marginRight: '10px' }} />
              <IonText>Swap Skills</IonText>
            </IonButton>
          </IonButtons>
          {/* <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="block"
              routerLink='/events'
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={calendarOutline} style={{ marginRight: '10px' }} />
              <IonText>Events</IonText>
            </IonButton>
          </IonButtons> */}
          <IonButtons className='top-menu-button'>
            <IonButton
              id='open-loading'
              fill="clear"
              expand="block"
              onClick={handleLogout}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={logOutOutline} style={{ marginRight: '10px' }} />
              <IonText>Logout</IonText>
            </IonButton>
          </IonButtons>
          <IonLoading className='custom-loading' trigger='open-loading' isOpen={success} onDidDismiss={() => setSuccess(false)} message='Logging Out' duration={2000} />
          <Copyright />
        </IonContent>
      </IonMenu>

      {/* Menu Appears when not clicked. */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent />
      </IonPage>
    </>
  );
};

export default TopMenu;
