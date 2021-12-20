import { Link, useHistory } from "react-router-dom";
import "./style/Nav_login.css";
import LogoImage from '../components/Nomdo-logo.svg'
import ProfileImage from '../Alan.svg'
import { TiArrowSortedDown } from 'react-icons/ti';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function Nav_login() {
  const history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className='nav-responsive-container-0'>
      <Container>
        <Nav.Link href="/">
          <img src={LogoImage} alt="" width="100px" height="auto" className='nomdo-logo'/>
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Nav_login;
