import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { BsWallet2 } from 'react-icons/bs';
import { useState, useContext } from 'react';

import { Form, Card, Row, Col, Input, Select } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { BsPencilSquare } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingMoneyReport/FloatingMoneyReport.css';
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';

const NewBalanceForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const context = useContext(WorkspaceContext)
    const { Option } = Select;
    return (
        <Modal
            title="New Balance"
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
            width={340}>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >
                <div>
                    <Row>
                        <div className="workspace-name-and-input">
                            <div className="input-area-drop-down">
                                <Form.Item
                                    name="workspace_id"
                                    label="Workspace name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select workspace!',
                                        },
                                    ]}

                                >
                                    <Select
                                        style={{ width: 270 }}
                                        placeholder="select your workspace"
                                    >
                                        {context.workspace.map(w =>
                                            (<Option value={w.id}>{w.workspace_name}</Option>)
                                        )}
                                    </Select>

                                </Form.Item>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Form.Item
                            name="nominal"
                            label="Nominal"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the new task name!',
                                },
                            ]}
                        >
                            <div className="nominal-name-and-input">
                                <div className="form-input-nominal-name">
                                    <Input placeholder="Nominal" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </Form.Item>

                    </Row>
                    <Row>
                        <div className="tipe-name-and-input">
                            <div className="input-area-drop-down">
                                <Form.Item
                                    name="is_income"
                                    label="Type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select type!',
                                        },
                                    ]}

                                >
                                    <Select
                                        style={{ width: 270 }}
                                        placeholder="select type"
                                        >
                                        
                                            <Option value='1'>income</Option>
                                            <Option value='0'>outcome</Option>
                                        
                                    </Select>

                                </Form.Item>
                            </div>
                        </div>


                    </Row>
                    <Row>
                        <Form.Item
                            name="balance_description"
                            label="Desciption"
                            className="new-balance-form_last-form-item"
                        >
                            <div className="description-name-and-input">

                                <div className="form-input-description-name">
                                    <Input.TextArea placeholder="Deskripsi" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </Form.Item>

                    </Row>
                </div>
            </Form>

        </Modal>
    )
}
export const FloatingMoneyReport = () => {


    const [visible, setVisible] = useState(false);

    const onCreate = async (values) => {
        const token = getToken();
        const response = await axios.post(BASE_API_URL + 'balance', {
            workspace_id: values.workspace_id,
            nominal: values.nominal,
            is_income: values.is_income,
            balance_description: values.balance_description
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(response)
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
                New Balance

            </Button>
            <NewBalanceForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
}