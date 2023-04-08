import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useState } from "react";

const NavBar = () => {
  const [showCard, setShowCard] = useState(false);

  return (
    <>
    <Card showCard={showCard} setShowCard={setShowCard} />
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top nav">
      <Container>
       
          <Col xs={8} md={8}>
        <Navbar.Brand as={Link} to="/">Products App</Navbar.Brand>      
        </Col>
        <Col xs={4} md={4}>
          <Nav className="justify-content-end flex-row " >
            <Nav.Link as={Link} to="/login" className="p-2"><i className='bx bx-user'></i></Nav.Link>
            <Nav.Link as={Link} to="/purchases" className="p-2"><i className='bx bx-box' ></i></Nav.Link>
            <Nav.Link onClick={() => setShowCard(!showCard)} className="p-2" ><i className='bx bx-cart'></i></Nav.Link>
          </Nav>
          </Col>
         
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;
