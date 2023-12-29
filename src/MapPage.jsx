import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import { Button } from "react-bootstrap";
import { getFables, fetchABunchOfUniqueRandomUnicorns } from "./utility/api.js";
import StoryBookPage from "./StoryBookPage.jsx";
import "./App.css";
import ForestMap from "./components/ForestMap";
//ToDO: GET alla enhörningar till framsidan (kartan) som klickbara objekt
//Todo: GET specifik enhörning (när användaren klickat på en enhörning)
//ToDO: Generera ny fabel, med sparfunktion (om användaren gillar den)
function MapPage({ randomUnicorns, setSelectedUnicorn, selectedUnicorn }) {
  return (
    <>
      <h1>Some Title</h1>
      <ForestMap
        randomUnicorns={randomUnicorns}
        selectedUnicorn={selectedUnicorn}
        setSelectedUnicorn={setSelectedUnicorn}
      />
    </>
  );
}

export default MapPage;
