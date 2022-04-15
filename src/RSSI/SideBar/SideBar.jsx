import React, { useState } from "react";
import SideBarItem from "./SideBarItem.jsx";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import AddNetworkModal from "./AddNetworkModal.jsx";

// const cityRef = doc(db, 'cities', 'BJ');
// setDoc(cityRef, { capital: true }, { merge: true });
const StyledDiv = styled.div`
&&& {
  max-height: 80vh;
  overflow-y: scroll;
}
`;
const Styledh3 = styled.h3`
&&& {
  color: grey;
  font-size: 20px;
}
`;
//
function SideBar({
  networks,
  ToggleAutoFetch,
  autoFetch,
  updateNetworksData,
  knownNetworks,
}) {
  const [rememberAuto, setRemeberAuto] = useState(null);
  const [networkToAdd, setnetworkToAdd] = useState(false);
  // console.log('modal toggle',!!networkToAdd)
  let counter = 0;
  // ${getBackgroundColor(network.quality)}

  const decideToggleFetch = () => {
    if (rememberAuto) {
      ToggleAutoFetch(true);
    }
  };

  // console.log('auth', auth)

  //onMouseLeave={() => decideToggleFetch}
  let keyCounter = 0;
  return (
    <Container style={{ width: "100%" }}>
      <Navbar bg="dark" variant="dark">
      <AddNetworkModal networkToAdd={networkToAdd} setnetworkToAdd={setnetworkToAdd} />
        <Container>
          <Navbar.Brand>
            <Styledh3>AVAILBLE NETWORKS</Styledh3>
          </Navbar.Brand>
          <Navbar.Text className="justify-content-end">
            <Row>
              <Col md="auto">
                <Button onClick={() => updateNetworksData(null)}>
                  {networks.length > 0 ? "Refresh" : "Loading..."}
                </Button>
              </Col>
              <Col>
                <Button onClick={() => ToggleAutoFetch(!autoFetch)}>
                  {autoFetch ? "Turn off Auto Fetch" : "Turn on Auto Fetch"}
                </Button>
              </Col>
            </Row>
          </Navbar.Text>
        </Container>
      </Navbar>
      <StyledDiv>
        <Accordion>
          {networks.map((network) => {
            const markedKnown = knownNetworks.filter((knowNetwork) => {
              // if (network.ssid === "NETGEAR34-5G") {
              //   console.log("knowNetwork", knowNetwork.ssid.length);
              //   console.log("network", network.ssid.length);
              //   console.log(
              //     "knowNetwork[network.ssid]",
              //     knowNetwork.ssid.trim() === network.ssid.trim()
              //   );
              // }
              return knowNetwork.ssid.trim() === network.ssid.trim();
            });
            if (markedKnown.length > 0) {
              return (
                <SideBarItem
                  key = {keyCounter++}
                  network={network}
                  eventKey={counter++}
                  known={true}
                />
              );
            } else {
              return (
                <SideBarItem
                  key = {keyCounter++}
                  network={network}
                  eventKey={counter++}
                  known={false}
                  setnetworkToAdd={setnetworkToAdd}
                />
              );
            }
          })}
        </Accordion>
      </StyledDiv>

    </Container>
  );
}
//{networkToAdd && <addNetworkModal networkToAdd={networkToAdd}/>}
// console.log('addNetworkModal', AddNetworkModal)

export default SideBar;
