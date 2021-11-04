import React, { useEffect, useState , useContext } from "react";
import { Layout, Menu } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { getToken, isLogin } from "../../utils/authentication";
import { WorkspaceContext } from "../../context/WorkspaceContext";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Sidebar = () => {
  
  const context = useContext(WorkspaceContext)
  return (
    <Sider width={200} className="site-layout-background" style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
    }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="workspace">Workspace</Menu.Item>
        {context.workspace.map(w => (
          <SubMenu key={w.id} title={w.workspace_name}>
            <Menu.Item >Dashboard</Menu.Item>
            <Menu.Item >Board</Menu.Item>
            <Menu.Item >Money Report</Menu.Item>
            <Menu.Item >Setting</Menu.Item>
          </SubMenu>
        ))}

      </Menu>
    </Sider>
  );
}

export default Sidebar;