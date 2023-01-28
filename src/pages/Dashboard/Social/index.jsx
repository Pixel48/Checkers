import { useParams } from "react-router-dom";
import Chat from "./Chat";
import User from "./User";

const Social = () => {
  const { gameid } = useParams();

  return (
    <div className="col-6 right" id="social">
      <User />
      <Chat gameid={gameid} style={{ width: "25em" }} />
    </div>
  );
};

export default Social;
