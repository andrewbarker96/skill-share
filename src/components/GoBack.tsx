import { IonButton, IonButtons, IonIcon, IonText } from '@ionic/react'
import { arrowBack, arrowBackCircle } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

const GoBackOption: React.FC = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <IonButtons slot="start" id='main-content'>
      <IonButton onClick={goBack}>
        <IonIcon slot="start" icon={arrowBack} />
        {/* <IonText>Back</IonText> */}
      </IonButton>
    </IonButtons>
  )
}

export default GoBackOption