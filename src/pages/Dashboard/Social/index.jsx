import Chat from "./Chat";
import Profile from "./Profile";

const Social = () => {
  return (
    <div className="col-6 right" id="social">
      <Profile />
      <Chat style={{ width: "25em" }} />
    </div>
  );
};

export default Social;
