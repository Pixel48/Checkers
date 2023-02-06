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
import "./gameplay.jsx";

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

const [currentPlayer, setCurrentPlayer] = useState(1);

function movePawn(currentPosition, targetPosition) {
  if (validMove(currentPosition, targetPosition)) {
    let newBoard = [...board];

    newBoard[targetPosition.row][targetPosition.column] = newBoard[currentPosition.row][currentPosition.column];
    newBoard[currentPosition.row][currentPosition.column] = -1;

    setBoard(newBoard);
  } else {
    console.log("Invalid move");
  }
}

function validMove(currentPosition, targetPosition) {
  if (targetPosition.row < 0 || targetPosition.row >= 8 || targetPosition.column < 0 || targetPosition.column >= 8) {
    return false;
  }

  if (board[targetPosition.row][targetPosition.column] !== -1) {
    return false;
  }

  let rowDiff = Math.abs(targetPosition.row - currentPosition.row);
  let colDiff = Math.abs(targetPosition.column - currentPosition.column);
  if (rowDiff !== 1 || colDiff !== 1) {
    return false;
  }

  return true;
}

function handleClick(currentRow, currentCol) {
  let currentPosition = { row: currentRow, column: currentCol };

  let targetPosition = { row: currentRow + 1, column: currentCol + 1 };

  if (
    (currentPlayer === 1 && board[currentRow][currentCol] === 1) ||
    (currentPlayer === 2 && board[currentRow][currentCol] === 2)
  ) {
    movePawn(currentPosition, targetPosition);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }}

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
                <div onClick={() => handleClick(i,j)}>
                     <div className="circleP1" />
                </div>
                ) : null}
                {(col === 2) && (i === 1 || i === 0 || i === 2 ) ? (
                <div onClick={() => handleClick(i,j)}>
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