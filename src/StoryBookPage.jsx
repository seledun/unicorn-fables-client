import { useState, useEffect } from "react";
import { fetchBestFables, getNextFable } from "./utility/api";
import "./storybook.css"; // Relative path to the CSS file

function StoryBookPage({ selectedFableId, setSelectedFableId }) {
  const baseURL = "http://127.0.0.1:5000/0.0.1/";

  const [allFables, setAllFables] = useState([]);
  const [fableSelected, setFableSelected] = useState(false);
  const [selectedFable, setSelectedFable] = useState({});

  if (selectedFableId !== -1 && !fableSelected) {
    getWholeFable(selectedFableId);
    setSelectedFableId(-1);
  }

  useEffect(() => {
    fetchBestFables(10).then((data) => {
      console.log("Got some data", data);
      setAllFables(data);
    });
  }, []);

  //GET för individuell fabel när man klickar i listan
  async function getWholeFable(id) {
    const options = {
      method: "GET",
    };

    let response = await fetch(baseURL + "fables/" + id, options);
    const fabel = await response.json();

    if (response.status === 200) {
      setSelectedFable(fabel);
      setFableSelected(true);
    }

    console.log(fabel);
  }

  async function handleNextFable() {
    let nextFable = await getNextFable(selectedFable.id);
    console.log(nextFable.id);
    setSelectedFable(nextFable);
  }

  return (
    <div className="wrapper">
      <div className="fable-list-container">
        {fableSelected ? (
          <>
            <h1 className="selected-fable-name">{selectedFable.name}</h1>
            <div className="fable-text">
              <section>{selectedFable.text}</section>
              <button onClick={handleNextFable} className="next-button">
                Nästa
              </button>
              <button className="vote-button">Rösta</button>
            </div>
          </>
        ) : (
          <div className="list-container">
            <ol>
              <h1>Fabelregister</h1>
              {allFables.map((fable) => (
                <li key={fable.id}>
                  <button onClick={() => getWholeFable(fable.id)}>
                    <h3>{fable.name}</h3>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryBookPage;
