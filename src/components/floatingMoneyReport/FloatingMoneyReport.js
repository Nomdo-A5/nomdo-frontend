import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { BsWallet2 } from 'react-icons/bs';
import { useState } from 'react';

import { Card, Row, Col, Input } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingMoneyReport/FloatingMoneyReport.css';

export const FloatingMoneyReport = () => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
          <Button type="primary" onClick={showModal}>
            Modal Money Report
          </Button>
          <Modal title="New Money Report" okText="Add"
            visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            style={{ textAlign: "center" }} 
            width={340}>
            
            <div>
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
            </div>
          </Modal>
        </>
      );
    }