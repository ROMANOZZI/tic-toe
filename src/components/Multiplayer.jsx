import React from "react";
import xStroke from "../Assets/xStroke.png";
import oStroke from "../Assets/oStroke.png";
import startFireBase from "../FirebaseConfig";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const Multiplayer = ({ clicked, setClicked, setmyPlayer, myplayer }) => {
  const [showInput, setShowInput] = React.useState(null);
  const OpponentID = React.useRef();
  console.log(myplayer);
  return (
    <div className="container">
      <img src={xStroke} className="xStroke"></img>
      <img src={oStroke} className="oStroke"></img>

      <div className="heading">
        <div className="modeContainer">
          <button
            className="gamebtn"
            onClick={() => {
              setShowInput(true);
              setmyPlayer((prev) => ({ ...prev, role: "hoster" }));
            }}
          >
            Create game
          </button>
          <button
            className="gamebtn"
            onClick={() => {
              setShowInput(false),
                setmyPlayer((prev) => ({ ...prev, role: "visitor" }));
            }}
          >
            Join game
          </button>
        </div>
        <div className="userIDContainer">
          {showInput !== null ? (
            showInput ? (
              <React.Fragment>
                <input
                  className="userID"
                  type="text"
                  ref={OpponentID}
                  placeholder="enter your friend ID"
                  onChange={(e) => {
                    console.log(OpponentID.current.value);
                  }}
                ></input>

                <input
                  type="button"
                  className="gamebtn"
                  value="submit"
                  style={{
                    width: "fit-content",
                    margin: "auto",
                    marginTop: "1.5em",
                  }}
                  onClick={() => []}
                ></input>
              </React.Fragment>
            ) : (
              <p id="question">your ID :{myplayer.id}</p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;
