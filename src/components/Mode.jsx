import React from "react";
import xStroke from "../Assets/xStroke.png";
import oStroke from "../Assets/oStroke.png";

const Mode = ({ setMode }) => {
  return (
    <React.Fragment>
      <div className="container">
        <img src={xStroke} className="xStroke"></img>
        <img src={oStroke} className="oStroke"></img>

        <div className="heading">
          <p>Select mode</p>
          <div className="modeContainer">
            <button
              className="gamebtn"
              onClick={() => {
                setMode(2);
              }}
            >
              Local Multiplayer
            </button>
            <button
              className="gamebtn"
              onClick={() => {
                setMode(1);
              }}
            >
              Multiplayer
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Mode;
