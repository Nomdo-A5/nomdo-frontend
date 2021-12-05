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
        <div className="nav-desc-logo">
          <Link to="/" className="nav-title">
            <img src={LogoImage} height={35} alt=""/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav_login;
