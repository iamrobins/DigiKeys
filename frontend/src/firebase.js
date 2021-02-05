import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaKk_Cwm-ARPOJ7UdM7a-SER_1scPZpZg",
  authDomain: "digikeys-storage-7990a.firebaseapp.com",
  projectId: "digikeys-storage-7990a",
  storageBucket: "digikeys-storage-7990a.appspot.com",
  messagingSenderId: "798634580609",
  appId: "1:798634580609:web:ca339c32e00a35f9b5cb80"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;