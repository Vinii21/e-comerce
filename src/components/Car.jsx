import { useDispatch, useSelector } from "react-redux";
import { deleteCarThunk, getCarThunk } from "../store/slices/car.slice";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import { addPurchasesThuk } from "../store/slices/purchases.slice"
import { useEffect, useState } from "react";

const Car = ({ showCard, setShowCard }) => {

  const cars = useSelector((state) => state.car);
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const deletCart =(id)=>{
    dispatch(deleteCarThunk(id))
    dispatch(getCarThunk());
  }

  const updateTotal = () => {
    let sum = 0
    for(let i = 0; i < cars.length; i++){
      sum += Number(cars[i].product.price) * cars[i].quantity
    }
    setTotal(sum)
  }

  return (
    <div
      className="card__container"
      style={
        showCard
          ? { right: "0px", opacity: "1", zIndex: "101" }
          : { right: "-300px", opacity: "0", zIndex: "-1" }
      }
    >
      <div className="card__close">
        <h4>Carrito de compras</h4>
        <i
          onClick={() => setShowCard(!showCard)}
          className="bx bxs-x-circle"
        ></i>
      </div>
      <ul className="card__products">
        {cars?.map((car) => {
          return (
            <Item  key={car?.id} deletCart={deletCart} data={car} updateTotal={updateTotal}/>
          );
        })}
      </ul>
      <div className="container__total">
        <div className="total__info">
          <span>
            <strong>Total:</strong>
          </span>
          <span>${total}</span>
        </div>
        <button onClick={()=>{
          navigate("/purchases")
          setShowCard(!showCard)
          dispatch(addPurchasesThuk())
          dispatch(getCarThunk())
        }}>Checkout</button>
      </div>
    </div>
  );
};

export default Car;
