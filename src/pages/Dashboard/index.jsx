import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import SBoard from "./SBoard";
import Social from "./Social";

const Dashboard = (props) => {
  const { user } = UserAuth();
  const { newGame } = props;
  const { gameid } = useParams();
  const navigate = useNavigate();

  const createGame = async () => {
    console.log(`Creating game for ${user.displayName}...`);
    const myNewGame = await addDoc(collection(db, "games"), {
      // players: [null, user.uid], // first is always opponent, plays as white
      creator: user.uid, // creator plays as black
      opponent: null,
      turn: 0, // 0 - opponent, 1 - creator (used as winner if game ends)
      boards: [],
      createdAt: serverTimestamp(),
      ongoing: true,
    });
    console.log(myNewGame.id);
    navigate(`/game/${myNewGame.id}`);
  };

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
          {newGame ? (
            <button onClick={createGame}>Find Game</button>
          ) : (
            <Social gameid={gameid} />
          )}
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
