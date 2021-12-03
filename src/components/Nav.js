import { Link, useHistory } from "react-router-dom";
import "./style/Nav.css";
import { logout } from "../utils/authentication";

function Nav() {
  const history = useHistory();
  return (
    <div className="nav">
      <div className="nav-desc">
        <div className="nav-desc-logo">
          <Link to="/" className="nav-title" onClick={() => logout()}>
              NOMDO
          </Link>
        </div>
        <div className="nav-profile">
          <Link to="/userprofile" onClick={() => history.push("/userprofile")}>
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
