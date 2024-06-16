// src/components/SkillsForm.tsx
import React, { useState } from 'react';
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, IonListHeader, IonIcon, IonRow, IonCol, IonText } from '@ionic/react';
import { arrowForward, arrowDown } from 'ionicons/icons';
import { Skills } from '../types';

interface Props {
  formData: any;
  allSkills: Skills;
  handleSkillChange: (category: string, subcategory: string, skill: string, isChecked: boolean) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const SkillsForm: React.FC<Props> = ({ formData, allSkills, handleSkillChange, handleNext, handlePrev }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
  };

  console.log('all skills: ', allSkills)

  return (
    <IonRow>
      <IonCol size='12'>
        <IonText>
          <h2>Skills</h2>
        </IonText>
        <IonList>
          {Object.keys(allSkills).map((categoryName) => (
            <div key={categoryName}>
              <IonListHeader onClick={() => toggleCategory(categoryName)}>
                <IonLabel style={{ fontSize: '1.2rem', fontWeight: 'bold'}} >{categoryName}</IonLabel>
                <IonIcon
                  icon={expandedCategory === categoryName ? arrowDown : arrowForward}
                  slot="end"
                  style={{ fontSize: '1.2rem'}}
                />
              </IonListHeader>
              {expandedCategory === categoryName &&
                Object.keys(allSkills[categoryName]).map((subcategoryName) => (
                  <div key={subcategoryName} style={{ marginLeft:'1.25rem'}}>
                    <IonItem>
                      <IonLabel style={{ fontSize: '1rem', fontWeight: 'bold'}}>
                        {subcategoryName}
                      </IonLabel>
                      {allSkills[categoryName][subcategoryName].map((skill, index) => (
                        <IonItem key={index} lines="none" style={{ display: 'flex', alignItems: 'center' }}>
                          <IonCheckbox
                            checked={formData.skillsOffered[categoryName]?.[subcategoryName]?.includes(skill)}
                            onIonChange={(e) =>
                              handleSkillChange(categoryName, subcategoryName, skill, e.detail.checked)
                            }
                          />
                          <IonLabel style={{ marginLeft: '.625rem' }}>{skill}</IonLabel>
                        </IonItem>
                      ))}
                    </IonItem>
                  </div>
                ))}
            </div>
          ))}
        </IonList>
        <IonButton expand="block" onClick={handlePrev}>Previous</IonButton>
        <IonButton expand="block" onClick={handleNext}>Next</IonButton>
      </IonCol>
    </IonRow>
  );
};

export default SkillsForm;
