import { useState } from "react";
import React from "react";
import "./App.css";

import Start from "./components/Start";
import Match from "./components/Match";
import startFireBase from "./FirebaseConfig";

import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import Mode from "./components/Mode";
import Multiplayer from "./components/Multiplayer";
import { onValue, set } from "firebase/database";
function App() {
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState(false);
  const [player1, setPlayer1] = useState({
    name: "",
    symbol: "",
  });
  const [player2, setPlayer2] = useState({
    name: "",
    symbol: "",
  });

  const [clicked, setClicked] = useState(false);
  const [hoster, setHoster] = useState(null);
  const [myplayer, setmyPlayer] = useState({ id: "" });

  const signIn = (auth) =>
    signInAnonymously(auth)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  React.useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        function writeUserData(userId) {
          set(ref(db, "players/" + userId), {
            id: userId,
            role: "",
          });
        }
        setmyPlayer({ id: user.uid, role: "" });
        // ...
        writeUserData(user.uid);
      } else {
        // User is signed out
        // ...
        console.log("cannot access id");
      }
    });

    onValue(ref(db, "players/" + myplayer.id), (snapshot) => {
      setmyPlayer({ ...snapshot.val() });
    });
  }, [startFireBase()]);
  React.useEffect(() => {
    const db = getDatabase();
    set(ref(db, "players/", Object.keys(myplayer)[0]), {
      ...myplayer,
    });
  }, [myplayer]);
  if (mode == null) {
    return <Mode setMode={setMode}></Mode>;
  }
  if (mode == 1) {
    //*multiplayer
    startFireBase();

    return clicked ? (
      selected ? (
        <Match
          player1={player1}
          player2={player2}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          setSelected={setSelected}
        ></Match>
      ) : (
        <Start
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          player1={player1}
          setSelected={setSelected}
          signIn={signIn}
          mode={mode}
        ></Start>
      )
    ) : (
      <Multiplayer
        clicked={clicked}
        setClicked={setClicked}
        setmyPlayer={setmyPlayer}
        myplayer={myplayer}
      ></Multiplayer>
    );
  } else if (mode == 2) {
    return selected ? (
      <Match
        player1={player1}
        player2={player2}
        setPlayer1={setPlayer1}
        setPlayer2={setPlayer2}
        setSelected={setSelected}
      ></Match>
    ) : (
      <Start
        setPlayer1={setPlayer1}
        setPlayer2={setPlayer2}
        player1={player1}
        setSelected={setSelected}
      ></Start>
    );
  }
}

export default App;
