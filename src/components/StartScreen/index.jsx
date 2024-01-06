import React from "react";
import "./style.css"; // Relative path to the CSS file

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
