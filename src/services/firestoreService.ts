import { db, uid, firestore } from "../../util/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

//Create new profile
export const createProfile = async (profile: any) => {
  try {
    const docRef = await addDoc(collection(db, "userProfiles"), profile);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//Get all profiles
export const getProfiles = async () => {
  const querySnapshot = await getDocs(collection(db, "userProfiles"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

//Update a profile
export const updateProfile = async (id: string, updatedProfile: any) => {
  const profileDoc = doc(db, "userProfiles", id);
  await updateDoc(profileDoc, updatedProfile);
};

//Delete a profile
export const deleteProfile = async (id: string) => {
  const profileDoc = doc(db, "userProfiles", id);
  await deleteDoc(profileDoc);
};

//Get all skills
export const getSkills = async () => {
  const querySnapshot = await getDocs(collection(db, "skills"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

//Add new skill
export const addSkill = async (skill: string) => {
  try {
    const docRef = await addDoc(collection(db, "skills"), { name: skill });
    return docRef.id;
  } catch (error) {
    console.error("Error adding skill: ", error);
  }
};
