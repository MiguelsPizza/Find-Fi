import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MapModal = ({ hotspot,toggle, updatetoggle }) => {
  const[submit, setSubmit] = useState('Submit')

  return (
    <Modal
      show={!!toggle}
      style={{ opacity: 1 }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      fade={false}
    >
      <Modal.Header closeButton onClick={()=> updatetoggle(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          {"Out Of Range: " + hotspot}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={() => updatetoggle(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;
