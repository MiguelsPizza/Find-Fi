import React, { useState, useEffect } from "react";
import MainB from "./RSSI/MainB.jsx";
import TopBar from "./RSSI/TopBar.jsx";
import SideBar from "./RSSI/SideBar/SideBar.jsx";
import {
  getFirestore,
  collection,
  query,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import WifiMap from "./RSSI/SideBar/WifiMap.jsx";
import FriendsList from "./RSSI/SideBar/FriendsList.jsx";




const MainPage = ({ auth, firestore }) => {
  const [networks, setNetworks] = useState([]);
  const [autoFetch, ToggleAutoFetch] = useState(false);
  const [knownNetworks, setKnowNetworks] = useState([]);
  const[currentTab, setTab] = useState("SideBar")

  const updateNetworksData = (data) => {
    console.log('data', data)
    if (data) {
      setNetworks(data);
    } else {
      fetch("http://localhost:8550/currentConections",{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((dataList) => setNetworks(dataList));
    }
  };
  useEffect(() => {
    console.log("autoFetch", autoFetch);
    if (autoFetch) {
      let eventSource = new EventSource("http://localhost:8550/auto");
      eventSource.onmessage = (e) => updateNetworksData(JSON.parse(e.data));


      eventSource.onerror = () => {
        // error log here

        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    } else {
      console.log("here");
      updateNetworksData(null);
    }
  }, [autoFetch]);

  useEffect(() => {
    const getUserData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setKnowNetworks(docSnap.data().networks);
      } else {
        // doc.data() will be undefined in this case
        const userData = {
          UID: auth.currentUser.uid,
          email: auth.currentUser.email,
          userName: auth.currentUser.displayName,
        };
        await setDoc(doc(db, "Users", auth.currentUser.uid), userData, {
          merge: true,
        });
        console.log("added user");
      }
    };
    getUserData();
  }, [auth]);

  return (
    <Container className="bg-light" style={{ height: "1500px", width: "100%" }}>
      <Row>
        <TopBar />
      </Row>
      <Row>
        <MainB />
      </Row>
      <Row>
        <Nav fill variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={() =>{setTab("SideBar")}}>AvalibleNetworks</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() =>{setTab("FriendsList")}}>Friends</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() =>{setTab("WifiMap")}}>Map</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" >MyNetworks</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        { currentTab ==="SideBar" && <SideBar
          networks= {networks}
          ToggleAutoFetch={ToggleAutoFetch}
          autoFetch={autoFetch}
          updateNetworksData={updateNetworksData}
          knownNetworks={knownNetworks}
        />}
                { currentTab ==="WifiMap" && <WifiMap
          networks= {networks}

          updateNetworksData={updateNetworksData}
          knownNetworks={knownNetworks}
        />}
                { currentTab ==="FriendsList" && <FriendsList
          networks= {networks}
          auth={auth}

          updateNetworksData={updateNetworksData}
          knownNetworks={knownNetworks}
        />}

      </Row>
    </Container>
  );
};
//md={{ span: 3, offset: 3 }}

export default MainPage;
