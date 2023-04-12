import { useState } from "react";
import { getCarThunk, updateCarThunk } from "../store/slices/car.slice";
import { useDispatch } from "react-redux";

const Item = ({deletCart, data}) => {

    const [count, setCount] = useState(Number(data?.quantity))
    
    const dispatch = useDispatch()

    const changeCount = (operator) => {
        if(operator === "+") {
          let suma = count + 1 
          setCount(suma)
          dispatch(updateCarThunk(data?.id, {quantity: count + 1 }))
        } else {
          if(count === 1){
            setCount(1)
            dispatch(updateCarThunk(data?.id, {quantity: count}))
          } else {
            let resta = count - 1 
            setCount(resta)
            dispatch(updateCarThunk(data?.id, {quantity: count - 1 }))
          }
        }
      }


    return (  
        <li>
              <div className="info__product-container">
                <img src={data.product?.images?.[0]?.url} alt="producto" />
                <div className="input__group">
                  <h3>{data.product?.title}</h3>
                  <div>
                    <button onClick={()=>changeCount("-")}>-</button>
                    <input type="number" min="0"  value={count} readOnly/>
                    <button onClick={()=>changeCount("+")}>+</button>
                  </div>
                </div>
                <i onClick={() =>{
                  deletCart(data.id)
                  setTimeout(()=>{
                    dispatch(getCarThunk())
                  },1000)  
                }}
                   className="bx bxs-trash"></i>  
              </div>
              <p>
                <strong>Total:</strong> {data.product?.price}
              </p>
            </li>
    );
}
 
export default Item;