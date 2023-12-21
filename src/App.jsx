import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import "./App.css";
import {Modal, Button } from 'react-bootstrap' //For pop-ups, t.ex
//ToDO: GET alla enhörningar till framsidan (kartan) som klickbara objekt
//Todo: GET specifik enhörning (när användaren klickat på en enhörning)
//ToDO: Generera ny fabel, med sparfunktion (om användaren gillar den)
const baseURL = 'http://127.0.0.1:5000/0.0.1/'


//GET för alla fabler som en lista (titlar)
async function getFables() {
  const response = await fetch('http://127.0.0.1:5000/0.0.1/fables')
  .then(response => response.json());

  return response;
}
async function listUnicorns() {
  const options = {
      method: "GET",
      headers: {
          "Accept": "application/json"
      }
  };
  const response = await fetch(baseURL + "unicorns", options);
  const unicorns = await response.json();

 // document.getElementById("unicorn-list").innerHTML = unicorns.map(unicorn => <li>${unicorn.id}</li>).join("");

 return unicorns
}


async function fetchABunchOfUniqueRandomUnicorns(range) {
  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  };

  const unicornList = []
  const idList = []
  const unicorns = await listUnicorns()

  for (let i in unicorns) {
      idList.push(unicorns[i].id)
  };

  for (let i = 0; i < range; i++) {
    let randomId = Math.floor(Math.random() * idList.length);

    // Genererar ett slumpmässigt index
    let id = idList[randomId];
    idList.splice(randomId, 1);
    let response = await fetch(baseURL + "unicorns/" + id, options)
    let unicorn = await response.json();
    unicornList.push(unicorn);
  }

  console.log(unicornList)
  return unicornList;
}

  // Pick a number of random unicorns
  // Fetch the random unicorns



  // Send unicorn

function App() {
  const [start, setStart] = useState(false);
  const [listElements, setListElements] = useState([]);
  const [individualFable, setIndividualFable] = useState([]);
  const [storyBoardActive, setStoryBoardActive] = useState([]);

//GET för individuell fabel när man klickar i listan 
  async function getWholeFable(id) {
  const response = await fetch('http://127.0.0.1:5000/0.0.1/fables/'+id);
  const data = await response.json();
  setIndividualFable(data);

  return data;
}

  useEffect(() => {
    getFables().then((data) => {
      console.log(data);
      setListElements(data);

    });
  }, [storyBoardActive])
  
  useEffect(() => {

    console.log(fetchABunchOfUniqueRandomUnicorns(5))

  }, [])

  //Vad ska vi begära?
  //Endpoints
  //Kan vi hämta data till vår app för att testa?
  //Vilka parametrar behöver dem?

  function handleClick() {
    setStart(true);
  }

  if (!start) {
    console.log("Start", start);
    return <StartScreen handleClick={handleClick} />;
  }


  return (
    <div className="wrapper">
      <h1>Some Title</h1>
      <p>List of fable names</p>
      <ul>
      { listElements.map((fable) => (
          <li key={fable.id}>
            <strong>{fable.name}</strong><button onClick={() => getWholeFable(fable.id)}></button><br/>
            <strong>{fable.votes}</strong><br />
          </li>
        )) }
      </ul>
      <p>One fable</p>
      <ul>
          <section key={individualFable.id}>
            <strong>{individualFable.name}</strong><br />
            <strong>{individualFable.text}</strong><br />
          </section>
      </ul>

    
    </div>
  );
}

export default App;
