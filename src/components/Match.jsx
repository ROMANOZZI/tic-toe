import React from "react";
import Timer from "./Timer";
import Grid from "./Grid";
import useWindowSize from "../useWindowSize";
import Confetti from "react-confetti";
function Match({ player1, player2, setPlayer1, setPlayer2, setSelected }) {
  const [currntPlayer, setCurrentPlayer] = React.useState(player1);
  const [thereISwinner, setthereISwinner] = React.useState(false);
  const [draw, setDraw] = React.useState(false);
  const { width, height } = useWindowSize();
  const [board, setBoard] = React.useState([
    { value: "", id: 1 },
    { value: "", id: 2 },
    { value: "", id: 3 },
    { value: "", id: 4 },
    { value: "", id: 5 },
    { value: "", id: 6 },
    { value: "", id: 7 },
    { value: "", id: 8 },
    { value: "", id: 9 },
  ]);
  console.log(thereISwinner);
  /**
   * Todo: add the 3 rounds functionality
   */
  React.useEffect(() => {
    if (thereISwinner == false) {
      window.onbeforeunload = function (e) {
        e.preventDefault();
        return "Dude, are you sure you want to refresh? Think of the kittens!";
      };
    } else {
      window.onbeforeunload = function () {
        // blank function do nothing
      };
    }
  }, [thereISwinner]);
  const RestartGame = () => {
    window.location.reload();
  };
  return (
    <div className="Match">
      <Timer
        setCurrentPlayer={setCurrentPlayer}
        player1={player1}
        player2={player2}
        currntPlayer={currntPlayer}
        thereISwinner={thereISwinner}
        draw={draw}
      ></Timer>
      <Grid
        board={board}
        setBoard={setBoard}
        player1={player1}
        player2={player2}
        currntPlayer={currntPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setPlayer1={setPlayer1}
        setPlayer2={setPlayer2}
        thereISwinner={thereISwinner}
        setthereISwinner={setthereISwinner}
        draw={draw}
        setDraw={setDraw}
      ></Grid>
      <div className="buttonsContainer">
        {thereISwinner && (
          <button className="gamebtn" onClick={RestartGame}>
            Start new Game
          </button>
        )}
      </div>
      {thereISwinner && (
        <React.Fragment>
          <div className="popupContainer"> player1 is the winner</div>
          <Confetti width={width} height={height} />
        </React.Fragment>
      )}
    </div>
  );
}

export default Match;
