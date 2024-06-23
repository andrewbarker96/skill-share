import React, { useEffect, useState } from 'react';
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, IonListHeader, IonIcon, IonRow, IonCol, IonText, IonGrid } from '@ionic/react';
import { chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import { getSkills } from '../services/firestoreService';
import { Skills } from '../types';

interface Props {
  formData: any;
  handleSkillChange: (category: string, subcategory: string, skill: string, isChecked: boolean) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const SkillsForm: React.FC<Props> = ({ formData, handleSkillChange, handleNext, handlePrev }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [allSkills, setAllSkills] = useState<Skills>({}); 

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getSkills();
        setAllSkills(skillsData);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
  };

  return (
    <IonGrid >
    <IonRow>
      <IonCol size='12'>
        <IonText>
          <h2>Skills</h2>
        </IonText>
        <IonList>
          {Object.keys(allSkills).map((categoryName) => (
            <div key={categoryName}>
              <IonListHeader onClick={() => toggleCategory(categoryName)} style={{ display:'flex',alignItems:'center' }}>
                <IonIcon
                  icon={expandedCategory === categoryName ? chevronDownOutline : chevronForwardOutline}
                  // slot="end"
                  style={{ margin:'0 0.5rem 0.625rem 0rem'}}
                />
                <IonLabel style={{ fontSize: '1.2rem', fontWeight: 'bold'}} >{categoryName}</IonLabel>
              </IonListHeader>
              {expandedCategory === categoryName &&
                Object.keys(allSkills[categoryName]).map((subcategoryName) => (
                  <div key={subcategoryName} style={{ marginLeft:'2.25rem'}}>
                    <IonList style={{ display:'flex', flexDirection: 'column' }}>
                      <IonLabel style={{ fontSize: '1rem', fontWeight: 'bold',marginLeft: '1rem'}}>
                        {subcategoryName}
                      </IonLabel>
                      {allSkills[categoryName][subcategoryName].map((skill, index) => (
                        <IonItem key={index} lines="none" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                          <IonCheckbox
                            checked={formData.skillsOffered[categoryName]?.[subcategoryName]?.includes(skill)}
                            onIonChange={(e) =>
                              handleSkillChange(categoryName, subcategoryName, skill, e.detail.checked)
                            }
                            style={{ flex: '0 1 0px'}}
                          />
                          <IonLabel style={{ marginLeft: '.625rem' }}>{skill}</IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  </div>
                ))}
            </div>
          ))}
        </IonList>
        <IonButton expand="block" onClick={handlePrev}>Previous</IonButton>
        <IonButton expand="block" onClick={handleNext}>Next</IonButton>
      </IonCol>
    </IonRow>
    </IonGrid>
  );
};

export default SkillsForm;
