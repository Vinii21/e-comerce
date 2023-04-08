import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useState } from "react";

const NavBar = () => {
  const [showCard, setShowCard] = useState(false);

  const verifyUser = () => {
    
  }

  return (
    <>
    <Card showCard={showCard} setShowCard={setShowCard} />
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top nav">
      <Container>
        <Navbar.Brand href="#"  as={Link} to="/">Products App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#"  as={Link} to="/login">Login</Nav.Link>
            <Nav.Link href="#"   as={Link} to="/purchases">Purchases</Nav.Link>
            <Nav.Link href="#"   onClick={() => verifyUser()}>Purchases (sideBar)</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;
