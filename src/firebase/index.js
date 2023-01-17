import firebase from "firebase/compat/app"; // firebase SDK
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5eUyyVknW-yNg0H215t0-tcwu8TAiTcA",
  authDomain: "checkers-e0929.firebaseapp.com",
  projectId: "checkers-e0929",
  storageBucket: "checkers-e0929.appspot.com",
  messagingSenderId: "55899113994",
  appId: "1:55899113994:web:84a2c21182e8af84652df3",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
