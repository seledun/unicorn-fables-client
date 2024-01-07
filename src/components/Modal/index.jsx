import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { generateFable } from "../../utility/api.js";
import "./style.css";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

function Popup({
  handleClose,
  show,
  selectedUnicorn,
  storyParameters,
  setCurrentPage,
  setSelectedFable,
}) {
  const { name, description, image, id } = selectedUnicorn;
  const { bgImage } = storyParameters;
  const baseURL = "http://127.0.0.1:5000/0.0.1/";
  const [loading, setLoading] = useState(false);

  console.log(setSelectedFable);
  console.log(setCurrentPage);

  //Generar en ny fabel
  async function generateFable() {
    setLoading(true);
    let mood = "";
    if (bgImage == 1) {
      mood = "happy";
    } else {
      mood = "night";
    }

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        mood: mood,
      }),
    };

    const response = await fetch(baseURL + "fables", options);
    const fabel = await response.json();

    setCurrentPage("storybook");
    setSelectedFable(fabel.uuid);

    return fabel;
  }

  return (
    <>
      <div className="pop-up">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop={loading ? "static" : true}
          keyboard={loading ? false : true}
        >
          <Modal.Header closeButton={!loading ? true : false}>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>

          {!loading ? (
            <>
              <Modal.Body className="popup-body">
                <div className="text">{description}</div>
                <div className="img">
                  <img
                    src={image}
                    alt={name}
                    style={{ maxWidth: 200, height: "auto" }}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="footer-content">
                  {" "}
                  <div className="modal-button">
                    <Button
                      variant="generate"
                      onClick={(e) => generateFable(bgImage, id)}
                    >
                      Generera fabel
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          ) : (
            <Modal.Body className="popup-body">
              <Spinner animation="border" variant="success"></Spinner>
            </Modal.Body>
          )}
        </Modal>
      </div>
    </>
  );
}

export default Popup;
