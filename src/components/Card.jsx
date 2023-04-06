const Card = ({showCard, setShowCard}) => {
    return (
        <div className="card__container" style={showCard ? {right: "0px", opacity: "1", zIndex:"101"} : {right: "-300px", opacity:"0", zIndex:"-1"}}>
            <div className="card__close">
                <i onClick={()=>setShowCard(false)} className='bx bxs-x-circle'></i>
            </div>
        </div>
    );
}
 
export default Card;