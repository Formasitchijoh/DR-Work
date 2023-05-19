
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseApp  from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
FirebaseApp.initializeApp(firebaseConfig);

// export const db = FirebaseApp.firestore();
