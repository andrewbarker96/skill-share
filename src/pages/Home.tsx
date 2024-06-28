import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardSubtitle,
  IonList,
  IonCardHeader,
  IonItem,
  IonTitle,
  IonCardTitle,
  IonToolbar,
  IonImg,
  IonText,
  IonCardContent,
  IonButton,
  IonModal,
  IonIcon,
  IonLabel,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonFabButton,
  IonSkeletonText,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";
import { person } from "ionicons/icons";
import { firestore, auth } from "../../util/firebase";
import React from "react";
import "./Home.css"
import TopMenu from "../components/TopMenu";

function HomePage() {
  const uid = auth.currentUser?.uid;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="6" className="justify-content-start">
              <IonImg
                src="https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap-Horizontal.png?alt=media&token=b1ac2ccd-0de3-4997-b50a-6ee7a07580a2"
                alt="SkillSwap Logo"
                style={{ height: "50px", marginBottom: "5%", float: "left" }} />
            </IonCol>
            <IonCol size="6">
              <IonFabButton
                color="light"
                style={{ float: "right" }}
                routerLink={`/profile/${auth.currentUser?.uid}`}
              >
                <IonIcon icon={person} />
              </IonFabButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h1>Welcome to Skill Swap!</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonText>
                <p>Find a skill to learn or teach</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonText>
              </IonText>
              <IonRow>
                <IonCol size="12">
                  <IonCard>

                    <IonCardHeader>
                      <IonCardTitle>Browse Skills</IonCardTitle>
                      <IonCardSubtitle>Skills to Learn & Swap</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <h2>Technical Skills</h2>
                        <IonItem lines="none">

                          <IonAccordionGroup className='acc-group'>
                            <IonAccordion value="first">
                              <IonItem slot="header" className='accordion-header'>
                                <IonLabel>Programming Languages</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <li>Python</li>
                                <li>Java</li>
                                <li>JavaScript</li>

                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header" >
                                <IonLabel>Web Development</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>HTML</li>
                                  <li>CSS</li>
                                  <li>React</li>
                                  <li>Angular</li></ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Data Analysis</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <li>SQL</li>
                                <li>R</li>
                                <li>Python for Data Analysis</li>
                                <li>Data Visualization</li>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>


                        <h2>Creative Skills</h2>

                        <IonItem>

                          <IonAccordionGroup className='acc-group'>
                            <IonAccordion value="first">
                              <IonItem slot="header" >
                                <IonLabel>Design</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <li>Graphic Design</li>
                                <li>UI/UX</li>
                                <li>Adopbe Photoshop</li>
                                <li>Adobe Illustrator</li>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header">
                                <IonLabel>Music</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <li>Instruments</li>
                                <li>Music Theory</li>
                                <li>Composition</li>
                                <li>Audio Production</li>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Art</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <li>Drawing</li>
                                <li>Painting</li>
                                <li>Sculpture</li>
                                <li>Digital Art</li>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>

                        <IonItem>
                          <IonLabel>Accordion Place Holder</IonLabel>
                        </IonItem>

                        <IonItem lines="none">
                          <IonLabel>Accordion Place Holder</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard></IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
