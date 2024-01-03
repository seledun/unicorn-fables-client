import "./style.css";
import Popup from "../Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";

function ForestMap({ randomUnicorns, selectedUnicorn, setSelectedUnicorn }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="unicorn-button-container">
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
                  <g id="copy-1" class="group">
                    <g class="large">
                      <path
                        id="large"
                        d="M41.25,40 L42.5,10 L43.75,40 L45,41.25 L75,42.5 L45,43.75 L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z"
                        fill="white"
                      />
                    </g>
                    <g class="large-2" transform="rotate(45)">
                      <use xlink:href="#large" />
                    </g>
                    <g class="small">
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
      />
    </>
  );
}

export default ForestMap;
