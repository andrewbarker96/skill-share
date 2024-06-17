import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRouterOutlet } from '@ionic/react';
import React, { FC, useEffect, useState } from 'react';
import UserProfilePage from './UserProfile';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { firebase, auth } from '../../util/firebase';
import { onAuthStateChanged } from 'firebase/auth';


// THIS FILE NEEDS TO BE DELETED!!!

// const ProfilePage: FC<RouteComponentProps> = ({ match }) => {
//   const uid = auth.currentUser?.uid;

//   return (
//     <IonPage>
//       <IonRouterOutlet>
//         <Route exact path={match.url} render={() => <Redirect to={`${match.url}/${uid}`} />} />
//         <Route path={`${match.url}/:uid`} component={UserProfilePage} />
//         <Route render={() => <Redirect to={match.url} />} />
//       </IonRouterOutlet>

//     </IonPage>
//   );
// };

// export default ProfilePage;
