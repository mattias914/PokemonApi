import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "disabled");
  return (
    <div className="navbar">
      <div className="container-img">
        <img
          className="img"
          src="https://cdn.icon-icons.com/icons2/851/PNG/512/pokemon_pokecenter_icon-icons.com_67517.png"
          alt=""
        />
      </div>
      <div className="links">
        <NavLink className={setActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={setActiveClass} to="/pokemon">
          Pokemon
        </NavLink>
      </div>
    </div>
  );
}
