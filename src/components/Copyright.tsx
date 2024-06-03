import { IonText } from "@ionic/react";


const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <IonText className="copyright">Copyright © {year} SkillSwap</IonText>
  )
}

export default Copyright