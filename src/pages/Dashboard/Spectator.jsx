import Board from "../../components/Board";

const Spectator = () => {
  return (
    <>
      <div className="col-6 left">
        <h1>{"<GameList />"}</h1>
      </div>
      <div className="col-6 right">
        <Board spectator />
      </div>
    </>
  );
};

export default Spectator;
