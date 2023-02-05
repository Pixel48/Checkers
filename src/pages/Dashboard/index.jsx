import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import GameFinder from "./GameFinder";
import Gamer from "./Gamer";
import Spectator from "./Spectator";

const Dashboard = ({ spectator }) => {
  const { user } = UserAuth();
  const { gameid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {});

  return (
    <div className="row" style={{ margin: "1em 0" }}>
      {user && !spectator ? ( // User logged in
        gameid ? ( // game selected
          <Gamer />
        ) : (
          // game not selected
          <GameFinder />
        )
      ) : (
        // User logged out
        <Spectator />
      )}
    </div>
  );
};

export default Dashboard;
