import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import "./style/Nav.css";
import LogoImage from '../components/Nomdo-logo.svg'
import ProfileImage from '../Alan.svg'
import { TiArrowSortedDown } from 'react-icons/ti';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getToken, logout } from "../utils/authentication";

import { Menu, Button, message, Space, Tooltip, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_API_URL } from '../constants/urls';

function Nav() {
  const history = useHistory();
  const token = getToken()
  const [user, setUser] = useState([])
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
    <div className="nav">
      <div className="nav-components">
        <div className="navbar-left-division">
          <Link to="/" className="nav-title">
            <img className="nomdo-logo-image" src={LogoImage} alt="" />
          </Link>
        </div>
        <div className="navbar-right-division">
          <div className="nav-profile-division">
            <Dropdown overlay={menu} trigger={['click']}>
              <div className="nav-profile">
                <img src={ProfileImage} className="navbar-profile-image" alt="" />
                <div className="name-and-arrow">
                  <div className="nav-profile-name">
                    <Link to="/userprofile" onClick={() => history.push("/userprofile")}>
                      {user.name}
                    </Link>
                  </div>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <div className="nav-profile-arrow">
                      <TiArrowSortedDown />
                    </div>
                  </a>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
