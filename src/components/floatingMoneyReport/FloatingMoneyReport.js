import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { BsWallet2 } from 'react-icons/bs';
import { useState, useContext } from 'react';

import { Form, Card, Row, Col, Input, Select, DatePicker, Upload } from 'antd';
import { ClockCircleOutlined, MailOutlined, TagsOutlined, DatabaseOutlined, HistoryOutlined, FileOutlined, DollarCircleOutlined } from '@ant-design/icons'
import { BsPencilSquare } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import '../floatingMoneyReport/FloatingMoneyReport.css';
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';
import { getToken } from '../../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';

import newReportImage from '../floatingMoneyReport/newBalance.png'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const NewBalanceForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const context = useContext(WorkspaceContext)
    const { Option } = Select;
    const [image, setImage] = useState("")
    const getFile = (e) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
    };

    const normFile = (event) => {
        console.log('Upload event:', event);
        if (Array.isArray(event)) {
            return event;
        }
        return event && event.fileList;
    };

    const onImageChange = (event) => {
        let formdata = new FormData()
        console.log("MASUK FUNGSI onImageChange")
        let img = event.file
        formdata.append('file_path', img)
    }

    return (
        <Modal
            title="New Balance"
            visible={visible}
            centered={true}
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
                    <Row className="row-test-1">
                                <Form.Item
                                    name="workspace_id"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select workspace!',
                                        },
                                    ]}

                                >
                                    <div className="workspace-name-and-logo">
                                        <div className="workspace-logo">
                                            <MailOutlined />
                                        </div>
                                        <div className="workspace-name-and-input">
                                            <div className="workspace-name">
                                                Workspace Name
                                            </div>
                                        </div>
                                    </div>
                                    <Select
                                        style={{ marginLeft: "30px", width: 240 }}
                                        placeholder="Select your workspace"
                                    >
                                        {context.workspace.map(w =>
                                            (<Option value={w.id}>{w.workspace_name}</Option>)
                                        )}
                                    </Select>

                                </Form.Item>
                    </Row>
                    <Row className="row-test">
                        <Form.Item
                            name="balance_description"
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <FileOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Description
                                    </div>
                                    <div className="form-input-description-name">
                                        <Input.TextArea placeholder="Description" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>

                    </Row>
                    <Form.Item
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the date!',
                            },
                        ]}>
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <CalendarOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Date
                                    </div>
                                </div>
                            </div>
                            <DatePicker style={{ marginLeft: "10px", width: "240px", borderRadius: "10px 10px 10px 10px" }}/>
                    </Form.Item>
                    <Row>
                        <Form.Item
                            name="nominal"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the value!',
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <DollarCircleOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Nominal
                                    </div>
                                    <div className="form-input-nominal-name">
                                        <Input placeholder="Nominal" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </div>
                        </Form.Item>

                    </Row>
                    <Row>
                        <Form.Item
                            name="is_income"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select type!',
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <DatabaseOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Type
                                    </div>
                                </div>
                            </div>
                            <Select
                                style={{ marginLeft: "30px", width: 240 }}
                                placeholder="Select Type"
                            >
                                <Option value='1'>income</Option>
                                <Option value='0'>outcome</Option>
                            </Select>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select status!',
                                },
                            ]}
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <HistoryOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Status
                                    </div>
                                </div>
                            </div>
                            <Select
                                style={{ marginLeft: "30px", width: 240 }}
                                placeholder="Select Status"
                            >
                                <Option value='Planned'>Planned</Option>
                                <Option value='Done'>Done</Option>
                            </Select>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            name="transaction_note"
                            valuePropName="fileList"
                            getValueFromEvent={getFile}
                            className="new-balance-form_last-form-item"
                        >
                            <div className="workspace-name-and-logo">
                                <div className="workspace-logo">
                                    <TagsOutlined />
                                </div>
                                <div className="workspace-name-and-input">
                                    <div className="workspace-name">
                                        Transaction Notes
                                    </div>
                                </div>
                            </div>
                            <Upload>
                                <Button 
                                    style={{ 
                                        marginLeft: "30px", width: "240px", borderRadius: "10px 10px 10px 10px" 
                                    }} 
                                    icon={
                                <UploadOutlined 
                                    style={{ 
                                        margin: "auto"
                                    }}
                                        />
                                    }
                                >
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Row>
                </div>
            </Form>

        </Modal>
    )

}
export const FloatingMoneyReport = () => {


    const [visible, setVisible] = useState(false);
    const token = getToken();
    const onCreate = async (values) => {

        const dateInput = new Date(values.date);
        const date = (dateInput.getYear() + 1900) + "-" + dateInput.getMonth() + "-" + dateInput.getDate()
        const response = await axios.post(BASE_API_URL + 'balance', {
            workspace_id: values.workspace_id,
            nominal: values.nominal,
            is_income: values.is_income,
            balance_description: values.balance_description,
            date: date,
            status: values.status
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(response)
        const formData = new FormData();
        formData.append('_method', 'POST');
        formData.append('file_path', values.transaction_note[0].originFileObj);
        formData.append('balance_id', response.data.balance.id)
        //uploadProof(values.transaction_note[0],response.data.balance.id)  
        const response_file = await axios.post(BASE_API_URL + 'attachment', formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(response_file)
        setVisible(false);
    };

    // const uploadProof = async (file,$id) => {


    //     const response = await axios.post(BASE_API_URL + 'attachment', {
    //         file_path: values.transaction_note[0].file,
    //         balance_id: response.data.board.id
    //     },
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             },
    //         });
    // }


    return (
        <>
            <NewBalanceForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <div
                className="btn w-100 h-100 d-flex justify-content-center align-items-center"

                onClick={() => {
                    setVisible(true);
                }}>
                <img src={newReportImage} width={200} alt="" />
            </div>
        </>
    );
}