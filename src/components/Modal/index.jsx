import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";

function Popup({ handleClose, show, selectedUnicorn }) {
  const { name, description, image } = selectedUnicorn;

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
              <Button
                variant=""
                onClick={(e) => {
                  console.log("I AM CLIQ");
                }}
              >
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
