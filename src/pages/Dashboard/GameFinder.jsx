import {
  addDoc,
  collection,
  getDocs,
  doc,
  arrayUnion,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link, useNavigate } from "react-router-dom";
import Board from "../../components/Board";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import BBoard from "./BBoard";

const GameFinder = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const openGamesQuery = query(
    collection(db, "games"),
    where("ongoing", "==", true),
    where("opponent", "==", null)
  );

  const [openGames, setOpenGames] = useState([]);

  useEffect(() => {
    const unsubOpenGames = onSnapshot(openGamesQuery, (openGamesSnapshot) => {
      setOpenGames(
        openGamesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return () => {
      unsubOpenGames();
    };
  }, []);

  const usersQuery = query(collection(db, "users"));
  const [users, usersLoading, usersError] = useCollectionData(usersQuery);

  const createGame = async () => {
    console.log(`Creating game for ${user.displayName}...`);
    const myNewGame = await addDoc(collection(db, "games"), {
      // players: [null, user.uid], // first is always opponent, plays as white
      creator: user.uid, // creator plays as black
      opponent: null, // if null, game is waiting for opponent
      turn: 0, // 0 - opponent, 1 - creator (used as winner if game ends)
      boards: [], // array of board states in JSON format
      createdAt: serverTimestamp(),
      ongoing: true, // if false, game is over (turn indicates winner (0 - opponent, 1 - creator))
    });
    console.log(myNewGame.id);
    updateDoc(doc(db, "users", user.uid), { games: arrayUnion(myNewGame.id) });
    navigate(`/game/${myNewGame.id}`);
  };

  const findGame = async () => {
    console.log(`Finding game for ${user.displayName}...`);
    const waitingGamesQuery = query(
      collection(db, "games"),
      where("ongoing", "==", true),
      where("creator", "!=", user.uid),
      where("opponent", "==", null),
      orderBy("creator"),
      orderBy("createdAt")
    );

    const waitingGames = await getDocs(waitingGamesQuery);
    if (waitingGames.size > 0) {
      const game = waitingGames.docs[0];
      const gameData = game.data();
      const gameID = game.id;
      console.log(`Found game ${gameID}`);
      updateDoc(game.ref, { opponent: user.uid });
      updateDoc(doc(db, "users", user.uid), { games: arrayUnion(gameID) });
      navigate(`/game/${gameID}`);
    } else {
      console.log("No waiting games found");
      createGame();
    }
  };

  const checkOngoing = async () => {
    if (!user) return;
    console.log(`Checking for ${user.displayName}'s created games...`);
    const createdGamesQuery = query(
      collection(db, "games"),
      where("creator", "==", user.uid),
      where("ongoing", "==", true),
      orderBy("createdAt"),
      limit(1)
    );
    const createdGames = await getDocs(createdGamesQuery);
    if (createdGames.size > 0) {
      const game = createdGames.docs[0];
      const gameID = game.id;
      console.log(`Found ongoing game ${gameID}`);
      navigate(`/game/${gameID}`);
      return;
    } else console.log("No created games found");
    console.log(`Checking for ${user.displayName}'s opponent games...`);
    const opponentGamesQuery = query(
      collection(db, "games"),
      where("opponent", "==", user.uid),
      where("ongoing", "==", true),
      orderBy("createdAt"),
      limit(1)
    );
    const opponentGames = await getDocs(opponentGamesQuery);
    if (opponentGames.size > 0) {
      const game = opponentGames.docs[0];
      const gameID = game.id;
      console.log(`Found ongoing game ${gameID}`);
      navigate(`/game/${gameID}`);
      return;
    } else console.log("No opponent games found");
    findGame();
  };

  return (
    <>
      <div className="col-6 left">{<BBoard spectator />}</div>
      <div className="col-6 center">
        <button onClick={checkOngoing}>Find Game</button>
        <ul>
          {openGames.map((game) => (
            <li key={game.id}>
              <Link onClick={() => navigate(`/game/${game.id}`)}>
                {`Join game against ${
                  users.find((user) => user.uid === game.creator)?.displayName
                }`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GameFinder;
