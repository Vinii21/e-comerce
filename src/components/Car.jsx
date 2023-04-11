import { useDispatch, useSelector } from "react-redux";
import { deleteCarThunk, getCarThunk } from "../store/slices/car.slice";
import { updateCarThunk } from "../store/slices/car.slice";
import { getPurchasesThuk, addPurchasesThuk } from "../store/slices/purchases.slice"
import { useNavigate } from "react-router-dom";

const Car = ({ showCard, setShowCard }) => {
  const cars = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const deletCart =(id)=>{
    dispatch(deleteCarThunk(id))
    dispatch(getCarThunk());
  }

  const changeCount = (car, operator) => {
    if(operator === "+") {
      dispatch(updateCarThunk(car.id,{quantity: car.quantity + 1}))
    } else {
      if(car.quantity === 1){
        deletCart(car.id)
      } else {
        dispatch(updateCarThunk(car.id,{quantity: car.quantity - 1}))
      }
    }
    setTimeout(()=>{
      dispatch(getCarThunk());
    }, 500)
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
        {cars.map((car) => {
          return (
            <li key={car.id}>
              <div className="info__product-container">
                <img src={car.product?.images?.[0]?.url} alt="producto" />
                <div className="input__group">
                  <h3>{car.product?.title}</h3>
                  <div>
                    <button onClick={()=>changeCount(car, "-")}>-</button>
                    <input type="number" min="0"  value={Number( car.quantity)} readOnly/>
                    <button onClick={()=>changeCount(car, "+")}>+</button>
                  </div>
                </div>
                <i onClick={() =>{
                  deletCart(car.id)
                  setTimeout(()=>{
                    dispatch(getCarThunk())
                  },1000)  
                }}
                   className="bx bxs-trash"></i>  
              </div>
              <p>
                <strong>Total:</strong> {car.product?.price}
              </p>
            </li>
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
        }}>Checkout</button>
      </div>
    </div>
  );
};

export default Car;
