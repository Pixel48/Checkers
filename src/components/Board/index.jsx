import { useParams } from "react-router-dom";

const Board = ({ spectator }) => {
  const { gameid } = useParams();

  return (
    <div
      id="board"
      className="row-6 left"
      style={{
        backgroundColor: !spectator ? "white" : "lightgray",
        aspectRatio: "1:1",
        width: "30vw",
        height: "30vw",
      }}>
      <h1>Board</h1>
      {spectator && <h2>Spectator</h2>}
      {gameid && <h5>{gameid}</h5>}
    </div>
  );
};

export default Board;
