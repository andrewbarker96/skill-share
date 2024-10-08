import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { create } from "ionicons/icons";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);

// Set authentication persistence to session-only
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     console.log("Auth persistence set to session only");
//   })
//   .catch((error) => {
//     console.error("Error setting auth persistence:", error);
//   });

const uid = auth.currentUser?.uid;

export { uid, db, analytics, firebase, firestore, auth, storage };
