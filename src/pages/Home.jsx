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
import {
  addCarThunk,
  getCarThunk,
  updateCarThunk,
} from "../store/slices/car.slice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";

const Home = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const cars = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(getProductsThunk());
    if (token) {
      dispatch(getCarThunk(token));
    }
  }, [cars]);

  const [inputValue, setInputValue] = useState("");

  const products = useSelector((state) => state.products);

  const addCar = (idProduct) => {
    // console.log(cars[0].product.id);
    // console.log(cars)
    if(cars.length === 0){
      console.log('condicion cumplida'+cars)
      dispatch(addCarThunk(token, { quantity: 1, productId: idProduct }));
    }else{
      console.log("else"+cars)
     for (const car of cars) {
      if(car.product?.id ===idProduct){
        dispatch(updateCarThunk(token,idProduct,{ quantity:2}))
      }else{
        dispatch(addCarThunk(token, { quantity: 1, productId: idProduct }));
      }
     }
    }
    
  };

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

        <Row xs={1} md={2} lg={3} className="py-1 ">
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
                    variant="top"
                    style={{ height: "200px", objectFit: "contain" }}
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
                    addCar(product?.id);
                  }}
                  className="btnBuy"
                  variant="primary"
                >
                  <i className="bx bx-cart-add"></i>
                </Button>
                {/* <Button
                    onClick={() => {
                     dispatch(addCarThunk( token, {quantity: 1, productId: product?.id}));
                    }}
                    className="btnBuy"
                    variant="primary"
                  >
                    <i className='bx bx-cart-add'></i>
                  </Button>  */}
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
