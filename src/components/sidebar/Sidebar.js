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

  function handleBoardClicked(id) {
    history.push("/board/" + id)
    //onClick={() => history.push("/workspace")}
    // onClick={() => history.push("/dashboard")}
    // onClick={() => handleBoardClicked(w.id)}
    // onClick={() => handleReportClicked(w.id) } 
  }

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
    console.log("TOKENN " + token)
    const response = await axios.delete(BASE_API_URL + 'workspace', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            id: $id
        }
    });

    console.log(response)
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
          <Menu.Item key="home">
            <span>Home</span>
            <Link to="/home" onClick={() => handleHomeClicked()} />
          </Menu.Item>
          <Menu.Item key="workspace">
            <span>Workspace</span>
            <Link to="/workspace" />
          </Menu.Item>
          {context.workspace.map(w => (
            <SubMenu key={w.id} title={w.workspace_name} icon={<Avatar>{w.workspace_name.charAt(0).toUpperCase()}</Avatar>}>
              <Menu.Item key={"dahboard " + w.id}>
                <span>Dashboard</span>
                <Link to={{ pathname: `/workspace/${w.id}/dashboards`, state: { workspace: w.id } }} />
              </Menu.Item>
              <Menu.Item key={"board " + w.id}>
                <span>Board</span>
                <Link to={{ pathname: `/workspace/${w.id}/boards`, state: { workspace: w.id } }} />
              </Menu.Item>
              <Menu.Item key={"report " + w.id} >
                <span>Money Report</span>
                <Link to={{ pathname: `/report/${w.id}`, state: { workspace: w.id } }} />
              </Menu.Item>
              <Menu.Item >
                Member
                <Link to="/member" />
              </Menu.Item>
              <Menu.Item onClick={() => {
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