import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BackHome from "../components/BackHome";
import { getPurchasesThuk } from "../store/slices/purchases.slice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";

const Purchases = () => {

  const dispatch = useDispatch()
  const purchases = useSelector(state=> state.purchases)
  
  useEffect(()=>{
    dispatch(getPurchasesThuk())
  },[])

  
  return (
    <div className="container-purchases">
      <BackHome page={"purchases"} />
      <h2>My purchases </h2>
      <div>
        {
          purchases?.map(purchase => {
            return(
              <Container key={purchase?.id} className="table-purchases ">
                <Row>
                  <Col className="m-2">Fecha: {new Date(purchase?.createdAt).toLocaleString()}</Col>
                </Row>
                <Row>
                  <Col className="container__img__purchases">
                    <img  src={purchase?.product?.images?.[0].url} alt="producto" />
                  </Col>
                  <Col>
                    <span>{purchase?.product?.title}</span>
                  </Col>
                  <Col className="input-items">
                    <input style={{ width: "50px" }} type="text" defaultValue={purchase?.quantity} readOnly className="input__purchases text-center"/>
                  </Col>
                  <Col>
                    <span>${purchase?.product?.price * purchase?.quantity}</span>
                  </Col>
                </Row>
              </Container>
            )
          })
        }
      </div>
    </div>
  );
};

export default Purchases;
