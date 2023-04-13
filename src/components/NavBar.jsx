import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Car from "../components/Car";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const swalLogin = () => {
        Swal.fire({
          position: 'top-center',
          icon: 'warning',
          title: 'You must login to continue',
          showConfirmButton: false,
          timer: 1500
      })
    }

  const verifyToken = (boolean) => {
    if(token){
      setShowCard(boolean)
    } else {
      navigate("/login")
      swalLogin()
    }
  }

  const verifyUser = (arg) => {
    if(arg==="car") {
      verifyToken(!showCard)
    } else 
    if(arg==="login"){
      setShowCard(false)
    }
    if(arg==="purchases"){
      setShowCard(false)
      verifyToken(false)
    }
  }

  return (
    <>
    <Car showCard={showCard} setShowCard={setShowCard} />
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top nav">
      <Container>
          <Col xs={8} md={8}>
        <Navbar.Brand as={Link} to="/" onClick={()=>setShowCard(false)}>Products App</Navbar.Brand>      
        </Col>
        <Col xs={4} md={4}>
          <Nav className="justify-content-end flex-row navBar " >
            <Nav.Link as={Link} to={token ? "/user" : "/login"} onClick={()=>verifyUser("login")} className="p-2"><i className='bx bx-user'></i></Nav.Link>
            <Nav.Link as={Link} to="/purchases" className="p-2" onClick={()=>verifyUser("purchases")}><i className='bx bx-box' ></i></Nav.Link>
            <Nav.Link onClick={() => verifyUser("car")} className="p-2" ><i className='bx bx-cart'></i></Nav.Link>
          </Nav>
          </Col>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;
