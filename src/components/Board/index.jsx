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
import { UserAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { AbortButton, JoinButton, SurrenderButton } from "./Buttons";

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
    </>
  );
};

export default Board;
