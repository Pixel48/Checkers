import { UserAuth } from "../../context/AuthContext";

const signerButtonClasses = "btn btn-primary btn-lg btn-block m-2 p-20";

// const { user } = UserAuth();

const SignIn = () => {
  const { login } = UserAuth();
  // const signInWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  // };

  return (
    <button className={signerButtonClasses + " green"} onClick={() => login()}>
      Sign in with Google
    </button>
  );
};

const SignOut = () => {
  const { user, logout } = UserAuth();

  return (
    user && (
      <button className={signerButtonClasses + " red"} onClick={() => logout()}>
        Sign Out
      </button>
    )
  );
};

const Signer = (props) => {
  // const user = props?.user ? props.user : null;
  const { user } = UserAuth();

  return <>{user ? <SignOut /> : <SignIn />}</>;
};

export default Signer;
