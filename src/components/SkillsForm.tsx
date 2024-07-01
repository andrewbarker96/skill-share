import React, { useEffect, useState } from 'react';
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, IonListHeader, IonIcon, IonRow, IonCol, IonText, IonGrid } from '@ionic/react';
import { addCircleOutline, chevronDownOutline, chevronForwardOutline, removeCircleOutline } from 'ionicons/icons';
import { getSkills } from '../services/firestoreService';
import { Skills } from '../types';

interface Props {
  mode: 'offered' | 'wanted';
  formData: any;
  handleSkillChange: (category: string, subcategory: string, skill: string, isChecked: boolean) => void;
  handleNext: () => void;
  handlePrev: () => void;
  filterOfferedSkills?: Skills;
}

const SkillsForm: React.FC<Props> = ({ mode, formData, handleSkillChange, handleNext, handlePrev, filterOfferedSkills }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<{ [key: string]: boolean }>({});
  const [allSkills, setAllSkills] = useState<Skills>({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getSkills();
        setAllSkills(skillsData);

        // Initialize categories and subcategories as collapsed
        const initialCategories: { [key: string]: boolean } = {};
        Object.keys(skillsData).forEach(categoryName => {
          initialCategories[categoryName] = false;
        });
        setExpandedCategories(initialCategories);

        const initialSubcategories: { [key: string]: boolean } = {};
        Object.values(skillsData).forEach(subcategories => {
          Object.keys(subcategories).forEach(subcategoryName => {
            initialSubcategories[subcategoryName] = false;
          });
        });
        setExpandedSubcategories(initialSubcategories);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prevCategories) => ({
      ...prevCategories,
      [categoryName]: !prevCategories[categoryName],
    }));
  };

  const toggleSubcategory = (subcategoryName: string) => {
    setExpandedSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [subcategoryName]: !prevSubcategories[subcategoryName],
    }));
  };

  const isSkillOffered = (category: string, subcategory: string, skill: string) => {
    return filterOfferedSkills && filterOfferedSkills[category]?.[subcategory]?.includes(skill);
  };

  const chevronColor = mode === 'wanted' ? '#2759AF' : '#FF3847';
  const subToggleColor = mode === 'wanted' ? '#2759AF' : '#FF3847';
  const categoryBorder = mode === 'wanted' ? '2px solid rgba(56, 128, 255, 0.70)' : '2px solid rgba(255, 56, 71, 0.56)';

  return (
    <IonGrid>
      <IonRow>
        <IonCol size='12'>
          <IonText>
            <h2>Skills {mode === 'offered' ? 'Offered' : 'Wanted'}</h2>
            <p>
              {mode === 'offered' ? (
                <>
                  What types of skills were you hoping <strong style={{ color: chevronColor }}>to swap</strong> on SkillSwap?
                </>
              ) : (
                <>
                  What types of skills were you hoping <strong style={{ color: chevronColor }}>to learn</strong> on SkillSwap?
                </>
              )}
            </p>
          </IonText>
          <IonList>
            {allSkills && Object.keys(allSkills).map((categoryName) => (
              <div key={categoryName}>
                <IonListHeader onClick={() => toggleCategory(categoryName)} style={{ display: 'flex' }}>
                  <IonIcon
                    icon={expandedCategories[categoryName] ? chevronDownOutline : chevronForwardOutline}
                    style={{ margin: '0 1.25rem 0.625rem 0rem', color: chevronColor, fontSize: '1.25rem' }}
                  />
                  <IonLabel style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{categoryName}</IonLabel>
                </IonListHeader>
                {expandedCategories[categoryName] && allSkills[categoryName] && Object.keys(allSkills[categoryName]).map((subcategoryName) => (
                  <div key={subcategoryName} style={{ marginLeft: '1.575rem', borderLeft: categoryBorder }}>
                    <IonListHeader onClick={() => toggleSubcategory(subcategoryName)} style={{ display: 'flex', marginLeft: '.575rem' }}>
                      <IonIcon
                        icon={expandedSubcategories[subcategoryName] ? removeCircleOutline : addCircleOutline}
                        style={{ margin: '0 0.875rem 0.625rem 0rem', color: subToggleColor, fontSize: '1.2rem' }}
                      />
                      <IonLabel style={{ fontSize: '1rem', fontWeight: 'bold' }}>{subcategoryName}</IonLabel>
                    </IonListHeader>
                    {expandedSubcategories[subcategoryName] && allSkills[categoryName][subcategoryName] && allSkills[categoryName][subcategoryName].map((skill, index) => {
                      if (mode === 'wanted' && isSkillOffered(categoryName, subcategoryName, skill)) {
                        return null; // Skip skills already offered
                      }
                      return (
                        <IonItem key={index} lines="none" style={{ display: 'flex', alignItems: 'center', marginLeft: '2.75rem' }}>
                          <IonCheckbox
                            checked={formData[mode === 'offered' ? 'skillsOffered' : 'skillsWanted']?.[categoryName]?.[subcategoryName]?.includes(skill) || false}
                            onIonChange={(e) =>
                              handleSkillChange(categoryName, subcategoryName, skill, e.detail.checked)
                            }
                            style={{ flex: '0 1 0px' }}
                          />
                          <IonLabel style={{ marginLeft: '.625rem' }}>{skill}</IonLabel>
                        </IonItem>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </IonList>
        </IonCol>
        <IonCol>
          <IonButton shape='round' expand="block" onClick={handleNext}>Next</IonButton>
          <IonButton fill="outline" shape='round' expand="block" onClick={handlePrev}>Previous</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SkillsForm;
