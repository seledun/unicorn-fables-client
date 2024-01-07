import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import { fetchABunchOfUniqueRandomUnicorns } from "./utility/api.js";
import "./App.css";
import MapPage from "./MapPage.jsx";
import StoryBookPage from "./components/StoryBook/StoryBookPage.jsx";
import React from "react";

//Renders Reactapp
function App() {
  const [start, setStart] = useState(false);
  const [randomUnicorns, setRandomUnicorns] = useState([]);
  const [selectedUnicorn, setSelectedUnicorn] = useState({});
  const [currentPage, setCurrentPage] = useState("map");
  const [selectedFable, setSelectedFable] = useState(-1);

  useEffect(() => {
    fetchABunchOfUniqueRandomUnicorns(7).then((unicorns) => {
      setRandomUnicorns(unicorns);
    });
  }, []);

  //Handles startscreen and "routing"
  function handleClick() {
    setStart(true);
  }

  if (!start) {
    return (
      <div className="wrapper">
        <StartScreen handleClick={handleClick} />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <aside>
        <button onClick={() => setCurrentPage("map")}>Hem</button>
        <button onClick={() => setCurrentPage("storybook")}>Fabelbok</button>
      </aside>
      <main>
        {currentPage === "map" ? (
          <MapPage
            randomUnicorns={randomUnicorns}
            selectedUnicorn={selectedUnicorn}
            setSelectedUnicorn={setSelectedUnicorn}
            setCurrentPage={setCurrentPage}
            setSelectedFable={setSelectedFable}
          />
        ) : (
          <StoryBookPage
            selectedFableId={selectedFable}
            setSelectedFableId={setSelectedFable}
          />
        )}
      </main>
    </div>
  );
}

export default App;
