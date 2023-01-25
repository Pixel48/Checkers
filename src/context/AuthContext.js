import { createContext, useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";

const UserContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const cred = GoogleAuthProvider.credentialFromResult(result);
        const token = cred.accessToken;
        const user = result.user;
        setUser(user);
        // console.log(`user: ${user}`);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const cred = GoogleAuthProvider.credentialFromError(error);
        console.error();
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    // navigate("/");
  };

  return (
    // prettier-ignore
    <UserContext.Provider value={{login, user, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => useContext(UserContext);
