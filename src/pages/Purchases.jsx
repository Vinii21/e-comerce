import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BackHome from "../components/BackHome";


const Purchases = () => {
  return (
    <div className="container-purchases">
      <BackHome page={"purchases"} />
      <h2>My purchases </h2>
      <div>
        <Container className="table-purchases">
          <Row>
            <Col>Fecha</Col>
          </Row>
          <Row>
            <Col>
              <img src="/esta.jpeg" alt="producto" width="50" />
            </Col>
            <Col>
              <span>Nombre Producto</span>
            </Col>
            <Col className="input-items">
              <input style={{ width: "50px" }} type="text" defaultValue={1} />
            </Col>
            <Col>
              <span>$850</span>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Purchases;
