import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import { Button } from "react-bootstrap";
import { getFables, fetchABunchOfUniqueRandomUnicorns } from "./utility/api.js";
import "./App.css";
import ForestMap from "./components/ForestMap/index.jsx";
//ToDO: GET alla enhörningar till framsidan (kartan) som klickbara objekt
//Todo: GET specifik enhörning (när användaren klickat på en enhörning)
//ToDO: Generera ny fabel, med sparfunktion (om användaren gillar den)

function App() {
  const [start, setStart] = useState(false);
  const [individualFable, setIndividualFable] = useState([]);
  const [storyBoardActive, setStoryBoardActive] = useState([]);
  const [randomUnicorns, setRandomUnicorns] = useState([]);
  const [selectedUnicorn, setSelectedUnicorn] = useState({});

  //GET för individuell fabel när man klickar i listan
  async function getWholeFable(id) {
    const response = await fetch("http://127.0.0.1:5000/0.0.1/fables/" + id);
    const data = await response.json();
    setIndividualFable(data);

    return data;
  }

  useEffect(() => {
    getFables().then((data) => {
      setListElements(data);
    });
  }, [storyBoardActive]);

  useEffect(() => {
    fetchABunchOfUniqueRandomUnicorns(7).then((unicorns) => {
      console.log("what the fuckkkkkkkkkkkk");
      setRandomUnicorns(unicorns);
    });
  }, []);

  //Hanterar "start-screen" innan man kommer in till main app.
  function handleClick() {
    setStart(true);
  }

  if (!start) {
    return <StartScreen handleClick={handleClick} />;
  }

  return (
    <div className="wrapper">
      <h1>Some Title</h1>
      <ForestMap
        randomUnicorns={randomUnicorns}
        selectedUnicorn={selectedUnicorn}
        setSelectedUnicorn={setSelectedUnicorn}
      />
    </div>
  );
}

export default App;
