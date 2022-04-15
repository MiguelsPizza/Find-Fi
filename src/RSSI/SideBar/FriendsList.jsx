import React, { useState, useEffect } from "react";
import FriendsListItem from "./FriendsListItem.jsx";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import AddNetworkModal from "./AddNetworkModal.jsx";
import {
  getFirestore,
  collection,
  query,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// const cityRef = doc(db, 'cities', 'BJ');
// setDoc(cityRef, { capital: true }, { merge: true });

const StyledDiv = styled.div`
&&& {
  max-height: 1000px; /* or any value */
  overflow-y: auto;
}
`;
const Styledh3 = styled.h3`
&&& {
  color: grey;
  font-size: 20px;
}
`;
//
function FriendsList({ networks, auth, updateNetworksData, knownNetworks }) {
  const [rememberAuto, setRemeberAuto] = useState(null);
  const [networkToAdd, setnetworkToAdd] = useState(false);
  console.log("modal toggle", !!networkToAdd);
  const db = getFirestore();
  let counter = 0;
  // ${getBackgroundColor(network.quality)}

  const decideToggleFetch = () => {
    if (rememberAuto) {
      ToggleAutoFetch(true);
    }
  };
  const [friendsList, setFriendsList] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    const getFriendsList = async () => {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const arr = [];
      console.log("friends", docSnap.data());
      const userData = docSnap.data();
      setFriendsList(userData.friends);
      userData.friends.forEach((friend) => {
        const doStuff = async () => {
          const id = friend.trim();
          console.log("id", id);
          const docFriend = doc(db, "Users", id);
          const docFriendSnap = await getDoc(docFriend);
          const temp = docFriendSnap.data();
          console.log("docFriendSnap.data()", docFriendSnap.data());
          setData(temp);
        };
        doStuff();
      });
    };
    getFriendsList();
  }, []);
  const [requestedacc, setAcc] = useState("Request Accsess");
  const [event, setEvent] = useState(0);

  const test = async () => {
    const body = {};
    const serverResponse = await fetch("http://localhost:8550/request", {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });
  };
  // console.log('auth', auth)

  //onMouseLeave={() => decideToggleFetch}
  return (
    <Container style={{ width: "100%" }}>
      <Navbar bg="dark" variant="dark">
        <AddNetworkModal
          networkToAdd={networkToAdd}
          setnetworkToAdd={setnetworkToAdd}
        />
        <Container>
          <Navbar.Brand>
            <Styledh3>FriendsList</Styledh3>
          </Navbar.Brand>
          <Navbar.Text className="justify-content-end">
            <Row>
              <Col md="auto">
                <Button onClick={() => updateNetworksData(null)}>
                  {networks.length > 0 ? "Refresh" : "Loading..."}
                </Button>
              </Col>
            </Row>
          </Navbar.Text>
        </Container>
      </Navbar>
      <StyledDiv>
        <Accordion>
          <Accordion.Item eventKey={event}>
            <Accordion.Header>{data && data?.username}</Accordion.Header>
            <Accordion.Body>
              <ListGroup horizontal>
                <ListGroup.Item>
                  {data && data?.networks[0].ssid}
                </ListGroup.Item>
              </ListGroup>
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setAcc("Requested");
                    test();
                    setEvent(1);
                  }}
                >
                  {requestedacc}
                </Button>
              </ButtonGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </StyledDiv>
    </Container>
  );
}
//{networkToAdd && <addNetworkModal networkToAdd={networkToAdd}/>}
// console.log('addNetworkModal', AddNetworkModal)

export default FriendsList;
