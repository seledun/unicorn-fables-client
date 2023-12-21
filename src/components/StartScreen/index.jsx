import "./style.css";
function StartScreen({ handleClick }) {
  return (
    <div className="app-container">
      <h1>Some Title</h1>
      <button className="start-button" onClick={handleClick}>
        Start your journey here!
      </button>
    </div>
  );
}

export default StartScreen;
