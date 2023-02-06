import { Link } from "react-router-dom";
import { UserAuth } from "../../../../contexts/AuthContext";

const Message = (props) => {
  const { text, uid, photoURL } = props.message;

  const { user } = UserAuth();
  const messageClass = uid === user.uid ? "sent" : "received";
  const messageAlign = uid === user.uid ? "right" : "left";

  return (
    <div
      className={`message ${messageClass} ${messageAlign}`}
      style={{
        display: "flex",
        // flexDirection: "row",
        // justifyContent: messageAlign === "left" ? "flex-start" : "flex-end",
        alignItems: "flex-start",
      }}>
      <Link to={`/user/${uid}`}>
        <img
          src={photoURL}
          alt=""
          referrerPolicy="no-referrer"
          style={{
            margin: "15px 10px 0",
          }}
        />
      </Link>
      <p
        style={{
          textAlign: messageAlign,
          overflowWrap: "break-word",
          maxWidth: "30vw",
        }}>
        {text}
      </p>
    </div>
  );
};

export default Message;
