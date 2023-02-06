import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addGameToUser = (gameid, uid) =>
  updateDoc(doc(db, "users", uid), { games: arrayUnion(gameid) });

export const removeGameFromUser = (gameid, uid) =>
  updateDoc(doc(db, "users", uid), { games: arrayRemove(gameid) });

export const incrementUserWins = (uid) =>
  updateDoc(doc(db, "users", uid), { win: increment(1) });

export const incrementUserLosses = (uid) =>
  updateDoc(doc(db, "users", uid), { lose: increment(1) });
