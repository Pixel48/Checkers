import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import  Board  from "../../components/Board";
import { UserAuth } from "../../context/AuthContext";
import Social from "./Social";
import { db } from "../../firebase";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import "../../components/Board"

const Gamer = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { gameid, joinGame } = useParams();
  const gameQuery = doc(db, "games", gameid);
  // const [gameDoc, gameLoading, gameError] = useCollectionData(gameQuery);
  const [gameData, gameLoading, gameError] = useDocumentData(gameQuery);

  const [userPlaying, setUserPlaying] = useState(false);
  const [gameJoinable, setGameJoinable] = useState(false);

  useEffect(() => {
    if (gameLoading) return;
    if (gameError) {
      console.error(gameError);
      navigate("/game");
      return;
    }
    setUserPlaying(
      gameData.creator === user.uid || gameData.opponent === user.uid
    );
    if (!userPlaying)
      setGameJoinable(
        gameData.opponent === null &&
          gameData.ongoing &&
          gameData.creator !== user.uid
      );
  }, [user.uid, gameData]);

  return (
    <>
      <div className="col-6-left" style={{ position: 'relative', top: 0, left: 0 }}>
        {userPlaying && gameData.ongoing ? (
          <Board />
        ) : gameJoinable && gameData.ongoing ? (
          <Board spectator joinable />
        ) : (
          <Board spectator />
        )}
      </div>
      <div className="col-6-right">
        <Social />
      </div>
    </>
  );
};

export default Gamer;
