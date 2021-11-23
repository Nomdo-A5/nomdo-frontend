import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './BoardOnBoard.css';

export default function BoardOnBoard (props) {

    return (
        <div>
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
                title={props.task_name}
            >
                    <div className="task-description">
                            {props.task_description}
                    </div>
                        <div className="checkbox-name-title">
                            <div className="checkbox-and-name">
                                <div className="checkbox-logo">
                                    <input
                                        name="isGoing"
                                        type="checkbox" />
                                </div>
                                <div className="task-title">
                                    Nama Task
                                </div>
                            </div>
                            <div className="on-where-information">
                                on (Board), (Workspace)
                            </div>
                            <div className="task-date-and-clock">
                                <div className="clock-logo">
                                    <ClockCircleOutlined />
                                </div>
                                <div className="task-date">
                                    Due 24, Aug 2021
                                </div>
                            </div>
                            <div className="see-more-button">
                                <div className="see-more">
                                    See >
                                </div>
                            </div>
                        </div>
            </Card>
        </div>
    );
}
