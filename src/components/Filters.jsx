import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getProductsThunk,
  filterCategoriesThunk,
} from "../store/slices/products.slice";
import { useDispatch } from "react-redux";

export default function Filters() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <Container>
        <Row>
          {categories.map((category) => (
            <Col key={category.id}>
              <Button
                onClick={() => dispatch(filterCategoriesThunk(category.id))}
              >
                {category.name}
              </Button>
            </Col>
          ))}
          <Col>
            <Button
              onClick={() => dispatch(getProductsThunk())}
              className="w-100"
            >
              All
            </Button>
          </Col>
        </Row>

        <Row className="py-3"></Row>
        <Row>
          <h1>Price</h1>
          <Col>
            <Form>
              <Col>
                <label htmlFor="">From</label>
                <input></input>
              </Col>
              <Col>
                <label htmlFor="">To</label>
                <input></input>
              </Col>
              <Button>Filter Price</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
