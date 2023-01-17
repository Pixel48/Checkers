const Dashboard = (props) => {
  return (
    <div className="row" style={{ margin: "1em 0" }}>
      <div
        className="col-6 left"
        id="board"
        style={{
          backgroundColor: "red",
          aspectRatio: "1:1",
          width: "30vw",
          height: "30vw",
        }}>
        <h1>Board</h1>
      </div>
      <div className="col-6 right" id="social" style={{ display: "" }}>
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
        <div
          id="chat"
          style={{
            backgroundColor: "pink",
            width: "29vw",
            height: "25vw",
            display: "block",
          }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
