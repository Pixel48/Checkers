import { collection, doc, orderBy, query, where } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

const UserGames = () => {
  const { userid } = useParams();
  const userQuery = doc(db, "users", userid);
  const [user, userLoading, userError] = useDocumentData(userQuery);
  const gamesQuery = query(
    collection(db, "games"),
    where("creator", "==", userid),
    where("opponent", "==", userid),
    where("ongoing", "==", false),
    orderBy("createdAt")
  );
  const [games, gamesLoading, gamesError] = useCollectionData(gamesQuery);

  return gamesLoading ? (
    <h2>Loading...</h2>
  ) : gamesError ? (
    <h2>Error: {gamesError.message}</h2>
  ) : (
    <div id="userGames">
      <h2>User Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>{game.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserGames;
