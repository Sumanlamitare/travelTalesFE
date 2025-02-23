import "./components.css";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navBar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="links">
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <h4>Favorites</h4>
        </Link>
        <h4> Add </h4>
      </div>
    </div>
  );
}
