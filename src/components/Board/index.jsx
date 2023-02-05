import { logDOM } from "@testing-library/react";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  increment,
  query,
  updateDoc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

const Board = ({ spectator, joinable }) => {
  const navigate = useNavigate();
  const { gameid } = useParams();
  const { user } = UserAuth();
  const gameQuery = doc(db, "games", gameid);
  const [gameData, gameLoading, gameError] = useDocumentData(gameQuery);

  return gameLoading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div
        id="board"
        style={{
          backgroundColor: !spectator ? "white" : "gray",
          aspectRatio: "1:1",
          width: "30vw",
          height: "30vw",
        }}>
        <h1 style={{ margin: "0" }}>Board</h1>
        {spectator && <h2>Spectator</h2>}
        {gameid && <h5>{gameid}</h5>}
      </div>

      {joinable ? (
        <button
          id="join"
          onClick={() => {
            console.log(`Joining game ${gameid} as ${user.displayName}...`);
            updateDoc(gameQuery, { opponent: user.uid });
            updateDoc(doc(db, "users", user.uid), {
              games: arrayUnion(gameid),
            });
            navigate(`/game/${gameid}`);
          }}
          className="btn btn-primary">
          Join Game
        </button>
      ) : gameid && !spectator ? (
        gameData.opponent ? (
          <button
            id="surrender"
            className="btn btn-danger red"
            onClick={() => {
              console.log(
                `Surrendering game ${gameid} as ${user.displayName}...`
              );
              updateDoc(gameQuery, {
                ongoing: false,
                turn: gameData.creator === user.uid ? 0 : 1,
              });
              doc(db, "users", user.uid).update("lose", increment);
              doc(
                db,
                "users",
                gameData.creator === user.uid
                  ? gameData.opponent
                  : gameData.creator
              ).update("win", increment);
              navigate("/game");
            }}>
            Surrender
          </button>
        ) : (
          <button
            id="abort"
            className="btn btn-danger red"
            onClick={() => {
              console.log(`Aborting game ${gameid} as ${user.displayName}...`);
              deleteDoc(gameQuery);
              doc(db, "users", user.uid).update("games", arrayRemove(gameid));
              navigate("/game");
            }}>
            Abort
          </button>
        )
      ) : (
        !gameData.ongoing && (
          <p>
            {`${gameData.turn ? gameData.creator : gameData.opponent} won!`}
          </p>
        )
      )}
    </>
  );
};

export default Board;
