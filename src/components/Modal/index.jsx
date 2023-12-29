import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Pop-up för enhörningsbeskrivning nedan
function Popup({ handleClose, show, selectedUnicorn }) {
  const { name, description, image } = selectedUnicorn;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Description: {description}
          <img src={image} style={{ maxWidth: 200, height: "auto" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              console.log("I AM CLIQ");
            }}
          >
            Generera fabel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
