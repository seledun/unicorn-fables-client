import "./App.css";
import ForestMap from "./components/ForestMap";

function MapPage({
  randomUnicorns,
  setSelectedUnicorn,
  selectedUnicorn,
  setCurrentPage,
  setSelectedFable,
}) {
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
