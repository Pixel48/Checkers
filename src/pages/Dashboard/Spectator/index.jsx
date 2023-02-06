import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Board from "../../../components/Board";
import { JoinButton } from "../../../components/Board/Buttons";
import { UserAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import GameList from "./GameList";

const Spectator = () => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const gameQuery = doc(db, "games", gameid);
  const [gameData, gameLoading, gameError] = useDocumentData(gameQuery);
  const [gameJoinable, setGameJoinable] = useState(false);
  const usersQuery = collection(db, "users");
  const [users, usersLoading, usersError] = useCollectionData(usersQuery);

  const navigate = useNavigate();

  useEffect(() => {
    if (!gameData && !gameLoading) {
      console.log("Game does not exist");
      navigate("/", { replace: true });
      return;
    }
    if (gameError) {
      console.error(`Error loading game ${gameid}: ${gameError}`);
      navigate("/", { replace: true });
      return;
    }
    if (!user || gameLoading) return; // Don't do shit if still waiting for data

    const { creator, opponent, ongoing } = gameData;
    const { displayName, uid } = user;
    console.table({ creator, opponent, ongoing, displayName, uid });
    setGameJoinable(ongoing && !opponent);
    if ((creator === uid || opponent === uid) && ongoing)
      navigate(`/game/${gameid}`); // If user is not playing, redirect to spectator
  }, [user, gameData]);

  return gameLoading ? (
    <h1>Loading...</h1>
  ) : gameError ? (
    <h1>Error: {gameError.message}</h1>
  ) : (
    <>
      <div className="col-6 left">
        <GameList />
      </div>
      <div className="col-6 right">
        <Board spectator />
        {user && gameJoinable && <JoinButton />}
        {!gameData.ongoing && (
          <p>{`${
            users.find(
              (u) =>
                u.uid === (gameData.turn ? gameData.creator : gameData.opponent)
            ).displayName
          } wins!`}</p>
        )}
      </div>
    </>
  );
};

export default Spectator;
