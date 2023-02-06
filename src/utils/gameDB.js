import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  addGameToUser,
  incrementUserLosses,
  incrementUserWins,
  removeGameFromUser,
} from "./userDB";

export const setGameOpponent = (gameid, uid) =>
  updateDoc(doc(db, "games", gameid), { opponent: uid });

export const joinGame = async (gameid, uid) => {
  await addGameToUser(gameid, uid);
  await setGameOpponent(gameid, uid);
  // doc(db, "games", gameid).update("opponent", uid);
};

export const surrenderGame = async (gameid, uid) => {
  const gameQuery = doc(db, "games", gameid);
  const gameData = await getDoc(gameQuery);
  const { creator, opponent } = gameData.data();
  await updateDoc(gameQuery, {
    ongoing: false,
    turn: creator === uid ? 0 : 1,
  });
  await incrementUserLosses(uid);
  await incrementUserWins(creator === uid ? opponent : creator);
};

export const abortGame = async (gameid) => {
  const gameQuery = doc(db, "games", gameid);
  const gameData = await getDoc(gameQuery);
  const { creator } = gameData.data();
  await removeGameFromUser(gameid, creator);
  await deleteDoc(gameQuery);
};

export const createGame = async (uid) => {
  const newGame = await doc(db, "games").set({
    creator: uid,
    createdAt: serverTimestamp(),
    ongoing: true,
    opponent: null,
    turn: 0,
  });
  await addGameToUser(newGame.id, uid);
  return newGame.id;
};
