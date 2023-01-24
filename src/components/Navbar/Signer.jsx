import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const googleAuthProvider = new GoogleAuthProvider();

const signerButtonClasses = "btn btn-primary btn-lg btn-block m-2 p-20";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button
      className={signerButtonClasses + " green"}
      onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

const SignOut = () => {
  return (
    auth.currentUser && (
      <button
        className={signerButtonClasses + " red"}
        onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};

const Signer = (props) => {
  const user = props?.user ? props.user : null;

  return <>{user ? <SignOut /> : <SignIn />}</>;
};

export default Signer;
