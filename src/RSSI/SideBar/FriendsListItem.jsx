import React, {useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function FriendsListItem({ network, eventKey, known, setnetworkToAdd=null}) {
  const getBackgroundColor = (value) => {
    let color;
    if (value === 0) {
      color = "";
    } else if (value >= 1 && value < 80) {
      color = "red";
    } else if (value >= 80 && value < 90) {
      color = "orange";
    } else if (value >= 90 && value < 100) {
      color = "yellow";
    } else if (value >= 100) {
      color = "green";
    }
    return color;
  };
  const addNetwork = () =>{
    console.log('added')
    setnetworkToAdd(network)
  }

  return (
    <Accordion.Item
      eventKey={eventKey}
    >
      <Accordion.Header>{known ? network.ssid+ "*" : network.ssid }</Accordion.Header>
      <Accordion.Body>
        <ListGroup horizontal>
          <ListGroup.Item>RSSI: {network.signal_level} dbm</ListGroup.Item>
          <ListGroup.Item>Securtiy: {network.security}</ListGroup.Item>
        </ListGroup>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={()=> {addNetwork()}}>Connect to Network</Button>
          {known && <Button variant="secondary">Forget Network</Button>}
        </ButtonGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default FriendsListItem;
