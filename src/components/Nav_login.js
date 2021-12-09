import { Link, useHistory } from "react-router-dom";
import "./style/Nav.css";
import LogoImage from '../components/Nomdo-logo.svg'
import ProfileImage from '../Alan.svg'
import { TiArrowSortedDown } from 'react-icons/ti';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function Nav_login() {
  const history = useHistory();
  return (
    <div className="nav">
      <div className="nav-components">
        <div className="navbar-left-division">
          <Link to="/" className="nav-title">
            <img className="nomdo-logo-image" src={LogoImage} alt=""/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav_login;
