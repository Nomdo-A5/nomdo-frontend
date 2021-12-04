import React from 'react'
import { Link, useHistory } from "react-router-dom";
import "./style/Nav.css";
import LogoImage from '../components/Nomdo-logo.svg'
import ProfileImage from '../Alan.svg'
import { TiArrowSortedDown } from 'react-icons/ti';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { logout } from "../utils/authentication";

import { Menu, Button, message, Space, Tooltip, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

function Nav() {
  const history = useHistory();

  const menu = (
    <Menu className="menu-bar" style= {{ width: "200px" }}>
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

  return (
    <div className="nav">
        <div className="nav-desc-logo">
          <Link to="/" className="nav-title">
            <img src={LogoImage} height={35} alt=""/>
          </Link>
        </div>
        <div className="nav-profile-division">
          <Dropdown overlay={menu} trigger={['click']}>
              <div className="nav-profile">
                <img src={ProfileImage} height={30} alt=""/>
                  <div className="name-and-arrow">
                    <div className="nav-profile-name">
                      <Link to="/userprofile" onClick={() => history.push("/userprofile")}>
                        Alan Novianto
                      </Link>
                    </div>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      <div className="nav-profile-arrow">
                        <TiArrowSortedDown/>
                      </div>
                    </a>
                  </div>
              </div>
          </Dropdown>
        </div>
    </div>
  );
}

export default Nav;
