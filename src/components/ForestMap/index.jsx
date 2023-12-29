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
              >
                *
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
