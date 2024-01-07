import React from "react";
import "./style.css";

//Renders startscreen, button brings user to map-page
function StartScreen({ handleClick }) {
  return (
    <div className="app-container">
      <div className="startscreen-blob">
        <div className="fade-in-text">
          <h1>Välkommen till UnicornFables</h1>
        </div>
        <button className="start-button" onClick={handleClick}>
          Börja ditt äventyr här...<span className="arrow"></span>
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
