import { useNavigate } from "react-router-dom";

const SessionStart = () => {
    const navigate = useNavigate()

    return (
        <div className="session__start">
            <div className="session__info">
                <h6>{localStorage.getItem("name")}</h6>
                <button onClick={()=>{
                    localStorage.clear("token")
                    localStorage.clear("name")
                    navigate("/login")
            }}>Log Out</button>
            </div>
        </div>
    );
}
 
export default SessionStart;