import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import "./style/NavbarMain.css";
import LogoImage from '../components/Nomdo-logo.svg'
import ProfileImage from '../profile.svg'
import { TiArrowSortedDown } from 'react-icons/ti';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getToken, logout } from "../utils/authentication";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { Menu, Button, message, Space, Tooltip, Dropdown, Row, Col, Layout } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_API_URL } from '../constants/urls';
import {   Breadcrumb } from 'antd';
import { UserContext } from '../context/UserContext';

function NavbarMain() {
const { Header, Content, Sider, Footer } = Layout;
  const history = useHistory();
  const token = getToken()
  const {user} = useContext(UserContext)
  const menu = (
    <Menu className="menu-bar" style={{ width: "200px" }}>
      <Menu.Item key="0">
        <Link to="/userprofile" onClick={() => history.push("/userprofile")}>Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to="/usersetting" onClick={() => history.push("/usersetting")}>Setting</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link to="/" onClick={() => logout()}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
      <Header
        style={{ 
          backgroundColor: "#4ABDAC",
          position: 'fixed',
          top: 0,
          zIndex: "2",
          width: "100%"
        }}
      >
        <Row
          style={{ 
            width: "90%"
          }}
        >
          <Col style={{ backgroundColor: "#4ABDAC"}} span={6}>
            <Link to="/">
              <img src={LogoImage} alt="" width="100px" height="auto" className='nomdo-logo'/>
            </Link>
          </Col>
          <Col 
            style={{ 
              backgroundColor: "#4ABDAC",
              display:"flex",
              justifyContent: "right"
            }}
            span={18}
          >
            <Dropdown overlay={menu} trigger={['click']}>
              <Nav className='navbar-profile-main'>
                  <img src={ProfileImage} className="navbar-profile-image" alt="" style={{ paddingRight: "10px"}} />
                  <div className="nav-profile-name">
                    <Link to="/userprofile" className='nav-profile-name-2' onClick={() => history.push("/userprofile")} style={{ paddingRight: "10px"}}>
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
          </Col>
        </Row>
      </Header>
  );
}

export default NavbarMain;
