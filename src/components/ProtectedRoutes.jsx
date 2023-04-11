import { Outlet, Navigate } from "react-router-dom";
/* import { useSelector } from "react-redux"; */

const ProtectedRoutes = () => {

    /* const token = useSelector(state => state.token) */
    const token = localStorage.getItem("token")

    if(token) {
        return <Outlet />
    } else {
       return  <Navigate to="/login" />
    }
}
 
export default ProtectedRoutes;