import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { generateFable } from "../../utility/api.js";
import "./style.css";

function Popup({ handleClose, show, selectedUnicorn, storyParameters }) {
  const { name, description, image, id } = selectedUnicorn;
  const { bgImage } = storyParameters;
  const baseURL = "http://127.0.0.1:5000/0.0.1/";

  return (
    <>
      <div className="pop-up">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
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
              <Button variant="generate" onClick={(e) => generateFable(bgImage, id)}>
                Generera fabel
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Popup;
