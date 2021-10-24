import React, { useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { getToken, isLogin } from "../../utils/authentication";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Sidebar = () => {
  const [workspace, setWorkspace] = useState([]);

  const GetWorkspace = async () => {
    const token = getToken();
    const response = await axios.get(BASE_API_URL + 'workspace', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setWorkspace(response.data.workspace);
    console.log(response);
  };

  useEffect(() => {
    GetWorkspace()
  }, [])

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
        {workspace.map(w => (
          <SubMenu key="sub3" title={w.workspace_name}>
            <Menu.Item key="9">Dashboard</Menu.Item>
            <Menu.Item key="10">Board</Menu.Item>
            <Menu.Item key="11">Money Report</Menu.Item>
            <Menu.Item key="12">Setting</Menu.Item>
          </SubMenu>
        ))}

      </Menu>
    </Sider>
  );
}

export default Sidebar;