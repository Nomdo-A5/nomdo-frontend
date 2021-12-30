import React, { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../constants/urls';
import NavbarMain from "../../components/NavbarMain";
import Sidebar from '../../components/sidebar/Sidebar';
import Task from '../../components/task/Task';
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import ProgressBar from '../../components/progressBar/ProgressBar';
import axios from "axios";
import { getToken } from '../../utils/authentication';

import { useHistory } from "react-router-dom";
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginAuth } from "../../utils/authentication";
import { Link } from 'react-router-dom';

import Frontpic from '../Login/Frontpic.svg'
import workspaceImage from './workspace.svg'

import { Layout, Space } from "antd";
import { WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { Row, Col } from 'antd';
import "./WorkspaceNull.css";

import { Tablereport } from "../../components/tablereport/Tablereport";
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { FloatingBoard } from "../../components/floatingBoard/FloatingBoard";
import { FloatingMoneyReport } from "../../components/floatingMoneyReport/FloatingMoneyReport";
import { JoinWorkspace } from "../../components/joinWorkspace/JoinWorkspace";
import { ClickedTask } from "../../components/clickedTask/ClickedTask";

const WorkspaceNull = () => {

  const { Header, Footer, Sider, Content } = Layout;
  const [task, setTask] = useState([]);

  useEffect(() => {
    GetTask()
  }, [])

  const GetTask = async () => {
    const token = getToken();
    const response = await axios.get(BASE_API_URL + 'task', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setTask(response.data.task);
    console.log(response);
  };

  return (
    <div>
      <Layout style={{ backgroundColor: "#DDFBEB", zIndex: "0" }}>
        <Row className='row-main'>
          <Col
            span={12}
            style={{
              height: "92vh"
            }}>
            <div className="left-col-1">
              <div className="left-col-1-1">
                Welcome to Nomdo
              </div>
              <div className="left-col-1-2">
                <div className="left-col-1-2-1">
                  Make Your First
                </div>
                <div className="left-col-1-2-2">
                  Workspace
                </div>
                <div className="left-col-1-2-3">
                  Here!
                </div>
                <div className="floating-button-early">
                  <FloatingButton />
                </div>
              </div>
              <div className="left-col-1-3">
                Workspace is unlimited storage for your designs, releases, and components with global availability and automatic backups. Collaborate on your projects on any devices right in the browser.
              </div>
            </div>
          </Col>
          <Col span={12}
            style={{
              height: "92vh"
            }}>
            <img src={workspaceImage} className="frontpic-image" alt="" />
          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default WorkspaceNull;