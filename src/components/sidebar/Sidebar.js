import React, { useEffect, useState, useContext } from "react";
import { Layout, Menu } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { getToken, isLogin } from "../../utils/authentication";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";

import "./Sidebar.css";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Sidebar = () => {

  const context = useContext(WorkspaceContext)
  return (
    <Router>
      <Sider width={200} className="site-layout-background" style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: '8vh',
        backgroundColor: 'white',
      }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="home">
            <span>Home</span>
            <Link to="/home" />
          </Menu.Item>
          <Menu.Item key="workspace">
            <span>Workspace</span>
            <Link to="/home" />
          </Menu.Item>
          {context.workspace.map(w => (
            <SubMenu key={w.id} title={w.workspace_name}>
              <Menu.Item >
                <span>Dashboard</span>
                <Link to="/dashboard" />
              </Menu.Item>
              <Menu.Item >
                <span>Board</span>
                <Link to="/board" />
              </Menu.Item>
              <Menu.Item >
                <span>Money Report</span>
              </Menu.Item>
              <Menu.Item >Setting</Menu.Item>
            </SubMenu>
          ))}

        </Menu>
      </Sider>
    </Router>

  );
}

export default Sidebar;