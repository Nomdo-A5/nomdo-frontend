import React, { useContext } from "react";
import { Layout, Menu, Avatar, Modal } from 'antd';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { getToken } from "../../utils/authentication";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import "./Sidebar.css";
import { BoardContext } from "../../context/BoardContext";
import { BalanceContext } from "../../context/BalanceContext";
const { SubMenu } = Menu;
const {  Sider } = Layout;


const Sidebar = () => {
  const history = useHistory();
  const { confirm } = Modal;
  const context = useContext(WorkspaceContext)
  const token = getToken()
  const {setWorkspace, setActiveWorkspace, GetMember, GetTaskOverview} = useContext(WorkspaceContext)
  const {GetBoards} = useContext(BoardContext)
  const {GetBalanceOverview, GetReportBalance} = useContext(BalanceContext)

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
    GetMember(workspace.id)
    GetTaskOverview(workspace.id)
    GetBalanceOverview(workspace.id)
    history.push(`/workspace/${workspace.id}/dashboards`)
  }

  function handleReport(workspace){
    setActiveWorkspace(workspace)
    GetBalanceOverview(workspace.id)
    GetReportBalance(workspace.id)
    history.push(`/report/${workspace.id}`)
  }
  return (
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
              <Menu.Item key={"report " + w.id} onClick={() => handleReport(w)} >
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

  );
}

export default Sidebar;