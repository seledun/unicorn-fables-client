import "./style.css";
function StartScreen({ handleClick }) {
  return (
    <div className="wrapper">
      <h1>Some Title</h1>
      <button class="start-button" onClick={handleClick}>
        Start your journey here!
      </button>
    </div>
  );
}

export default StartScreen;
