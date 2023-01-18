import Social from "./Social";

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
      <Social />
    </div>
  );
};

export default Dashboard;
