import { useDispatch, useSelector } from "react-redux";
import { deleteCarThunk, getCarThunk } from "../store/slices/car.slice";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import { addPurchasesThuk } from "../store/slices/purchases.slice"

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
        <h5>Carrito de compras</h5>
        <i
          onClick={() => setShowCard(!showCard)}
          className="bx bxs-x-circle"
        ></i>
      </div>
      <ul className="card__products m-1">
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
          navigate("/purchases")
          setShowCard(!showCard)
          dispatch(addPurchasesThuk())
          dispatch(getCarThunk())
        }}
        className="btn__checkout"
        >Checkout</button>
      </div>
    </div>
  );
};

export default Car;
