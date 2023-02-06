import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Board from "../../components/Board";
import { UserAuth } from "../../contexts/AuthContext";
import Social from "./Social";
import { db } from "../../firebase";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  AbortButton,
  JoinButton,
  SurrenderButton,
} from "../../components/Board/Buttons";

const Gamer = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { gameid } = useParams();
  const gameQuery = doc(db, "games", gameid);
  const [gameData, gameLoading, gameError] = useDocumentData(gameQuery);

  useEffect(() => {
    if (!user || gameLoading) return; // Don't do shit if still waiting for data
    const { creator, opponent, ongoing } = gameData;
    const { displayName, uid } = user;
    console.table({ creator, opponent, ongoing, displayName, uid });
    if ((creator !== uid && opponent !== uid) || !ongoing)
      navigate(`/spectator/${gameid}`); // If user is not playing, redirect to spectator
  }, [user, gameData]);

  return gameLoading ? (
    <h1>Loading...</h1>
  ) : gameError ? (
    <h1 className="">Error: {gameError.message}</h1>
  ) : (
    <>
      <div className="col-6 left">
        <Board />
        {gameData.opponent ? <SurrenderButton /> : <AbortButton />}
      </div>
      <div className="col-6 right">
        <Social />
      </div>
    </>
  );
};

export default Gamer;
