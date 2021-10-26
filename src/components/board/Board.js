import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './Board.css';

export default function Board(props) {

    return (
        <div>
            <Card
                style={{
                    width: "260px",
                    height: "192px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#F6F6F6"
                }}
                title="Ini Board ya"
            >
                <Row>
                    <div className="task-description">
                        <Col>
                            Belum jadi
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
                                <ClockCircleOutlined/>
                            </div>
                            <div className="date-expired">
                                Deadline Date
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <div className="task-button">
                        <div className="task-button-complete">
                            <Button type="success" style={{ background: "#C9EBE6", borderColor: "#657673", width: "100px" }}>Complete</Button>
                        </div>
                        <div className="task-button-dismiss">
                            <Button type="success" style={{ background: "#EBC9C9", borderColor: "#766565", width: "100px" }}>Dismiss</Button>
                        </div>
                    </div>
                </Row>
            </Card>
        </div>
    );
}
