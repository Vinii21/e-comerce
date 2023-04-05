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
  filterPriceThunk
} from "../store/slices/products.slice";
import { useDispatch } from "react-redux";

export default function Filters() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [min, setMin] = useState("")  
  const [max, setMax] = useState("")

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
                <input type="number" placeholder="Min" min="0" value={min} onChange={(e) => setMin(e.target.value)}/>
              </Col>
              <Col>
                <label htmlFor="">To</label>
                <input type="number" placeholder="Max" min="0" value={max} onChange={(e) => setMax(e.target.value)}/>
              </Col>
              <Button onClick={()=>{ 
                dispatch(filterPriceThunk(min, max))
                setMin("")
                setMax("")
              }}>Filter Price</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
