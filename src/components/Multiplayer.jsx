import React from "react";
import xStroke from "../Assets/xStroke.png";
import oStroke from "../Assets/oStroke.png";
import startFireBase from "../FirebaseConfig";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";
const Multiplayer = ({
  clicked,
  setClicked,
  setmyPlayer,
  myplayer,
  games,
  setSelected,
}) => {
  console.log(myplayer);
  const [showInput, setShowInput] = React.useState(null);
  const [hosterId, setHosterId] = React.useState("");
  const OpponentID = React.useRef();
  const db = getDatabase();
  console.log(games);
  const makeGame = (player1ID) => {
    set(ref(db, "games/" + myplayer.id), {
      player1: { id: player1ID },
    });
  };
  const joinGame = (hosterID) => {
    if (games[hosterID] != undefined) {
      set(ref(db, "games/" + hosterID), {
        ...games[hosterID],
        player2: { id: myplayer.id },
      });
    }
  };

  //to enter the game if someone joined me
  React.useEffect(() => {
    if (Object.keys(games).length > 0 && myplayer.role == "hoster") {
      if (Object.hasOwn(games[myplayer.id], "player2")) {
        setClicked(true);
      }
    }
    if (myplayer.role == "visitor") {
      if (Object.hasOwn(games[hosterId].player1, "symbol")) {
        setClicked(true);
        setSelected(true);
      }
    }
  }, [games]);
  // to disable joining self capability
  React.useEffect(() => {
    if (myplayer.role == "visitor" && games[myplayer.id]) {
      remove(ref(db, "games/" + myplayer.id));
    }
  }, [myplayer.role]);
  return (
    <div className="container">
      <img src={xStroke} className="xStroke"></img>
      <img src={oStroke} className="oStroke"></img>

      <div className="heading">
        <div className="modeContainer">
          <button
            className="gamebtn"
            onClick={() => {
              setShowInput(false);
              setmyPlayer((prev) => ({ ...prev, role: "hoster" }));
              makeGame(myplayer.id);
            }}
          >
            Create game
          </button>
          <button
            className="gamebtn"
            onClick={() => {
              setShowInput(true),
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
                  onClick={() => {
                    joinGame(OpponentID.current.value);
                    setHosterId(OpponentID.current.value);
                  }}
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
