import { useParams } from "react-router-dom";
import SBoard from "./SBoard";
import Social from "./Social";

const Dashboard = (props) => {
  const { user } = props;
  const { newGame } = props;
  const { gameID } = useParams();

  return (
    <div className="row" style={{ margin: "1em 0" }}>
      {user ? ( // logged in
        <>
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
          {newGame ? <h1>NewGameButton</h1> : <Social />}
        </>
      ) : (
        // logged out
        <>
          <div className="col-6 left" id="gameList">
            GameList
          </div>
          <SBoard />
        </>
      )}
    </div>
  );
};

export default Dashboard;
