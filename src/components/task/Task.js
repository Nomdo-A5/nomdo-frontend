import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './Task.css';
import { useEffect, useState } from 'react'

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
                    height: "192px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    marginTop: "50px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#F6F6F6"
                }}
                title={props.task_name}
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
