import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './TaskOnBoard.css';

export default function TaskOnBoard (props) {

    return (
        <div>
            <Card
                style={{
                    width: "260px",
                    height: "auto",
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
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
