import React from "react";
import xStroke from "../Assets/xStroke.png";
import oStroke from "../Assets/oStroke.png";
import Opic from "../Assets/O.png";
import Xpic from "../Assets/x.png";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import startFireBase from "../FirebaseConfig";
const Start = ({
  setPlayer1,
  setPlayer2,
  player1,
  setSelected,
  signIn,

  mode,
}) => {
  //experiments

  const handleClick = (e) => {
    e.currentTarget.value == "x"
      ? setPlayer1((prev) => ({ ...prev, symbol: "x", winner: false }))
      : setPlayer1((prev) => ({ ...prev, symbol: "o", winner: false }));

    e.currentTarget.value == "x"
      ? setPlayer2((prev) => ({ ...prev, symbol: "o", winner: false }))
      : setPlayer2((prev) => ({ ...prev, symbol: "x", winner: false }));
    setSelected(true);
    if (mode == 1) {
      signIn(auth);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <img src={xStroke} className="xStroke"></img>
        <img src={oStroke} className="oStroke"></img>

        <div className="heading">
          <p>TIC-TAC-TOE</p>
          <p id="question">pick who goes first ?</p>
          <div className="buttonsContainer">
            <button value={"x"} className="btn" onClick={handleClick}>
              <img src={Xpic} width="76px"></img>
            </button>
            <button value={"o"} className="btn" onClick={handleClick}>
              <img src={Opic}></img>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Start;
