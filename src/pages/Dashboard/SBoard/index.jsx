import { useParams } from "react-router-dom";

const SBoard = (props) => {
  const { gameID } = useParams();

  return (
    <div className="col-6 right" id="game" gameID={gameID}>
      Spectator Board (SBoard) - {gameID}
    </div>
  );
};

export default SBoard;
