import { db } from "../../../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useRef, useState } from "react";
import Message from "./Message";
import { UserAuth } from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { gameid } = useParams();
  const messagesRef = collection(db, `games/${gameid}/chat`);
  // const q = messagesRef.orderBy("createdAt").limit(25);
  const q = query(messagesRef, orderBy("createdAt"), limit(1024));

  const [messages] = useCollectionData(q);

  const [formValue, setFormValue] = useState("");

  const dummy = useRef();

  const { user } = UserAuth();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) return;

    const { uid, photoURL } = user;

    // await messagesRef.add({
    //   text: formValue,
    //   createdAt: serverTimestamp(),
    //   uid,
    //   photoURL,
    // });
    addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    }).then(() => {
      setFormValue("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <div className="chat">
        {messages &&
          messages.map((msg) => <Message key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          placeholder="Say something nice"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chat;
