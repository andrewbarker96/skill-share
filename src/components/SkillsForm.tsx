// src/components/SkillsForm.tsx
import React, { useState } from 'react';
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, IonListHeader, IonIcon } from '@ionic/react';
import { arrowForward, arrowDown } from 'ionicons/icons';

interface Props {
  formData: any;
  allSkills: any[];
  handleSkillChange: (category: string, subcategory: string, skill: string, isChecked: boolean) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const SkillsForm: React.FC<Props> = ({ formData, allSkills, handleSkillChange, handleNext, handlePrev }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
  };

  return (
    <div>
      <h2>Step 3: Skills</h2>
      <IonList>
        {allSkills.map((category: any) => (
          <div key={category.id}>
            <IonListHeader onClick={() => toggleCategory(category.name)}>
              {category.name}
              <IonIcon
                icon={expandedCategory === category.name ? arrowDown : arrowForward}
                slot="end"
              />
            </IonListHeader>
            {expandedCategory === category.name &&
              category.subcategories.map((subcategory: any) => (
                <div key={subcategory.id}>
                  <IonItem>
                    <IonLabel>
                      {subcategory.name}
                      {subcategory.subcategories.length > 0 && (
                        <IonIcon
                          icon={expandedCategory === subcategory.name ? arrowDown : arrowForward}
                          slot="end"
                          onClick={() => toggleCategory(subcategory.name)}
                        />
                      )}
                    </IonLabel>
                    {subcategory.skills.map((skill: any) => (
                      <IonCheckbox
                        key={skill.id}
                        checked={formData.skills[category.name]?.[subcategory.name]?.includes(skill.name)}
                        onIonChange={(e) =>
                          handleSkillChange(category.name, subcategory.name, skill.name, e.detail.checked)
                        }
                      />
                    ))}
                  </IonItem>
                  {expandedCategory === subcategory.name &&
                    subcategory.subcategories.map((subSubcategory: any) => (
                      <div key={subSubcategory.id}>
                        <IonItem>
                          <IonLabel>{subSubcategory.name}</IonLabel>
                          {subSubcategory.skills.map((skill: any) => (
                            <IonCheckbox
                              key={skill.id}
                              checked={formData.skills[category.name]?.[subcategory.name]?.includes(skill.name)}
                              onIonChange={(e) =>
                                handleSkillChange(category.name, subcategory.name, skill.name, e.detail.checked)
                              }
                            />
                          ))}
                        </IonItem>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </IonList>
      <IonButton expand="block" onClick={handlePrev}>
        Previous
      </IonButton>
      <IonButton expand="block" onClick={handleNext}>
        Next
      </IonButton>
    </div>
  );
};

export default SkillsForm;
