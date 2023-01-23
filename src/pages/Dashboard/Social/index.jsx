import Chat from "./Chat";
import User from "./User";

const Social = () => {
  return (
    <div className="col-6 right" id="social">
      <User />
      <Chat style={{ width: "25em" }} />
    </div>
  );
};

export default Social;
