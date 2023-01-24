import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5eUyyVknW-yNg0H215t0-tcwu8TAiTcA",
  authDomain: "checkers-e0929.firebaseapp.com",
  projectId: "checkers-e0929",
  storageBucket: "checkers-e0929.appspot.com",
  messagingSenderId: "55899113994",
  appId: "1:55899113994:web:84a2c21182e8af84652df3",
};

export const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
export const db = getFirestore();
