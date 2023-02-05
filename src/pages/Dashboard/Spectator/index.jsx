import { useParams } from "react-router-dom";
import Board from "../../../components/Board";
import BBoard from "../BBoard";
import GameList from "./GameList";

const Spectator = () => {
  const { gameid } = useParams();

  return (
    <>
      <div className="col-6 left">
        <GameList />
      </div>
      <div className="col-6 right">
        {gameid ? <Board spectator /> : <BBoard />}
      </div>
    </>
  );
};

export default Spectator;
