
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseApp  from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBbdynCCf8G0xZibB4O_eNpiQCj4LQ2RgM",
  authDomain: "web-diary-b3d91.firebaseapp.com",
  projectId: "web-diary-b3d91",
  storageBucket: "web-diary-b3d91.appspot.com",
  messagingSenderId: "192903052590",
  appId: "1:192903052590:web:be15feacb24114579d0ebf",
  measurementId: "G-M7Q2XW0N99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
