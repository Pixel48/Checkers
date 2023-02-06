import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { useEffect } from "react";

export const UserContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return unsub;
  }, []);

  const updateUser = async (user) => {
    console.debug(`updateUser(${user.uid})`);
    const userRef = doc(db, "users", user.uid);
    getDoc(userRef).then((userDoc) => {
      if (!userDoc.exists()) {
        console.log(`Creating ${user.displayName}'s profile...`);
        setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          seenAt: serverTimestamp(),
          win: 0,
          lose: 0,
          games: [],
        });
      } else {
        console.log(`Updating ${user.displayName}'s profile...`);
        updateDoc(userRef, { seenAt: serverTimestamp() });
      }
    });
  };

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const cred = GoogleAuthProvider.credentialFromResult(result);
        const token = cred.accessToken;
        const user = result.user;
        updateUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const cred = GoogleAuthProvider.credentialFromError(error);
        console.error({ errorCode, errorMessage, email, cred });
      });
  };

  const logout = () => {
    auth.signOut();
    // navigate("/");
  };

  return (
    // prettier-ignore
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => useContext(UserContext);
