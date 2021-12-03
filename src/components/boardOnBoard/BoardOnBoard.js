import React, { useEffect, useState } from 'react'
import { Card, Empty, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './BoardOnBoard.css';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';

export default function BoardOnBoard(props) {

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

    useEffect(() => {
        GetTask(props.board_id)
    }, [])

    const GetTaskView = () => {
        return (
            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                {tasks.map(task => (
                    <Card
                        style={{
                            width: "260px",
                            height: "auto",
                            borderRadius: "16px",
                            marginRight: "10px",
                            marginTop: "20px",
                            boxShadow: "5px 8px 5px rgba(208, 216, 243, 0.6)",
                            backgroundColor: "#F6F6F6"
                        }}
                        bodyStyle={{
                            padding: "10px"
                        }}

                    >
                        <div className="checkbox-name-title">
                            <div className="checkbox-and-name">
                                <div className="checkbox-logo">
                                    <input
                                        name="isGoing"
                                        type="checkbox" />
                                </div>
                                <div className="task-title">
                                    {task.task_name}
                                </div>
                            </div>
                            <div className="on-where-information">
                                on {props.board_name}, {props.workspace_name}
                            </div>
                            <div className="task-date-and-clock">
                                <div className="clock-logo">
                                    <ClockCircleOutlined />
                                </div>
                                <div className="task-date">
                                    Due {task.due_date}
                                </div>
                            </div>
                            <div className="see-more-button">
                                <div className="see-more">
                                    See
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </Space>
        )

    }

    const GetErrorView = () => {
        return (
            <Space wrap style={{ paddingLeft: "30px", backgroundColor: "#FFFFFF" }}>
                <Empty
                    description={
                        <span>
                            You don't have any Task
                        </span>
                    } />

            </Space>

        )
    }

    return (
        <div>
            {tasks.length == 0 ? GetErrorView() : GetTaskView()}
        </div>
    );
}
