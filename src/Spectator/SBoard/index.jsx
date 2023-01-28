import { useParams } from "react-router-dom";

const SBoard = (props) => {
  const { gameid } = useParams();

  return (
    <div className="col-6 right" id="game" gameid={gameid}>
      Spectator Board (SBoard){gameid ? ` - ${gameid}` : ""}
    </div>
  );
};

export default SBoard;
