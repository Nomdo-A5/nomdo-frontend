import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import './Task.css';
import { useEffect, useState } from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import EditTaskModal from '../../components/editTaskModal/EditTaskModal';

import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';

export default function Task (props) {

    const [tasks, setTasks] = useState([])
    const token = getToken()
    const GetTask = async ($board_id) => {
        const response = await axios.get(BASE_API_URL + 'task', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'board_id': $board_id
            }
        })
        console.log("BOARD  ON BOARD")
        console.log(response)
        setTasks(response.data.task)
    }
    
    const menuEdit = (
        <Menu>
          <Menu.Item key="0">
            <div className='edit-task-at-task'>
                <div className='edit-task-at-task-1'>
                    <AiOutlineEdit style={{fontSize:"large", marginRight:"10px", margin: "auto"}}/>
                </div>
                <div className='edit-task-at-task-2'>
                    <EditTaskModal/>
                </div>
            </div>
          </Menu.Item>
          <Menu.Item key="1">
            <div className='edit-task-at-task'>
                <div className='edit-task-at-task-1'>
                    <AiOutlineDelete style={{fontSize:"large", marginRight:"10px"}}/>
                </div>
                <div className='edit-task-at-task-2'>
                    Delete Task
                </div>
            </div>
          </Menu.Item>
        </Menu>
    );

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }

    useEffect(() => {
        GetTask(props.board_id)
    }, [])

    return (
        <div>
            <Card
                style={{
                    width: "240px",
                    height: "auto",
                    borderRadius: "16px",
                    marginRight: "24px",
                    marginTop: "25px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#f6f6f6"  //f6f6f6//
                }}
                bodyStyle={{
                    //padding: "10px"
                }}
                title={props.task_name}
                extra={
                    <Dropdown overlay={menuEdit} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <BiDotsVerticalRounded style={{color:"#969CA3", fontSize:"large"}}/>
                        </a>
                    </Dropdown>
                }
            >
                <Row>
                    <div className="task-description">
                        <Col>
                            {props.task_description}
                        </Col>
                    </div>
                </Row>
                <Row>
                    <Col></Col>
                </Row>
                <Row wrap={false}>                    
                    <Col flex="none">
                        <div className="clock-and-date">
                            <div className="clock-logo">
                            </div>
                            <div className="date-expired">
                                {props.due_date}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <div className="task-button">
                        <div className="task-button-complete">
                            <Button type="success" style={{ background: "#C9EBE6", borderColor: "#657673", width: "90px" }}>Complete</Button>
                        </div>
                        <div className="task-button-dismiss">
                            <Button type="success" style={{ background: "#EBC9C9", borderColor: "#766565", width: "90px" }}>Dismiss</Button>
                        </div>
                    </div>
                </Row>
            </Card>
        </div>
    );
}
