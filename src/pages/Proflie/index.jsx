import { useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = UserAuth();
  const { userid } = useParams();

  return (
    <div className="row" style={{ margin: "1em 0" }}>
      <div className="col-12" id="profile">
        <h1>Profile {userid}</h1>
      </div>
    </div>
  );
};

export default Profile;
