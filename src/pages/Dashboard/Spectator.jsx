import { useParams } from "react-router-dom";
import Board from "../../components/Board";
import BBoard from "./BBoard";

const Spectator = () => {
  const { gameid } = useParams();

  return (
    <>
      <div className="col-6 left">
        <h1>{"<GameList />"}</h1>
      </div>
      <div className="col-6 right">
        {gameid ? <Board spectator /> : <BBoard />}
      </div>
    </>
  );
};

export default Spectator;
