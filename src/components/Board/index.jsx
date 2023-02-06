import { logDOM } from "@testing-library/react";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  increment,
  query,
  updateDoc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import React, { useState } from 'react';
import "./index.css";

const Board = ({ spectator, joinable, baseboard }) => {
  const navigate = useNavigate();
  const { gameid } = useParams();
  const { user } = UserAuth();
  const gameQuery = doc(db, "games", gameid);
  const [gameData, gameLoading, gameError] = useDocumentData(gameQuery);
    const [board, setBoard] = useState([    
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [-1, 0, -1, 0, -1, 0, -1, 0],
      [0, -1, 0, -1, 0, -1, 0, -1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ]);
/*  
    const handleClick = (row, col) => {
      const newBoard = [...board];
      newBoard[row][col] = 3;
      setBoard(newBoard);
    };
*/
  return gameLoading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <table>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => (
              <td key={j} style ={{padding: 0, border: 'none'}}>
                {col === 0 ? <div className="square0" /> : <div className="square1" />}
                {(col === 1) && (i === 7 || i === 6 || i === 5) ? (
                <div>
                     <div className="circleP1" />
                </div>
                ) : null}
                {(col === 2) && (i === 1 || i === 0 || i === 2 ) ? (
                <div>
                     <div className="circleP2" />
                </div>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </table>
    

      {!baseboard &&
        (joinable ? (
          <button
            id="join"
            onClick={() => {
              console.log(`Joining game ${gameid} as ${user.displayName}...`);
              updateDoc(gameQuery, { opponent: user.uid });
              updateDoc(doc(db, "users", user.uid), {
                games: arrayUnion(gameid),
              });
              navigate(`/game/${gameid}`);
            }}
            className="btn btn-primary">
            Join Game
          </button>
        ) : gameid && !spectator ? (
          gameData.opponent ? (
            <button
              id="surrender"
              className="btn btn-danger red"
              onClick={() => {
                console.log(
                  `Surrendering game ${gameid} as ${user.displayName}...`
                );
                updateDoc(gameQuery, {
                  ongoing: false,
                  turn: gameData.creator === user.uid ? 0 : 1,
                });
                doc(db, "users", user.uid).update("lose", increment);
                doc(
                  db,
                  "users",
                  gameData.creator === user.uid
                    ? gameData.opponent
                    : gameData.creator
                ).update("win", increment);
                navigate("/game");
              }}>
              Surrender
            </button>
          ) : (
            <button
              id="abort"
              className="btn btn-danger red"
              onClick={() => {
                console.log(
                  `Aborting game ${gameid} as ${user.displayName}...`
                );
                deleteDoc(gameQuery);
                doc(db, "users", user.uid).update("games", arrayRemove(gameid));
                navigate("/game");
              }}>
              Abort
            </button>
          )
        ) : (
          !gameData.ongoing && (
            <p>
              {`${gameData.turn ? gameData.creator : gameData.opponent} won!`}
            </p>
          )
        ))}
    </>
  );
};

export default Board;