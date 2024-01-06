import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import { getFables, fetchABunchOfUniqueRandomUnicorns } from "./utility/api.js";
import "./App.css";
import MapPage from "./MapPage.jsx";
import StoryBookPage from "./StoryBookPage.jsx";
import React from "react";
import {Spotify, spotifySearch} from "./spotify_api.jsx";

function App() {
  const [start, setStart] = useState(false);
  const [randomUnicorns, setRandomUnicorns] = useState([]);
  const [selectedUnicorn, setSelectedUnicorn] = useState({});
  const [currentPage, setCurrentPage] = useState("map");

  useEffect(() => {
    fetchABunchOfUniqueRandomUnicorns(7).then((unicorns) => {
      setRandomUnicorns(unicorns);
    });
  }, []);

  //Hanterar "start-screen" innan man kommer in till main app.
  async function handleClick() {
    setStart(true);
    console.log("HEEEj");
    let token = await Spotify();
    spotifySearch(token, "unicorn");

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
        <button onClick={() => setCurrentPage("storybook")}>Storybook</button>
      </aside>
      <main>
        {currentPage === "map" ? (
          <MapPage
            randomUnicorns={randomUnicorns}
            selectedUnicorn={selectedUnicorn}
            setSelectedUnicorn={setSelectedUnicorn}
          />
        ) : (
          <StoryBookPage />
        )}
      </main>
    </div>
  );
}

export default App;
