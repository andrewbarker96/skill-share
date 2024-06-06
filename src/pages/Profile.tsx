import { IonPage, IonRouterOutlet } from '@ionic/react';
import React, { FC, useEffect, useState } from 'react';
import UserProfilePage from '../components/UserProfilePage';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { firebase, auth } from '../../util/firebase';
import { onAuthStateChanged } from 'firebase/auth';


// DO NOT MODIFY THIS FILE
// File is routing to specific UID Profile Page
// see UserProfilePage.tsx for profile editing. 

const ProfilePage: FC<RouteComponentProps> = ({ match }) => {
  const uid = auth.currentUser?.uid;

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path={match.url} render={() => <Redirect to={`${match.url}/${uid}`} />} />
        <Route path={`${match.url}/:uid`} component={UserProfilePage} />
        <Route render={() => <Redirect to={match.url} />} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default ProfilePage;
