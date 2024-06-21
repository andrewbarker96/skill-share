import React from 'react';
import './UserInfo.css';
import { IonAvatar, IonButton, IonButtons, IonCol, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
import { ellipsisHorizontal, informationCircle, shareOutline } from 'ionicons/icons';

interface UserInfoProps {
  username: string;
  profilePicture: string; // Change profileImage to profilePicture
}

const UserInfo: React.FC<UserInfoProps> = ({ username, profilePicture }) => {
  return (
    <>
      <IonRow className='userInfo'>
        <IonCol size='2'>
          <IonAvatar>
            <IonImg className='avatar' src={profilePicture} />
          </IonAvatar>
        </IonCol>
        <IonCol size='8'>
          <IonText>
            <h2>{username}</h2>
          </IonText>
        </IonCol>
        <IonCol size='2' className='buttons'>
          <IonButtons>
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
        </IonCol>
      </IonRow>
    </>
  );
};

export default UserInfo;
