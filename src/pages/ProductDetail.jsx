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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((resp) => {
        setProduct(resp.data);
        dispatch(filterDetailThunk(resp.data?.category?.id, id));
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Container className="mt-5 pt-5 container__detail">
      <BackHome page={product.title} />
      <Row className="pt-5">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block img__detail"
                src={product.images?.[0].url}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block img__detail"
                src={product.images?.[1].url}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block img__detail"
                src={product.images?.[2].url}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <Card.Text>{product?.brand}</Card.Text>
          <Card.Title className="px-3 py-1">{product.title}</Card.Title>
          <Card.Title className="py-2">{product.description}</Card.Title>
          <Card.Text className="py-2">$ {product?.price}</Card.Text>
          <Button variant="primary">
            Add to card <i className="bx bx-cart p-3"></i>
          </Button>
        </Col>
      </Row>
      <h2 className="mt-5 pt-5">Recomendados</h2>

      <Row xs={1} md={2} lg={3} className="py-1 justify-content-md-center">
        {products.map((product) => {
          return (
            <Col key={product?.id} className="my-1 " >
              <Card
                as={Link}
                to={`/product/${product.id}`}
                style={{ width: "18rem", height: "30rem" }}
              >
                <Card.Img
                  variant="top"
                  src={product.images?.[0].url}
                  style={{height: "200px" }}
                  className="my-3 mx-auto"
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>$ {product?.price}</Card.Text>
                  <Card.Text>{product?.brand}</Card.Text>
                  <Container fluid>
                  <Row className="text-center">
                    <Col xs={9}>
                  <Button variant="primary">Go somewhere</Button>
                    </Col>
                    <Col xs={3}>
                  <Button variant="primary"><i className="bx bx-cart"></i> </Button>
                    </Col>
                  </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductDetail;
