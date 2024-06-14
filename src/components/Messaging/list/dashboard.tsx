import React from 'react'
import './dashboard.css'
import { IonContent } from '@ionic/react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

const MessageDashboard = () => {
  return (
    <IonContent>
      <ChatList />
    </IonContent>
  )
}

export default MessageDashboard