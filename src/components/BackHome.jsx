import { Link } from "react-router-dom";

const BackHome = ({page}) => {
    return (
        <div>
        <ul className="backHome">
          <Link to={"/"}>Home</Link>
          <div className="circule"></div>
          <li>{page}</li>
        </ul>
      </div>
    );
};

export default BackHome;