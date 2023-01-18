const Profile = () => {
  return (
    <div className="person">
      <span
        className="profile-pic"
        style={{
          backgroundColor: "blue",
          aspectRatio: "1:1",
          display: "inline-block",
          width: "7vw",
          height: "7vw",
          borderRadius: "50%",
        }}></span>
      <h1 style={{ display: "inline" }}>Social</h1>
    </div>
  );
};

export default Profile;
