import { useState } from "react";
import StartScreen from "./components/StartScreen/index.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

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
    </div>
  );
}

export default App;
