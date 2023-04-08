import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsThunk,
  filterCategoriesThunk,
  filterHeadLineThunk,
} from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const [inputValue, setInputValue] = useState("");

  const products = useSelector((state) => state.products);

  return (
    <div className="home">
      <aside>
        <Filters />
      </aside>

      <Container className="py-1 ">
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Buscar productos"
                aria-label="Products Name"
                aria-describedby="basic-addon2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="outline-primary"
                id="button-addon2"
                onClick={() => dispatch(filterHeadLineThunk(inputValue))}
              >
                Button
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3}  className="py-1 ">
          {products.map((product) => {
            return (
              <Col key={product?.id} className="my-1 colCard">
                <Card
                  className="CardProduct"
                  as={Link}
                  to={`/product/${product.id}`}
                  style={{ width: "100%", height: "400px" }}
                >
                  <Card.Img
                  className="m-1"
                    variant="top"
                    style={{ width: "auto", height: "190px", objectFit: "contain" }}
                    src={product.images?.[0].url}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product?.price}</Card.Text>
                    <Card.Text>{product?.brand}</Card.Text>
                  </Card.Body>
                </Card>
                <Button
                    onClick={() => {
                      console.log("hola");
                    }}
                    className="btnBuy"
                    variant="primary"
                  >
                    <i className='bx bx-cart-add'></i>
                  </Button>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
