import React from "react";

const Timer = ({
  setCurrentPlayer,
  player1,
  player2,
  seleced,
  currntPlayer,
  thereISwinner,
  draw,
}) => {
  const [seconds, setSeconds] = React.useState(5);
  React.useEffect(() => {
    if (seconds == -1) {
      setSeconds(5);
      setCurrentPlayer((prev) => (prev == player1.symbol ? player2 : player1));
    }
  }, [seconds]);

  React.useEffect(() => {
    setSeconds(5);
  }, [currntPlayer]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);

      if (thereISwinner || draw) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [thereISwinner, draw]);

  return <div className="timerContainer">{`00:0${seconds}`}</div>;
};

export default Timer;
