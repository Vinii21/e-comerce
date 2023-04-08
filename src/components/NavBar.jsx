import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Car from "../components/Car";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate()

  const token = useSelector(state => state.token)

  const verifyUser = () => {
    if(token){
      setShowCard(true)
    } else {
      navigate("/login")
    }
  }

  return (
    <>
    <Car showCard={showCard} setShowCard={setShowCard} />
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
