import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddNetworkModal = ({ networkToAdd, setnetworkToAdd }) => {
  const[submit, setSubmit] = useState('Submit')
  const attemptConnection = async () =>{
    const password = document.getElementById('password').value;
    const addtoknown = !!document.getElementById('addtoknown').value;
    const body = {
      password: password,
      addtoknown: addtoknown,
      ssid: networkToAdd.ssid
    }
    setSubmit("Connecting...")
    const serverResponse = await fetch("http://localhost:8550/intialLoadrssi", {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body)
    });
    if(serverResponse === "connected"){
      alert(`conncected to ${networkToAdd.ssid}`)
      setnetworkToAdd(false)
    }else{
      alert(`failed to connect to  ${networkToAdd.ssid} try another password`)
      setSubmit('Submit')
    }

  }
  return (
    <Modal
      show={!!networkToAdd}
      style={{ opacity: 1 }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      fade={false}
    >
      <Modal.Header closeButton onClick={()=> setnetworkToAdd(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          {"Conect to: "+networkToAdd.ssid}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label id="password">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Add to Know Networks Upon Sucsessful conection" id="addtoknown" />
          </Form.Group>
          <Button variant="primary" onClick={()=>{attemptConnection()}}>
            {submit}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setnetworkToAdd(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNetworkModal;
