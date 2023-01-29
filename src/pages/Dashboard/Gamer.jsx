import Board from "../../components/Board";
import Social from "./Social";

const Gamer = () => {
  return (
    <>
      <div className="col-6 left">
        <Board />
      </div>
      <div className="col-6 right">
        <Social />
      </div>
    </>
  );
};

export default Gamer;
