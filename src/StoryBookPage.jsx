import { useState, useEffect } from "react";
import { getFables } from "./utility/api";
import "./storybook.css"; // Relative path to the CSS file

function StoryBookPage() {
  const [individualFable, setIndividualFable] = useState([]);
  const [allFables, setAllFables] = useState([]);
  const baseURL = "http://127.0.0.1:5000/0.0.1/";

  useEffect(() => {
    getFables().then((data) => {
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

    console.log(fabel);
    return fabel;
  }

  console.log("ALL", allFables);
  return (
    <>
      <div className="wrapper">
        <div className="fable-list-container">
          <h1>Fabelregister</h1>
          <ul>
            {allFables.map((fable) => {
              return (
                <li>
                  <button onClick={() => getWholeFable(fable.id)}>
                    <h3>{fable.name}</h3>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default StoryBookPage;
