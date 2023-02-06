import BBoard from "./BBoard";
import GameList from "./Spectator/GameList";

const SpectatorFinder = () => {
  return (
    <>
      <div className="col-6 left">
        <GameList />
      </div>
      <div className="col-6 right">
        <BBoard />
      </div>
    </>
  );
};

export default SpectatorFinder;
