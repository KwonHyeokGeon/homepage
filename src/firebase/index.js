import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADAikhq8m8_6Q4xU90ZXIg-QnO799Tyrw",
  authDomain: "first-73af9.firebaseapp.com",
  projectId: "first-73af9",
  storageBucket: "first-73af9.appspot.com",
  messagingSenderId: "852543870180",
  appId: "1:852543870180:web:ce121348bdd96dba3748f1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const fb = firebase.firestore

export {auth, db, storage, fb}