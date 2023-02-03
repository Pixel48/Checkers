import { Link } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";

const Message = (props) => {
  const { text, uid, photoURL } = props.message;

  const { user } = UserAuth();
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <Link to={`/user/${uid}`}>
        <img src={photoURL} alt="" referrerPolicy="no-referrer" />
      </Link>
      <p>{text}</p>
    </div>
  );
};

export default Message;
