import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

const GameList = () => {
  const gamesQuery = query(
    collection(db, "games"),
    where("ongoing", "==", true),
    where("opponent", "!=", null),
    orderBy("opponent"),
    orderBy("creator"),
    orderBy("createdAt")
  );
  const [games, setGames] = useState([]);
  const unsubGames = onSnapshot(gamesQuery, (gamesSnapshot) => {
    setGames(gamesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  // const [games, gamesLoading, gamesError, gamesSnapshot] = useCollection(gamesQuery);
  const usersQuery = query(collection(db, "users"));
  const [users, usersLoading, usersError] = useCollectionData(usersQuery);

  useEffect(() => {
    return () => {
      unsubGames();
    };
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold">Games</h1>
      <ul>
        {games?.map((game) => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>
              {users?.find((user) => user.uid === game.creator)?.displayName} vs{" "}
              {users?.find((user) => user.uid === game.opponent)?.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
