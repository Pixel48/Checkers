import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";

const User = () => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const gameQuery = doc(db, "games", gameid);
  const getOpponentData = async (opponentUID) => {
    const opponentDoc = doc(db, "users", opponentUID);
    const opponentData = await getDoc(opponentDoc);
    return opponentData.data();
  };

  const [gameData, loading, error] = useDocumentData(gameQuery);
  const [opponentData, setOpponentData] = useState(null);

  useEffect(() => {
    if (gameData) {
      const opponentUID =
        gameData.creator === user.uid ? gameData.opponent : gameData.creator;
      getOpponentData(opponentUID).then((opponentData) => {
        setOpponentData(opponentData);
      });
    }
  }, [gameData]);

  return (
    <Link
      className="person"
      to={`/user/${opponentData?.uid}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        aspectRatio: "1:1",
        width: "100%",
      }}>
      <img
        src={opponentData && opponentData.photoURL}
        alt=""
        style={{
          width: "25a%",
          height: "25a%",
          display: opponentData ? "inline-block" : "none",
        }}
      />
      <p
        style={{
          display: "inline-block",
          fontSize: "250%",
          overflowWrap: "break-word",
          margin: 0,
        }}>
        {opponentData ? opponentData.displayName : "Waiting..."}
      </p>
    </Link>
  );
};

export default User;
