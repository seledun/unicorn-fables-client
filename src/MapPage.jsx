import "./App.css";
import ForestMap from "./components/ForestMap";
//ToDO: GET alla enhörningar till framsidan (kartan) som klickbara objekt
//Todo: GET specifik enhörning (när användaren klickat på en enhörning)
//ToDO: Generera ny fabel, med sparfunktion (om användaren gillar den)
function MapPage({
  randomUnicorns,
  setSelectedUnicorn,
  selectedUnicorn,
  setCurrentPage,
  setSelectedFable,
}) {
  // console.log(setCurrentPage);
  // console.log(setSelectedFable);

  return (
    <>
      <ForestMap
        randomUnicorns={randomUnicorns}
        selectedUnicorn={selectedUnicorn}
        setSelectedUnicorn={setSelectedUnicorn}
        setCurrentPage={setCurrentPage}
        setSelectedFable={setSelectedFable}
      />
    </>
  );
}

export default MapPage;
