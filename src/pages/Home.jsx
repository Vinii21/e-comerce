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
  filterHeadLineThunk,
} from "../store/slices/products.slice";
import {
  addCarThunk,
  getCarThunk,
} from "../store/slices/car.slice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";

const Home = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car);

  const [inputValue, setInputValue] = useState("");
  const [showAsideFilter, setShowAsideFilter] = useState(false);

  const products = useSelector((state) => state.products);

  const token = localStorage.getItem("token")

  let mediaqueryList = window.matchMedia("(min-width: 900px)");
  
  setInterval(() => {
    if (mediaqueryList.matches) {
      setShowAsideFilter(true);   
    }
  },2000);

  const addCar = (idProduct) => {
    if(token){
      if (cars.length === 0) {
        dispatch(addCarThunk({ quantity: 1, productId: idProduct }));
      } else {
        const index = cars.filter(
          (car) => parseInt(car.product.id) === parseInt(idProduct)
        );
        if (index.length === 0) {
          dispatch(addCarThunk({ quantity: 1, productId: idProduct }));
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'This product is already added in the Cart',
            showConfirmButton: false,
            timer: 2000
        })
        }
      }
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'warning',
        title: 'You must login to continue',
        showConfirmButton: false,
        timer: 2000
    })
    }
  };

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCarThunk());
  }, []);

  return (
    <div className="home">
      <aside
        className="aside__home "
        style={
          showAsideFilter
            ? { left: "0px" }
            : { left: "-400px", opacity: "0", zIndex: "-1" }
        }
      >
        <Filters
          setShowAsideFilter={setShowAsideFilter}
          showAsideFilter={showAsideFilter}
        />
      </aside>
      <Container className="py-1 input__home">
        {
          products.length === 0 ?
          <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight:"100vh" }}>
            <h6>There are no products to display.</h6>
            <button onClick={()=>dispatch(getProductsThunk())} className="btn btn-dark">Load all products</button>
          </div>
          :
          <>
          <Row>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search products..."
                aria-label="Products Name"
                aria-describedby="basic-addon2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-dark text-white"
              />
              <Button
                variant="outline-primary"
                id="button-addon2"
                onClick={() => dispatch(filterHeadLineThunk(inputValue))}
              >
                Button
              </Button>
            </InputGroup>
            {!mediaqueryList.matches && <span
              className="btn__filter btn"
              onClick={() => setShowAsideFilter(!showAsideFilter)}
            >
              Mostrar Filtros<i className="bx bx-filter-alt"></i>
            </span>}
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
                    setTimeout(() => {
                      dispatch(getCarThunk());
                    }, 1000);
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
        </>
        }
      </Container>
    </div>
  );
};

export default Home;
