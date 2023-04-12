import { useDispatch, useSelector } from "react-redux";
import { deleteCarThunk, getCarThunk, updateCarThunk } from "../store/slices/car.slice";
import { useNavigate } from "react-router-dom";
import Item from "./Item";

const Car = ({ showCard, setShowCard }) => {

  const cars = useSelector((state) => state.car);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const deletCart =(id)=>{
    dispatch(deleteCarThunk(id))
    dispatch(getCarThunk());
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
            <Item  key={car?.id} deletCart={deletCart} data={car}/>
          );
        })}
      </ul>
      <div className="container__total">
        <div className="total__info">
          <span>
            <strong>Total:</strong>
          </span>
          <span>$00.0</span>
        </div>
        <button onClick={()=>{
          /* navigate("/purchases")
          setShowCard(!showCard) */
        }}>Checkout</button>
      </div>
    </div>
  );
};

export default Car;
