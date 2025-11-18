import Links from "./links/links";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="sidebar close">
      <div className="sidebar-content">
        <div className="menu-bar">
          <div className="menu">
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <ul className="menu-links">
              <Links  />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
