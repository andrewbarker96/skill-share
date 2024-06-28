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
import "./Home.css";
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
                style={{ height: "50px", marginBottom: "5%", float: "left" }}
              />
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
              <IonText></IonText>
              <IonRow>
                <IonCol size="12">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Browse Skills</IonCardTitle>
                      <IonCardSubtitle>Skills to <span className="learn">Learn</span> & <span className="swap">Swap</span></IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        {/* Technical Skills ********************************************* */}

                        <h2>Technical Skills</h2>
                        <IonItem lines="none">
                          <IonAccordionGroup className="acc-group">
                            <IonAccordion value="first">
                              <IonItem
                                slot="header"
                                className="accordion-header"
                              >
                                <IonLabel>Programming Languages</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Python</li>
                                  <li>Java</li>
                                  <li>JavaScript</li>
                                  <li>C++</li>
                                  <li>C#</li>
                                  <li>Swift</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header">
                                <IonLabel>Web Development</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>HTML</li>
                                  <li>CSS</li>
                                  <li>React</li>
                                  <li>Angular</li>
                                  <li>Bootstrap</li>
                                  <li>Material Design</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Data Analysis</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>SQL</li>
                                  <li>R</li>
                                  <li>Python for Data Analysis</li>
                                  <li>Data Visualization</li>
                                </ul>
                              </div>
                            </IonAccordion>

                            <IonAccordion value="fourth">
                              <IonItem slot="header">
                                <IonLabel>DevOps</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Docker</li>
                                  <li>Kubernetes</li>
                                  <li>Jenkins</li>
                                  <li>CI/CD</li>
                                </ul>
                              </div>
                            </IonAccordion>

                            <IonAccordion value="fifth">
                              <IonItem slot="header">
                                <IonLabel>Cybersecurity</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Ethical Hacking</li>
                                  <li>Network Security</li>
                                  <li>Cryptography</li>
                                </ul>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>

                        {/* Creative Skills ********************************************* */}
                        <h2>Creative Skills</h2>
                        <IonItem>
                          <IonAccordionGroup className="acc-group">
                            <IonAccordion value="first">
                              <IonItem slot="header">
                                <IonLabel>Design</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Graphic Design</li>
                                  <li>UI/UX Design</li>
                                  <li>Adopbe Photoshop</li>
                                  <li>Figma</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header">
                                <IonLabel>Music</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Guitar Lessons</li>
                                  <li>Music Theory</li>
                                  <li>Drum Lessons</li>
                                  <li>Music Production</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Art</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Drawing</li>
                                  <li>Painting</li>
                                  <li>Sculpture</li>
                                  <li>Digital Art</li>
                                  <li>Multimedia</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="fourth">
                              <IonItem slot="header">
                                <IonLabel>Writing</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Creative Writing</li>
                                  <li>Investigative Journalism</li>
                                  <li>Content Creation</li>
                                  <li>Technical Writing</li>
                                </ul>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>

                        {/* Business  Skills ********************************************* */}

                        <h2>Business Skills</h2>
                        <IonItem>
                          <IonAccordionGroup className="acc-group">
                            <IonAccordion value="first">
                              <IonItem slot="header">
                                <IonLabel>Entrepreneurship</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Startups</li>
                                  <li>Business Planning</li>
                                  <li>Fundraising</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header">
                                <IonLabel>Finance</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Financial Analysis</li>
                                  <li>Budgeting</li>
                                  <li>Investment Strategies</li>
                                  <li>Economics</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Marekting</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Digital Marketting</li>
                                  <li>SEO</li>
                                  <li>Content Marketing</li>
                                  <li>Social Media Marketing</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="fourth">
                              <IonItem slot="header">
                                <IonLabel>Management</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Project Management</li>
                                  <li>Agile Methodologies</li>
                                  <li>Leadership Skills</li>
                                </ul>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>

                        {/* Personal Development  Skills ********************************************* */}

                        <h2>Personal Development Skills</h2>
                        <IonItem>
                          <IonAccordionGroup className="acc-group">
                            <IonAccordion value="first">
                              <IonItem slot="header">
                                <IonLabel>Health & Fitness</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Yoga</li>
                                  <li>Personal Training</li>
                                  <li>Crossfit</li>
                                  <li>Cardio</li>
                                  <li>Strength Training</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header">
                                <IonLabel>Languages</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Spanish</li>
                                  <li>French</li>
                                  <li>Mandarin</li>
                                  <li>German</li>
                                  <li>Portuguese</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Mindfulness</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Meditation</li>
                                  <li>Stress Management</li>
                                  <li>Time Management</li>
                                  <li>Organization</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="fourth">
                              <IonItem slot="header">
                                <IonLabel>Public Speaking</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Presentation Skills</li>
                                  <li>Speech Writing</li>
                                </ul>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>
                        {/*  Practical  Skills ********************************************* */}

                        <h2>Practical Skills</h2>
                        <IonItem>
                          <IonAccordionGroup className="acc-group">
                            <IonAccordion value="first">
                              <IonItem slot="header">
                                <IonLabel>Cooking</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Baking</li>
                                  <li>Grilling</li>
                                  <li>Meal Prep</li>
                                  <li>International Cuisines</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                              <IonItem slot="header">
                                <IonLabel>DIY & Crafting</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Carpentry</li>
                                  <li>Knitting</li>
                                  <li>Home Repairs</li>
                                </ul>
                              </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                              <IonItem slot="header">
                                <IonLabel>Gardening</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                <ul>
                                  <li>Urban Gardening</li>
                                  <li>Composting</li>
                                  <li>Hydroponics</li>
                                </ul>
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
