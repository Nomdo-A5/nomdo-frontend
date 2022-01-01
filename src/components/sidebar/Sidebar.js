import React, { useEffect, useState, useContext } from "react";
import { Layout, Menu, Avatar, Modal } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { getToken, isLogin } from "../../utils/authentication";
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import "./Sidebar.css";
import { BoardContext } from "../../context/BoardContext";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// function refreshPage() {
//   window.location.reload(true);
// }
// function onClickW() {
//   this.props.history.push(`/workspace`);
//   // window.location.reload();

//   }

const Sidebar = () => {
  const history = useHistory();
  const { confirm } = Modal;
  const context = useContext(WorkspaceContext)
  const token = getToken()
  const {setWorkspace, setActiveWorkspace} = useContext(WorkspaceContext)
  const {GetBoards} = useContext(BoardContext)

  function handleReportClicked(id) {
    history.push("/report/" + id)
    window.location.reload()
  }
  function handleHomeClicked() {
    history.push("/home")
    window.location.reload()
  }

  function showDeleteConfirm($id) {
    confirm({
      title: 'Are you sure delete this balance?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteWorkspace($id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const deleteWorkspace = async ($id) => {
    const response = await axios.delete(BASE_API_URL + 'workspace', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        id: $id
      }
    });
    setWorkspace(prev => prev.filter(wspc => wspc.id !== $id))
  }

  function handleBoard(workspace){
    setActiveWorkspace(workspace)
    GetBoards(workspace.id)
    history.push(`/workspace/${workspace.id}/boards`)
  }

  function handleDashboard(workspace){
    setActiveWorkspace(workspace)
    history.push(`/workspace/${workspace.id}/dashboards`)
  }
  return (
    <Router>
      <Sider width={200} className="site-layout-background" style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 'auto',
        backgroundColor: 'white',
      }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="home" onClick={() => history.push(`/home`)}>
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="workspace"  onClick={() => history.push(`/workspace`)}>
            <span>Workspace</span>
          </Menu.Item>
          {context.workspace.map(w => (
            <SubMenu key={w.id} title={w.workspace_name} icon={<Avatar>{w.workspace_name.charAt(0).toUpperCase()}</Avatar>}>
              <Menu.Item key={"dahboard " + w.id} onClick={() => handleDashboard(w)}>
                <span>Dashboard</span>                
              </Menu.Item>
              <Menu.Item key={"board " + w.id} onClick={() => handleBoard(w)}>
                <span>Board</span>
              </Menu.Item>
              <Menu.Item key={"report " + w.id} onClick={() => history.push(`/report/${w.id}`,)} >
                <span>Money Report</span>                
              </Menu.Item>
              <Menu.Item key={"delete " + w.id} onClick={() => {
                showDeleteConfirm(w.id)
              }}>
                <span style={{ color: 'red' }}>Delete Workspace</span>
              </Menu.Item>
            </SubMenu>
          ))}

        </Menu>
      </Sider>
    </Router>

  );
}

export default Sidebar;