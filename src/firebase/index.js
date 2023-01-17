import firebase from "firebase/compat/app"; // firebase SDK
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0N0XBMF3W2NYCc_Ntf0wCuoEZemdo3IQ",
  authDomain: "checkers-20bd9.firebaseapp.com",
  projectId: "checkers-20bd9",
  storageBucket: "checkers-20bd9.appspot.com",
  messagingSenderId: "640056595469",
  appId: "1:640056595469:web:0daacdf822dae1243b7144",
  measurementId: "G-C9EKYW5N9L",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
