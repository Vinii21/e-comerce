import { useDispatch, useSelector } from "react-redux";
import { deleteCarThunk, getCarThunk } from "../store/slices/car.slice";


const Car = ({ showCard, setShowCard }) => {
  const token = useSelector((state) => state.token);
  const cars = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const deletCart =(id)=>{
    dispatch(deleteCarThunk(token,id))
    dispatch(getCarThunk(token));
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
                    <button>-</button>
                    <input type="number" min="0"  value={Number( car.quantity)} />
                    <button>+</button>
                  </div>
                </div>
                <i onClick={() =>deletCart(car.id)} className="bx bxs-trash"></i>  
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
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Car;
