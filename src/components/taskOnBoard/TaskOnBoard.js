import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './TaskOnBoard.css';

export default function TaskOnBoard (props) {

    return (
        <div>
            <Card
                style={{
                    width: "220px",
                    height: "auto",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#FFFFFF",
                }}
                bodyStyle={{
                    padding: "5px"
                }}
                title={props.task_name}
            >    
                <div className="main-layout-horizontal">
                    <div className="checkbox-logo">
                        <input
                            name="isGoing"
                            type="checkbox" 
                        />
                    </div>
                    <div className="main-layout-vertical">
                        <div className="task-name">
                            Membuat Daftar Tamu
                        </div>
                        <div className="task-description">
                            on Divisi Acara, IT Motion
                        </div>
                        <div className="clock-and-date-division">
                            <div className="clock-icon">
                                <ClockCircleOutlined/>
                            </div>
                            <div className="due-date-expired">
                                Due 24, Aug 2021
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
