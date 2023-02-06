import { doc, getDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import UserGames from "./UserGames";

const Profile = () => {
  const { user } = UserAuth();
  const { userid } = useParams();

  const userRef = doc(db, "users", userid);
  const [userDoc, loading, error] = useDocumentData(userRef);

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
        <p>uid: {userDoc.uid}</p>
        <p>joined at {userDoc.createdAt.toDate().toString()}</p>
        <p>last seen at {userDoc.seenAt.toDate().toString()}</p>
        <p>W / L : {`${userDoc.win} / ${userDoc.lose}`}</p>
        <UserGames />
      </div>
    </div>
  );
};

export default Profile;
