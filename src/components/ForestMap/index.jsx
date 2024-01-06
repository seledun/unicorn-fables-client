import "./style.css";
import Popup from "../Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";

function ForestMap({
  randomUnicorns,
  selectedUnicorn,
  setSelectedUnicorn,
  setCurrentPage,
  setSelectedFable,
}) {
  console.log("Forest Map");
  console.log(setSelectedFable);

  console.log("Current Page");
  console.log(setCurrentPage);

  const [show, setShow] = useState(false);
  const [bgImage, setBgImage] = useState(1); // State to track background image

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleBackground = () => {
    setBgImage((prev) => (prev === 1 ? 2 : 1)); // Toggle between 1 and 2
  };

  return (
    <>
      <label className="switch-button">
        <input
          type="checkbox"
          onChange={toggleBackground}
          checked={bgImage === 2}
        />
        <span className="slider round"></span>
        Toggle Background
      </label>

      <div
        className="unicorn-button-container"
        style={{
          backgroundImage: `url(${
            bgImage === 1
              ? "https://png.pngtree.com/background/20230616/original/pngtree-fairy-forest-in-hd-desktop-wallpaper-picture-image_3627866.jpg"
              : "src/components/ForestMap/dark-mode-background.jpg"
          })`,
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      >
        {randomUnicorns.length &&
          randomUnicorns.map((unicorn, i) => {
            return (
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedUnicorn(unicorn);
                  handleShow();
                }}
                size="lg"
                key={i}
                style={{ position: "relative", zIndex: 1 }}
              >
                <svg id="one" width="100" height="100" viewBox="0 0 100 100">
                  <g id="copy-1" className="group">
                    <g className="large">
                      <path
                        id="large"
                        d="M41.25,40 L42.5,10 L43.75,40 L45,41.25 L75,42.5 L45,43.75 L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z"
                        fill="white"
                      />
                    </g>
                    <g className="large-2" transform="rotate(45)">
                      <use xlinkHref="#large" />
                    </g>
                    <g className="small">
                      <path
                        id="small"
                        d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75 L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z"
                        fill="white"
                      />
                    </g>
                  </g>
                </svg>
              </Button>
            );
          })}
      </div>

      <Popup
        handleClose={handleClose}
        show={show}
        selectedUnicorn={selectedUnicorn}
        storyParameters={bgImage}
        setCurrentPage={setCurrentPage}
        setSelectedFable={setSelectedFable}
      />
    </>
  );
}

export default ForestMap;
