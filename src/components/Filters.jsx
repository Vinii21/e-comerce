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
/* import NavDropdown from 'react-bootstrap/NavDropdown'; */

export default function Filters({setShowAsideFilter, showAsideFilter}) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [min, setMin] = useState("")  
  const [max, setMax] = useState("")
  const [heigthPrice, setHeigthPrice] = useState("0px")
  const [heigthButtons, setHeigthButtons] = useState("0px")

  useEffect(() => {
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);

  const showFilter = (x) => {
    if(x === "price") {
      heigthPrice === "0px" ? setHeigthPrice("140px") : setHeigthPrice("0px")
    } else {
      heigthButtons === "0px" ? setHeigthButtons("300px") : setHeigthButtons("0px")
    }
  }
  
  return (
      <Container className="w-100">
      <div className="aside__head">
        <h3>Filtros</h3>
        <i onClick={()=>setShowAsideFilter(!showAsideFilter)} className='bx bxs-x-circle'></i>
      </div>
      <Row className="aside-price d-flex justify-content-center align-items-center flex-column">
          <h3 className="pt-3">Price <i onClick={()=>showFilter("price")} className='bx bx-chevron-down'></i></h3>
          <Form style={{height: heigthPrice}} className="d-flex justify-content-start align-items-start flex-column formFilters">
              <Col>
                <label htmlFor="">From</label>
                <input type="number" placeholder="Min" min="0" value={min} onChange={(e) => setMin(e.target.value)}/>
              </Col>
              <Col
              className="mt-3"
              >
                <label htmlFor="">To</label>
                <input type="number" placeholder="Max" min="0" value={max} onChange={(e) => setMax(e.target.value)}/>
              </Col>
              <Button 
              className="mt-3 m-auto"
              onClick={()=>{ 
                dispatch(filterPriceThunk(min, max))
                setMin("")
                setMax("")
                setShowAsideFilter(!showAsideFilter)
              }}>Filter Price</Button>
          </Form>
      </Row>
      <Row className="py-3 aside-categories d-flex justify-content-center align-items-center flex-column" >
        <h3>Categories <i onClick={()=>showFilter("buttons")} className='bx bx-chevron-down'></i></h3>
        <div style={{height: heigthButtons}} className="btnCategories__container">
          {categories.map((category) => (
            <Row key={category.id} className="categories__aside" onClick={()=>setShowAsideFilter(!showAsideFilter)}> 
                  <Button className="btn__aside"
                    onClick={() => dispatch(filterCategoriesThunk(category.id))}
                  >
                    {category.name}
                  </Button>
            </Row>
          ))}
           <Row>
            <Button onClick={() => {
              dispatch(getProductsThunk())
              setShowAsideFilter(!showAsideFilter)
            }} className="w-100">
              All
            </Button>
          </Row>
        </div>
      </Row>        
      </Container>
  );
}
