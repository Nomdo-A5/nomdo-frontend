import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { useState } from 'react';

import { Card, Row, Col, Input, Form } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsListTask, BsPeople } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingBoard/FloatingBoard.css';

const NewBoardForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            title="New Board"
            visible={visible}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={onCancel}
            style={{ textAlign: "center" }}
            okText="Add"
            width={340}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >


                <Form.Item
                    name="board_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the new board name!',
                        },
                    ]}
                >
                    <div className="board-component">
                        <div className="board-name-and-logo">
                            <div className="board-logo">
                                <MailOutlined />
                            </div>
                            <div className="board-name-and-input">
                                <div className="board-name">
                                    Board Name
                                </div>
                                <div className="form-input-board-name">
                                    <Input placeholder="Board Name" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </div>
                        <div className="balance-name-and-logo">
                            <div className="balance-name-and-input">
                                <div className="balance-name">
                                    Workspace Name
                                </div>
                                <div className="dropdown-items">
                                <select>
                                    <option value="dummy1">Nomdo Dummy</option>
                                    <option value="dummy2">D4 A Dummy</option>
                                    <option value="dummy3">IT Dummy</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form.Item>

            </Form>
        </Modal>
    );

}
export const FloatingBoard = () => {


    const [visible, setVisible] = useState(false);

    const onCreate = async (values) => {
        setVisible(false);
    };
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                New Board

            </Button>
            <NewBoardForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
}