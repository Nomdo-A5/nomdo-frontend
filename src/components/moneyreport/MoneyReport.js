import React from 'react'
import { Card, Row, Col, Button, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons'
import { BsWallet2 } from 'react-icons/bs';
import './MoneyReport.css';

export default function MoneyReport(props) {

    return (
        <div>
            <Card
                style={{
                    width: "360px",
                    height: "420px",
                    borderRadius: "16px",
                    marginRight: "24px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#F6F6F6"
                }}
                title="New Money Report"
            >
                <Row>
                    <div className="name-and-logo">
                        <div className="report-logo">
                            <MailOutlined/>
                        </div>
                        <div className="report-name-and-input">
                            <div className="report-name">
                                Report Title
                            </div>
                            <div className="form-input-report-name">
                                <Input placeholder="Report Name"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="name-and-logo">
                        <div className="income-logo">
                            <BsWallet2/>
                        </div>
                        <div className="income-name-and-input">
                            <div className="income-name">
                                Income
                            </div>
                            <div className="form-input-income-name">
                                <Input placeholder="Income"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="name-and-logo">
                        <div className="outcome-logo">
                            <BsWallet2/>
                        </div>
                        <div className="outcome-name-and-input">
                            <div className="outcome-name">
                                Outcome
                            </div>
                            <div className="form-input-outcome-name">
                                <Input placeholder="Outcome"  style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="description-name-and-logo">
                        <div className="description-name-and-input">
                            <div className="description-name">
                                Description
                            </div>
                            <div className="form-input-description-name">
                                <Input placeholder="Description" style={{ borderRadius:"10px 10px 10px 10px"}}/>
                            </div>
                        </div>
                    </div>
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
