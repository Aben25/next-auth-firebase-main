// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEitid0p3L1oAhdPep-C-24ScUAE6cRyM",
  authDomain: "co-found-6ae37.firebaseapp.com",
  projectId: "co-found-6ae37",
  storageBucket: "co-found-6ae37.appspot.com",
  messagingSenderId: "838274088261",
  appId: "1:838274088261:web:84c6f13194d30860f1922c",
  measurementId: "G-DXRP9NP07T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };