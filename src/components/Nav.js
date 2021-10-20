import { Link } from "react-router-dom";
import "./style/Nav.css";

function Nav() {
  return (
    <div className="nav">
      <div className="nav-desc">
        <div className="nav-desc-logo">
          <Link to="/" className="nav-title">
              NOMDO
          </Link>
        </div>
        <div className="nav-profile">
          <Link to="/User_Profile">Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
