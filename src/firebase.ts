
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

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


firebase.initializeApp(firebaseConfig);

const firedb = firebase.database();
const storageRef = firebase.storage().ref();
const storage = firebase.storage();
const fireauth = firebase.auth();
const firestore = firebase.firestore()
export { firedb, storageRef, storage, fireauth, firestore };
export default firebase
