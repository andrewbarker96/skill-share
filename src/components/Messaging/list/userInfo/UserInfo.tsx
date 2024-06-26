import React from 'react';
import './UserInfo.css';
import { IonAvatar, IonButton, IonButtons, IonCol, IonIcon, IonImg, IonItem, IonRow, IonText } from '@ionic/react';
import { ellipsisHorizontal, informationCircle, shareOutline } from 'ionicons/icons';

interface UserInfoProps {
  username: string;
  profilePicture: string; // Change profileImage to profilePicture
}

const UserInfo: React.FC<UserInfoProps> = ({ username, profilePicture }) => {
  return (
    <IonItem lines='none' className='userInfo'>
      <IonAvatar className='avatar' slot='start'>
        <IonImg src={profilePicture} />
      </IonAvatar>
      <IonText>
        <h3>{username}</h3>
      </IonText>

      <IonButtons slot='end'>
        <IonButton>
          <IonIcon icon={ellipsisHorizontal} />
        </IonButton>
        <IonButton>
          <IonIcon icon={shareOutline} />
        </IonButton>
        <IonButton>
          <IonIcon icon={informationCircle} />
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default UserInfo;
