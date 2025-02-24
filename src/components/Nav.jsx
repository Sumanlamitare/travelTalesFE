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
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h4>Home</h4>
        </Link>
        <Link
          to="/favorites"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h4>Favorites</h4>
        </Link>

        <Link to="/add" style={{ textDecoration: "none", color: "black" }}>
          <h4>Add</h4>
        </Link>
      </div>
    </div>
  );
}
