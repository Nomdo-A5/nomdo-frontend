import React from 'react'
import { Card, Row, Col, Button, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import './Workspace.css';

export default function Workspace(props) {

    return (
        <div>
            <Card
                style={{
                    width: "360px",
                    height: "310px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#F6F6F6"
                }}
                title="New Workspace"
            >
                <Row>
                    <div className="workspace-name-and-logo">
                        <div className="workspace-logo">
                            <MailOutlined/>
                        </div>
                        <div className="workspace-name-and-input">
                            <div className="workspace-name">
                                Workspace Name
                            </div>
                            <div className="form-input-workspace-name">
                                <Input placeholder="Workspace Name"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="balance-name-and-logo">
                        <div className="balance-name-and-input">
                            <div className="balance-name">
                                Available Balance
                            </div>
                            <div className="form-input-balance-name">
                                <Input placeholder="Available Balance" style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
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
