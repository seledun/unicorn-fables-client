import { useState, useEffect } from "react";
import { getFables } from "./utility/api";
import HTMLFlipBook from "react-pageflip";
function StoryBookPage() {
  const [individualFable, setIndividualFable] = useState([]);
  const [allFables, setAllFables] = useState([]);

  useEffect(() => {
    getFables().then((data) => {
      console.log("Got some datur", data);
      setAllFables(data);
    });
  }, []);
  //GET för individuell fabel när man klickar i listan
  async function getWholeFable(id) {
    const response = await fetch("http://127.0.0.1:5000/0.0.1/fables/" + id);
    const data = await response.json();
    setIndividualFable(data);

    return data;
  }
  console.log("ALL", allFables);
  return (
    <>
      <ul>
        {allFables.map((fable) => {
          return (
            <li>
              <button href="#">
                <h3>{fable.name}</h3>
              </button>
            </li>
          );
        })}
      </ul>
      <HTMLFlipBook width={300} height={500}>
        <div className="book-page">
          <p>
            Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page
            1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1
          </p>
        </div>
        <div className="book-page">
          <p>
            Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page
            1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1
          </p>
        </div>
        <div className="book-page">
          <p>
            Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page
            1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1
          </p>
        </div>
        <div className="book-page">
          <p>
            Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page
            1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1
          </p>
        </div>
        <div className="book-page">
          <p>
            Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page
            1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1Page 1
          </p>
        </div>
      </HTMLFlipBook>
    </>
  );
}

export default StoryBookPage;
