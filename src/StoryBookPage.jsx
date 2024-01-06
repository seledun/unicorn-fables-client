import { useState, useEffect } from "react";
import { fetchBestFables, getNextFable } from "./utility/api";
import "./storybook.css"; // Relative path to the CSS file

function StoryBookPage({ selectedFableId, setSelectedFableId }) {
  const baseURL = "http://127.0.0.1:5000/0.0.1/";

  const [individualFable, setIndividualFable] = useState([]);
  const [allFables, setAllFables] = useState([]);

  const [fableSelected, setFableSelected] = useState(false);
  const [selectedFable, setSelectedFable] = useState([]);

  if (selectedFableId !== -1 && !fableSelected) {
    getWholeFable(selectedFableId);
    setSelectedFableId(-1);
  }

  useEffect(() => {
    fetchBestFables(10).then((data) => {
      console.log("Got some datur", data);
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

    if (response.status == 200) {
      setSelectedFable(fabel);
      setFableSelected(true);
    }

    console.log(fabel);
  }

  console.log("ALL", allFables);
  return (
    <>
      <div className="wrapper">
        <div className="fable-list-container">
          {fableSelected ? (
            <>
              <h1 className="selected-fable-name">{selectedFable.name}</h1>
              <div className="fable-text">
                <section>{selectedFable.text}</section>
                <button
                  onClick={() => getNextFable(selectedFable.id)}
                  className="next-button"
                >
                  Nästa
                </button>

                <button className="vote-button">Rösta</button>
              </div>
              <button className="next-button">Nästa fabel</button>
              <button className="vote-button">Rösta</button>
            </>
          ) : (
            <>
              <div className="list-container">
<<<<<<< Updated upstream
                <ol>
                  <h1>Fabelregister</h1>
=======
                <h1>Fabelregister</h1>
                <ul>
>>>>>>> Stashed changes
                  {allFables.map((fable) => {
                    return (
                      <li key={fable.id}>
                        <button onClick={() => getWholeFable(fable.id)}>
                          <h3>{fable.name}</h3>
                        </button>
                      </li>
                    );
                  })}
<<<<<<< Updated upstream
                </ol>
=======
                </ul>
>>>>>>> Stashed changes
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default StoryBookPage;
