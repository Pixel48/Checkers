import { ErrorFactory } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import GameFinder from "./GameFinder";
import Gamer from "./Gamer";
import Spectator from "./Spectator";

const Dashboard = (props) => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const navigate = useNavigate();
  const [userInGame, setUserInGame] = useState(false);
  const [gameHasOpponent, setGameHasOpponent] = useState(false);

  const isUserInGame = async () => {
    const gameDoc = await getDoc(doc(db, "games", gameid));
    if (!gameDoc.exists()) return false;
    const gameData = gameDoc.data();
    if (gameData.creator == user.uid || gameData.opponent == user.uid)
      return true;
    return false;
  };

  const doGameHaveOpponent = async () => {
    const gameDoc = await getDoc(doc(db, "games", gameid));
    if (!gameDoc.exists()) return false;
    const gameData = gameDoc.data();
    if (gameData.opponent) return true;
    return false;
  };

  const joinGame = async () => {
    const gameDoc = await getDoc(doc(db, "games", gameid));
    if (!gameDoc.exists()) {
      console.error("Game does not exist");
      navigate("/");
      return;
    }
    const gameData = gameDoc.data();
    if (gameData.opponent) {
      console.error("Game already has opponent");
      navigate("/game");
      return;
    }

    updateDoc(gameDoc.ref, { opponent: user.uid }).then(() =>
      navigate(`/game/${gameid}`)
    );
  };

  useEffect(() => {
    if (!gameid) return;
    doGameHaveOpponent().then((res) => setGameHasOpponent(res));
    if (!user) return;
    isUserInGame().then((res) => setUserInGame(res));
  });

  return (
    <div className="row" style={{ margin: "1em 0" }}>
      {!user ? (
        !gameid ? (
          <Spectator />
        ) : (
          navigate("/game")
        )
      ) : !gameid ? (
        <GameFinder />
      ) : gameHasOpponent ? (
        userInGame ? (
          <Gamer />
        ) : (
          <Spectator />
        )
      ) : (
        joinGame()
      )}
    </div>
  );
};

export default Dashboard;
