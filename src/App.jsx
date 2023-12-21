import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import "./App.css";


//GET för alla fabler som en lista (titlar)
async function getFables() {
  const response = await fetch('http://127.0.0.1:5000/0.0.1/fables')
  .then(response => response.json());

  return response;
}
//TODO:GET för specifik fabel med titel och text
async function getWholeFable(id) {
  const response = await fetch('http://127.0.0.1:5000/0.0.1/fables/'+id);
  const data = await response.json();
  setIndividualFable(data);

  return data;
}


function App() {
  const [start, setStart] = useState(false);
  const [listElements, setListElements] = useState([]);
  const [individualFable, setIndividualFable] = useState([]);

  useEffect(() => {
    getFables().then((data) => {
      console.log(data);
      setListElements(data);
    });
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
      { individualFable.map((fable) => (
          <section key={fable.id}>
            <strong>{fable.name}</strong><br />
            <strong>{fable.text}</strong><br />
          </section>
        )) }
      </ul>

    
    </div>
  );
}

export default App;
