import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterDetailThunk } from "../store/slices/products.slice";
import BackHome from "../components/BackHome";
import {
  addCarThunk,
  getCarThunk
} from "../store/slices/car.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const cars = useSelector((state) => state.car);
  const [count, setCount] = useState(1)

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((resp) => {
        setProduct(resp.data);
        dispatch(filterDetailThunk(resp.data?.category?.id, id));
      })
      .catch((error) => console.log(error));
  }, [id]);

  const addCar = (idProduct) => {
    if(cars.length === 0){
      dispatch(addCarThunk( { quantity: count, productId: idProduct }));
    } else {
      const index = cars.filter(car => parseInt(car.product.id)  === parseInt(idProduct))
      if(index.length === 0){
        dispatch(addCarThunk( { quantity: count, productId: idProduct }));
      }else{
        Swal.fire('Este producto ya está en el carrito')
      }
  }

  };

  const changeCount = (operator) => {
    if(operator === "+") {
      setCount(count + 1)
    } else {
      if(count === 1){
        setCount(1)
      } else {
        setCount(count - 1)
      }
    }
  }

  return (
    <Container className="mt-5 pt-5 container__detail">
      <BackHome page={product.title} />
      <Row className="pt-5">
        <Col xs={12} md={6} className="mx-auto">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block img__detail w-100"
                src={product.images?.[0].url}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block img__detail w-100"
                src={product.images?.[1].url}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block img__detail w-100"
                src={product.images?.[2].url}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col s={12} md={6}>
          <Card.Text>{product?.brand}</Card.Text>
          <Card.Title className="px-3 py-1">{product.title}</Card.Title>
          <Card.Title className="py-2">{product.description}</Card.Title>
          <Card.Text className="py-2">$ {product?.price}</Card.Text> 
          <div className="m-3 input__group__detail">
              <button onClick={()=>changeCount("-")}>-</button>
                <input type="number" min="0"  value={count} readOnly/>
              <button onClick={()=>changeCount("+")}>+</button>
            </div>
            <div className="btn__detail">
          <Button className="text-center m-3"
            onClick={() => {
              addCar(product?.id);
              setTimeout(()=>{
                dispatch(getCarThunk())
              },1000)
            }}
            variant="primary">
            Add to card <i className="bx bx-cart p-3"></i>
          </Button>
            </div>
          </Col> 
      </Row>
      <h2 className="mt-5 pt-5">Recomendados</h2>

      <Row xs={1} md={2} lg={3} className="py-1 justify-content-md-center">
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
                style={{
                  width: "auto",
                  height: "190px",
                  objectFit: "contain",
                }}
                src={product.images?.[0].url}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>$ {product?.price}</Card.Text>
                <Card.Text>{product?.brand}</Card.Text>
              </Card.Body>
            </Card>
            <Button
              onClick={() => {
                addCar(product?.id);
                setTimeout(()=>{
                  dispatch(getCarThunk())
                },1000)
              }}
              className="btnBuy"
              variant="primary"
            >
              <i className="bx bx-cart-add"></i>
            </Button>
          </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductDetail;
