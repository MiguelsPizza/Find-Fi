import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import SignOutComponent from "./SignOutComponent.jsx";

const TopBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-wifi-vector-icon-png-image_963352.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          FIND-FI
        </Navbar.Brand>
        <SignOutComponent />
      </Container>
    </Navbar>
  );
};

export default TopBar;
