import { UserAuth } from "../../../../context/AuthContext";

const Message = (props) => {
  const { text, uid, photoURL } = props.message;

  const { user } = UserAuth();
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="" />
      <p>{text}</p>
    </div>
  );
};

export default Message;
