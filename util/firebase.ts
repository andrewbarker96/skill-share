import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { create } from "ionicons/icons";

const firebaseConfig = {
  apiKey: "AIzaSyCIqlrGmhT01Py0PFzpZzfpeLzyfdb94Vs",
  authDomain: "skill-share-791ad.firebaseapp.com",
  databaseURL: "https://skill-share-791ad-default-rtdb.firebaseio.com",
  projectId: "skill-share-791ad",
  storageBucket: "skill-share-791ad.appspot.com",
  messagingSenderId: "13677970381",
  appId: "1:13677970381:web:0c538d8443793ab5d83a84",
  measurementId: "G-BH524Q334E",
};

const adminAuth = [
  "yYMmzbnFnXPCclmWWmi0oyLulqh1",
  "RmgwiiugPWTEL3YyfJOyro3aq3I2",
];

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase);
const user = auth.currentUser;




export { db, analytics, firebase, firestore, auth, adminAuth };
