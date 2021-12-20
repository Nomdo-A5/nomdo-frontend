import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import "./style/NavbarMain.css";
import LogoImage from '../components/Nomdo-logo.svg'
import ProfileImage from '../Alan.svg'
import { TiArrowSortedDown } from 'react-icons/ti';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getToken, logout } from "../utils/authentication";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { Menu, Button, message, Space, Tooltip, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_API_URL } from '../constants/urls';

function NavbarMain() {
  const history = useHistory();
  const token = getToken()
  const [user, setUser] = useState([]);
  const menu = (
    <Menu className="menu-bar" style={{ width: "200px" }}>
      <Menu.Item key="0">
        <Link to="/userprofile" onClick={() => history.push("/userprofile")}>Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to="/" onClick={() => logout()}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  const getActiveUser = async () => {
    const token = getToken();
    const response = await axios.get(BASE_API_URL + 'user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response)
    setUser(response.data.user)
  }

  useEffect(() => {
    getActiveUser()
  }, [])
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className='nav-responsive-container-0'>
      <Container>
        <Nav.Link href="/">
          <img src={LogoImage} alt="" width="100px" height="auto" className='nomdo-logo'/>
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"/>
          <Dropdown overlay={menu} trigger={['click']}>
            <Nav className='navbar-profile-main'>
              <Nav.Link href="/userprofile">
                <img src={ProfileImage} className="navbar-profile-image" alt="" />
              </Nav.Link>
                <div className="nav-profile-name">
                  <Link to="/userprofile" className='nav-profile-name-2' onClick={() => history.push("/userprofile")}>
                    {user.name}
                  </Link>
                </div>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <div className="nav-profile-arrow">
                    <TiArrowSortedDown />
                  </div>
                </a>
            </Nav>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
