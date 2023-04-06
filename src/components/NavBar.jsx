import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Card from "../components/Card"
import { useState } from "react";

const NavBar = () => {
  const [showCard, setShowCard] = useState(false)

  return (
    <>
      <Card showCard={showCard} setShowCard={setShowCard}/>
      <Navbar expand="lg" bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Products App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                Purchases
              </Nav.Link>
              <Nav.Link onClick={()=>setShowCard(true)}>Purchases (sideBar)</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
