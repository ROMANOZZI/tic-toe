import React from "react";
import Opic from "../Assets/O.png";
import Xpic from "../Assets/x.png";
import grid from "../Assets/grid.png";
const Grid = ({
  player1,
  player2,
  currntPlayer,
  board,
  setBoard,
  setCurrentPlayer,
  setPlayer1,
  setPlayer2,
  thereISwinner,
  setthereISwinner,
  draw,
  setDraw,
}) => {
  const player1Symbol = player1 === "x" ? Xpic : Opic;
  const player2Symbol = player2 === "x" ? Xpic : Opic;

  /**
   * If the id of the clicked element is equal to the id of the element in the array, and the value of
   * the element in the array is an empty string, then set the current player to the opposite player,
   * and return the element in the array with the value of the current player's symbol.
   */

  const handleClick = (id) => {
    setBoard((prev) =>
      prev.map((x) => {
        if (x.id == id && x.value == "") {
          setCurrentPlayer((prev) =>
            prev.symbol == player1.symbol ? player2 : player1
          );

          return { ...x, value: currntPlayer.symbol };
        } else return x;
      })
    );
  };
  React.useEffect(() => {
    /**
     * It checks if the player1 has won the game by checking if the player1's symbol is in all the
     * rows, coloumns and diagonals.
     */
    const checkwinnerP1 = (board) => {
      const symbol = player1.symbol;
      const rows = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)];

      const coloumns = [
        [board[0], board[3], board[6]],
        [board[1], board[4], board[7]],
        [board[3], board[5], board[8]],
      ];
      const diagonals = [
        [board[0], board[4], board[8]],
        [board[2], board[4], board[6]],
      ];
      const checker = (arr) => {
        arr.map((row) => {
          if (row.filter((element) => element.value != symbol).length == 0) {
            setPlayer1((prev) => ({ ...prev, winner: true }));
            setthereISwinner(true);
          }
        });
      };
      checker(rows);
      checker(coloumns);
      checker(diagonals);
    };
    const checkwinnerP2 = (board) => {
      const symbol = player2.symbol;
      const rows = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)];

      const coloumns = [
        [board[0], board[3], board[6]],
        [board[1], board[4], board[7]],
        [board[3], board[5], board[8]],
      ];
      const diagonals = [
        [board[0], board[4], board[8]],
        [board[2], board[4], board[6]],
      ];

      const checker = (arr) => {
        arr.map((row) => {
          if (row.filter((element) => element.value != symbol).length == 0) {
            setPlayer1((prev) => ({ ...prev, winner: true }));
            setthereISwinner(true);
          }
        });
      };
      checker(rows);
      checker(coloumns);
      checker(diagonals);
    };
    const checkDraw = (board) => {
      if (
        board.filter((x) => x.value == "").length == 0 &&
        thereISwinner == false
      ) {
        setDraw(true);
        console.log("draw");
      }
    };

    checkwinnerP1(board);
    checkwinnerP2(board);
    checkDraw(board);
  }, [board]);

  return (
    <div className="gridContainer">
      {board.map((item) => {
        return (
          <div
            id={item.id}
            key={item.id}
            className="grid-block"
            onClick={thereISwinner ? null : () => handleClick(item.id)}
          >
            {item.value ? (
              item.value == "x" ? (
                <img src={Xpic} width="60px"></img>
              ) : (
                <img src={Opic} width="60px"></img>
              )
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
