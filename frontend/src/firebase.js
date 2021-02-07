import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "KEY",
  authDomain: "DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MS_ID",
  appId: "APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;