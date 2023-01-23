import { useParams } from "react-router-dom";

const Profile = () => {
  const { userID } = useParams();

  return (
    <div className="row" style={{ margin: "1em 0" }}>
      <div className="col-12" id="profile">
        <h1>Profile {userID}</h1>
      </div>
    </div>
  );
};

export default Profile;
