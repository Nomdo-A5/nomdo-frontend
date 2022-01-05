import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Empty, Space, DatePicker, Modal, Select, Input, Form } from 'antd';
import { ClockCircleOutlined, MailOutlined } from '@ant-design/icons'
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import './EditTask.css';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { BASE_API_URL } from '../../constants/urls';
import { getToken } from '../../utils/authentication';
import { ClickedTask } from "../clickedTask/ClickedTask";

const EditTaskForm = ({ visible, task, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const { workspaceMembers } = useContext(WorkspaceContext)
    const { Option } = Select;

    return (
        <Modal
            width={340}
            style={{ textAFlign: "center" }}
            visible={visible}
            title="Edit Task"
            okText="Save Changes"
            cancelText="Cancel"
            centered={true}
            onCancel={onCancel}
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
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >
                <Form.Item
                    name="task_name"
                    label="Task name"
                    initialValue={task.task_name}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the new task name!',
                        },
                    ]}
                >
                    <div className="task-name-and-input">

                        <div className="input-area">
                            <div className="form-input-task-name">
                                <Input placeholder={task.task_name} style={{ borderRadius: "10px 10px 10px 10px" }} />
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="task_description"
                    label="Task Desciption"
                    initialValue={task.task_description}
                >
                    <div className="description-name-and-input">
                        <div className="input-area">
                            <div className="form-input-task-name">
                                <Input.TextArea placeholder={task.task_description} style={{ borderRadius: "10px 10px 10px 10px" }} />
                            </div>
                        </div>
                    </div>

                </Form.Item>
                <Form.Item
                    name="date"
                    label="Date"
                >

                    <DatePicker placeholder={task.due_date} style={{ width: "270px", borderRadius: "10px 10px 10px 10px" }} />

                </Form.Item>
                <Form.Item
                    name="member_id"
                    label="Assigned Member"
                    rules={[
                        {
                            required: false,
                            message: 'Please select assigned member!',
                        },
                    ]}

                >
                    <Select
                        style={{ width: 280, paddingLeft: "10px" }}
                        placeholder="Select members">
                        {workspaceMembers.map((member) => (
                            <Option value={member.id}>{member.name}</Option>
                        ))}

                    </Select>

                </Form.Item>
            </Form>
        </Modal>
    );
};
const EditTask = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { workspace_id } = useParams()
    const token = getToken()
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)

    const [date, setDate] = useState("")

    const handleOk = async (values) => {

        if (values.date === undefined) {
            setDate(props.editedTask.due_date)
        } else {
            const dateInput = new Date(values.date);
            setDate((dateInput.getYear() + 1900) + "-" + (dateInput.getMonth() + 1) + "-" + dateInput.getDate())
        }


        // const response = await axios.patch(BASE_API_URL + 'workspace', {
        //     id:activeWorkspace.id,
        //     workspace_name: values.workspace_name,
        //     workspace_description: values.description
        // },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         },
        //     });
        console.log(values)
        // console.log(response)
        setIsModalVisible(false);
    };


    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div className="layout-title-dashboard">
            <div className="workspace-title-dashboard-1">
                {/* <div className="workspace-title-dashboard-1-1">
                    {activeWorkspace.workspace_name}
                </div> */}
                <div className="workspace-title-dashboard-1-2">
                    <Button
                        type="link"
                        onClick={showModal}
                        style={{
                            backgroundColor: "none",
                            color: "black",
                            marginTop: "auto",
                            marginBottom: "auto"
                        }}
                    >
                        Edit task
                    </Button>
                </div>
                <EditTaskForm
                    visible={isModalVisible}
                    task={props.editedTask}
                    onCreate={handleOk}
                    onCancel={() => { setIsModalVisible(false) }}
                />

            </div>
        </div >
    );
}

export default EditTask;