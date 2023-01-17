import firebase from "firebase/compat/app"; // firebase SDK
import { auth } from "../firebase";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
};

const Signer = (props) => {
  const user = props?.user ? props.user : null;

  return <>{user ? <SignOut /> : <SignIn />}</>;
};

export default Signer;
