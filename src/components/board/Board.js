import React from 'react'
import { Card, Row, Col, Button, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Board.css';

export default function Board(props) {

    return (
        <div>
            <Card
                style={{
                    width: "360px",
                    height: "280px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#F6F6F6"
                }}
                title="New Board"
            >
                <Row>
                    <div className="board-name-and-logo">
                        <div className="board-logo">
                            <MailOutlined/>
                        </div>
                        <div className="board-name-and-input">
                            <div className="board-name">
                                Board Name
                            </div>
                            <div className="form-input-board-name">
                                <Input placeholder="Board Name"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row wrap={false}>                    
                    <Col flex="none">
                        <div className="task-and-logo">
                            <div className="task-logo">
                                <BsListTask/>
                            </div>
                            <div className="task-text">
                                Add Task
                            </div>
                            <div className="add-logo">
                                <GrAddCircle/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row wrap={false}>                    
                    <Col flex="none">
                        <div className="member-and-logo">
                            <div className="member-logo">
                                <BsPeople/>
                            </div>
                            <div className="member-text">
                                Add Member
                            </div>
                            <div className="add-logo">
                                <GrAddCircle/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <div className="task-button-add">
                        <Button type="success" style={{ background: "#C9EBE6", borderColor: "#657673", width: "100px", borderRadius: "25px 25px 25px 25px" }}>Add</Button>
                    </div>
                </Row>
            </Card>
        </div>
    );
}
