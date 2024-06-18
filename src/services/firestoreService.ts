import { db } from "../../util/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ProfileData, Skills } from "../types";

//Create new profile
export const createProfile = async (profile: any) => {
  try {
    const profileDoc = doc(db, "userProfiles", profile.uid);
    await setDoc(profileDoc, profile);
    return profile.uid;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//Get all profiles
export const getProfiles = async () => {
  const querySnapshot = await getDocs(collection(db, "userProfiles"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Function to get user profile data from Firestore
export const getUserProfile = async (uid: string): Promise<ProfileData> => {
  if (!uid) throw new Error("No user ID provided");

  const userDoc = doc(db, "userProfiles", uid);
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    throw new Error("User profile does not exist");
  }

  const profileData = userSnapshot.data() as ProfileData;
  console.log("Fetched user profile data:", profileData); // Add this line
  return profileData;
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
export const getSkills = async (): Promise<Skills> => {
  const skillsDoc = doc(db, "skills", "471rn4UyI8WDOGW3R15N");
  const skillsSnapshot = await getDoc(skillsDoc);

  if (!skillsSnapshot.exists()) {
    throw new Error("Skills document does not exist");
  }

  const data = skillsSnapshot.data() as Skills;
  console.log("fetched skills data: ", data);
  return data;
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
