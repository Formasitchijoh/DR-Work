import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbdynCCf8G0xZibB4O_eNpiQCj4LQ2RgM",
  authDomain: "web-diary-b3d91.firebaseapp.com",
  databaseURL: "https://web-diary-b3d91-default-rtdb.firebaseio.com",
  projectId: "web-diary-b3d91",
  storageBucket: "web-diary-b3d91.appspot.com",
  messagingSenderId: "192903052590",
  appId: "1:192903052590:web:da77b5185f4822c89d0ebf",
  measurementId: "G-NYTBJJ4G8L"
  };


const app = initializeApp(firebaseConfig);
export const fireauth = getAuth(app);
export const firedb = getFirestore(app);
export const storageRef = getStorage(app);


