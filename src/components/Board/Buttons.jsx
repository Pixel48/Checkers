import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { abortGame, joinGame, surrenderGame } from "../../utils/gameDB";

export const JoinButton = () => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const navigate = useNavigate();

  const handleJoin = () => {
    console.log(`Joining game ${gameid} as ${user.displayName}...`);
    // updateDoc(gameQuery, { opponent: user.uid });
    // updateDoc(doc(db, "users", user.uid), {
    //   games: arrayUnion(gameid),
    // });
    joinGame(gameid, user.uid);
    navigate(`/game/${gameid}`);
    return;
  };

  return (
    <button id="join" onClick={handleJoin} className="btn btn-primary">
      Join Game
    </button>
  );
};

export const SurrenderButton = () => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const navigate = useNavigate();

  const handleSurrender = () => {
    console.log(`Surrendering game ${gameid} as ${user.displayName}...`);
    surrenderGame(gameid, user.uid);
    navigate("/game");
  };

  return (
    <button
      id="surrender"
      className="btn btn-danger red"
      onClick={handleSurrender}>
      Surrender
    </button>
  );
};

export const AbortButton = () => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const navigate = useNavigate();

  const handleAbort = () => {
    console.log(`Aborting game ${gameid} as ${user.displayName}...`);
    abortGame(gameid);
    navigate("/game");
  };

  return (
    <button id="abort" className="btn btn-danger red" onClick={handleAbort}>
      Abort
    </button>
  );
};
