import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import GameFinder from "./GameFinder";
import Gamer from "./Gamer";
import Spectator from "./Spectator";

const Dashboard = ({ spectator }) => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const navigate = useNavigate();

  const [gameData, setGameData] = useState(null);

  return (
    <div className="row" style={{ margin: "1em 0" }}>
      {spectator ? <Spectator /> : gameid ? <Gamer /> : <GameFinder />}
      {/* {spectator ? (
        <Spectator />
      ) : user ? (
        gameid ? (
          <Gamer />
        ) : (
          <GameFinder />
        )
      ) : (
        <Spectator />
      )} */}
    </div>
  );
};

export default Dashboard;
