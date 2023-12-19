function ExampleComponent() {
  /**
   * At the top of the component we can keep our STATE.
   * The idea is that we have some variable,
   * and that we want to CHANGE SOMETHING in the html
   * when that variable changes.
   * The first value in the brackets is the name of the variable,
   * the second is the
   */
  const [someState, setSomeState] = useState("");
  /**
   * All your logic goes here!
   * Fetching data from somewhere?
   * Handling a list of stuff?
   * Computing?
   * I dont know! The world is yours
   */
  var someText = "text";
  var someNumber = 1756;
  var someListOfNames = ["Bertil", "Greger", "Francis", "Ola"];
  var someObject = { key: "value" };
  /**
   * When we are in L O G I C  L A N D,
   * we can write javascript freely.
   * Below, we are in W E B  L A N D. To make the HTML understand we want to access javascript,
   * we need to add squigglyboys. {}
   */
  return (
    <div>
      <p>Text: {someText}</p>
      <p>Number: {someNumber}</p>
      <p>Key: {someObject["key"]}</p>
      <p>Some list:</p>
      <ul>
        {someListOfNames.map((name, i) => {
          return <li>{name}</li>;
        })}
      </ul>
    </div>
  );
}

/**function functionname() {  This is a function */


}
