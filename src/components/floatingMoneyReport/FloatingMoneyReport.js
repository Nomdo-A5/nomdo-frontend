import React from 'react'
import { Button, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { BsWallet2 } from 'react-icons/bs';
import { useState, useContext } from 'react';

import { Form, Card, Row, Col, Input, Select, DatePicker, Upload } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
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
        // console.log("IMAGE  " + image);
        // console.log("TARGET FILES  " + e.target.files[0]);
        // return e.target.files[0];

        // const normFile = (e: any) => {
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
                    <Row className="row-test">
                        <Form.Item
                            name="balance_description"
                            label="Desciption"
                        >
                            <div className="description-name-and-input">

                                <div className="form-input-description-name">
                                    <Input.TextArea placeholder="Description" style={{ borderRadius: "10px 10px 10px 10px" }} />
                                </div>
                            </div>
                        </Form.Item>

                    </Row>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the date!',
                            },
                        ]}>
                        <DatePicker style={{ width: "92%", borderRadius: "10px 10px 10px 10px" }}/>
                    </Form.Item>
                    <Row>
                        <Form.Item
                            name="nominal"
                            label="Nominal"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the value!',
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
                                        placeholder="Select Type"
                                    >

                                        <Option value='1'>income</Option>
                                        <Option value='0'>outcome</Option>

                                    </Select>

                                </Form.Item>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="status-name-and-input">
                            <div className="input-area-drop-down">
                                <Form.Item
                                    name="status"
                                    label="Status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select status!',
                                        },
                                    ]}

                                >
                                    <Select
                                        style={{ width: 270 }}
                                        placeholder="Select Status"
                                    >

                                        <Option value='Planned'>Planned</Option>
                                        <Option value='Done'>Done</Option>

                                    </Select>

                                </Form.Item>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="proof-name-and-input">
                            <div className="proof-area-drop-down">
                                <Form.Item
                                    name="transaction_note"
                                    label="Transaction Notes"
                                    valuePropName="fileList"
                                    getValueFromEvent={getFile}

                                    className="new-balance-form_last-form-item"
                                >


                                    <Upload>
                                        <Button 
                                            style={{ 
                                                width: "270px", borderRadius: "10px 10px 10px 10px" 
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
                            </div>
                        </div>
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


        console.log(values)

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