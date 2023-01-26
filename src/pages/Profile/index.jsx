import { doc, getDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

const Profile = () => {
  const { user } = UserAuth();
  const { userid } = useParams();

  const userRef = doc(db, "users", userid);
  console.log({ userRef });
  // const userDoc = getDoc(userRef);
  const [userDoc, loading, error] = useDocumentData(userRef);
  console.log({ userDoc });

  return loading ? (
    <div className="row" style={{ margin: "1em 0" }}>
      <div className="col-12" id="profile">
        <p>Loading...</p>
      </div>
    </div>
  ) : error ? (
    <div className="row" style={{ margin: "1em 0" }}>
      <div className="col-12" id="profile">
        <p>Error: {error}</p>
      </div>
    </div>
  ) : (
    <div className="row" style={{ margin: "1em 0" }}>
      <div className="col-12" id="profile">
        <img
          src={userDoc.photoURL}
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            width: "50px",
            height: "auto",
          }}
        />
        <p>{userDoc.displayName}</p>
        <p>uid {userDoc.uid}</p>
      </div>
    </div>
  );
};

export default Profile;
