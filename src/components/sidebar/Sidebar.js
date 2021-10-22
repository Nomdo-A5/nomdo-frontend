import { Link } from "react-router-dom";
import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Sidebar() {
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
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">Dashboard</Menu.Item>
            <Menu.Item key="10">Board</Menu.Item>
            <Menu.Item key="11">Money Report</Menu.Item>
            <Menu.Item key="12">Setting</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
}

export default Sidebar;