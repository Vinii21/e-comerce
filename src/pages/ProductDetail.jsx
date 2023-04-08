import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
    <div className="container-detailt">
     
      <Row>  
      <BackHome page={product.title} />
        <Col className="my-1">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              style={{ height: "200", objectFit: "cover" }}
              src={product.images?.[0].url}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product?.price}</Card.Text>
              <Card.Text>{product?.brand}</Card.Text>
              {/* <Button as={ Link } to={`/product/${product.id}`} variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2>Recomendados</h2>
      <Row xs={1} md={2} lg={3} className="py-1">
        {products.map((product) => {
          return (
            <Col key={product?.id} className="my-1">
              <Card
                as={Link}
                to={`/product/${product.id}`}
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  style={{ width: "auto", height: "190px" }}
                  src={product.images?.[0].url}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product?.price}</Card.Text>
                  <Card.Text>{product?.brand}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ProductDetail;
