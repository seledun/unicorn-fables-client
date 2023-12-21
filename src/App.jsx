import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import "./App.css";

async function getFables() {
    const response = await fetch('http://127.0.0.1:5000/0.0.1/fables')
    .then(response => response.json());

    return response;
}

function App() {
  const [start, setStart] = useState(false);
  const [listElements, setListElements] = useState([]);

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
      <p>This is some text because I am too lazy to fetch lorem ipsum</p>
      <ul>
      { listElements.map((fable) => (
          <li key={fable.id}>
            <strong>{fable.name}</strong><br />
            <strong>{fable.votes}</strong><br />
          </li>
        )) }
      </ul>    
    </div>
  );
}

export default App;
