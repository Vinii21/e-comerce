import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="d-flex justify-content-center flex-column align-items-center" style={{minHeight:"100vh", backgroundColor: "#51738a"}}>
            <h1>Error 404</h1>
            <h6>La ruta que intentas acceder no existe</h6>
            <Link to="/">Volver al Home</Link>
        </div>
    );
}
 
export default Error;