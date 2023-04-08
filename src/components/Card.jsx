const Card = ({showCard, setShowCard}) => {
    return (
        <div className="card__container" style={showCard ? {right: "0px", opacity: "1", zIndex:"101"} : {right: "-300px", opacity:"0", zIndex:"-1"}}>
            <div className="card__close">
                <h4>Carrito de compras</h4>
                <i onClick={()=>setShowCard(!showCard)} className='bx bxs-x-circle'></i>
            </div>
            <ul className="card__products">
                <li >
                    <div className="info__product-container">
                        <img src="/esta.jpeg" alt="producto" width="50"/>
                        <div className="input__group">
                            <h3>Nombre</h3>
                            <div>
                                <button>-</button><input type="number" min="0"/><button>+</button>
                            </div>
                        </div>
                        <i className='bx bxs-trash'></i>
                    </div>
                    <p><strong>Total:</strong> $00.0</p>
                </li>
            </ul>
            <div className="container__total">
                <div className="total__info">
                    <span><strong>Total:</strong></span>
                    <span>$00.0</span>
                </div>
                <button>Checkout</button>
            </div>
        </div>
    );
}
 
export default Card;