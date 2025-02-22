import "./components.css";
import logo from "../assets/logo.jpg";

export default function Nav() {
  return (
    <div className="navBar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="links">
        <h4>Favorites</h4>
        <h4> Add </h4>
      </div>
    </div>
  );
}
