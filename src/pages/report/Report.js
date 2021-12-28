import React, { useEffect, useState } from 'react'
import { Layout, Table, Tag, Space, Modal, Select, Form, Row, Input, DatePicker } from 'antd';
import './Report.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NavbarMain from "../../components/NavbarMain";
import { WorkspaceContext, WorkspaceContextProvider } from '../../context/WorkspaceContext';

import '../../components/taskOnBoard/TaskOnBoard.css';
import { Tablereport } from "../../components/tablereport/Tablereport";
import TaskOnBoard from '../../components/taskOnBoard/TaskOnBoard';
import { FloatingButton } from "../../components/floatingButton/FloatingButton";
import { getToken } from '../../utils/authentication';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import PageTitle from '../../components/pageTitle/PageTitle';

import Income from "../../components/reportIncome/ReportIncome";
import Outcome from "../../components/reportOutcome/ReportOutcome";
import Overview from "../../components/reportOverview/ReportOverview";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';

function refreshPage() {
    window.location.reload(true);
}


const Report = () => {
    const { confirm } = Modal;
    const { Sider } = Layout
    const token = getToken()
    const [reports, setReports] = useState([]);
    const { workspace_id } = useParams()
    const [overview, setOverview] = useState([]);
    const { activeWorkspace, GetWorkspaceById } = useContext(WorkspaceContext)
    const [isEditFormVisible, setIsEditFormVisible] = useState(false)
    const [editedBalance, setEditedBalance] = useState([])


    const GetReport = async () => {
        const response = await axios.get(BASE_API_URL + 'report', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        setReports(response.data.balance)
    }

    const GetReportOverview = async () => {
        const response = await axios.get(BASE_API_URL + 'report/overview', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': `${workspace_id}`
            }
        })
        console.log(response)
        setOverview(response.data)
    }

    const EditBalanceForm = ({ editedBalance, visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        const context = useContext(WorkspaceContext)
        const { Option } = Select;

        return (
            <Modal
                title="Edit Balance"
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

                        <Row className="row-test">
                            <Form.Item
                                name="balance_description"
                                label="Desciption"
                                initialValue={editedBalance.balance_description}
                            >
                                <div className="description-name-and-input">

                                    <div className="form-input-description-name">
                                        <Input.TextArea placeholder={editedBalance.balance_description} style={{ borderRadius: "10px 10px 10px 10px" }} />
                                    </div>
                                </div>
                            </Form.Item>

                        </Row>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input the date!',
                                },
                            ]}>
                            <DatePicker style={{ width: "270px", borderRadius: "10px 10px 10px 10px" }} placeholder={editedBalance.date} />
                        </Form.Item>
                        <Row>
                            <Form.Item
                                name="nominal"
                                label="Nominal"
                                initialValue={editedBalance.nominal}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the value!',
                                    },
                                ]}
                            >
                                <div className="nominal-name-and-input">
                                    <div className="form-input-nominal-name">
                                        <Input placeholder={new Intl.NumberFormat('ID').format(editedBalance.nominal)} style={{ borderRadius: "10px 10px 10px 10px" }} />
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
                                    >
                                        <Select
                                            style={{ width: 270 }}
                                            placeholder={editedBalance.is_income === 0 ? 'outcome' : 'income'}
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
                                        initialValue={editedBalance.status}

                                        className="edit-balance-form_last-form-item"

                                    >
                                        <Select
                                            style={{ width: 270 }}
                                            placeholder={editedBalance.status}
                                        >

                                            <Option value='Planned'>Planned</Option>
                                            <Option value='Done'>Done</Option>

                                        </Select>

                                    </Form.Item>
                                </div>
                            </div>
                        </Row>

                    </div>
                </Form>

            </Modal>
        )
    }

    const onEdit = async (values) => {
        console.log(values)
        const isIncome = editedBalance.is_income
        if (typeof values.is_income != 'undefined')
            isIncome = values.is_income

        const response = await axios.put(BASE_API_URL + 'balance', {
            id: editedBalance.id,
            balance_description: values.balance_description,
            nominal: values.nominal,
            is_income: isIncome
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        console.log(response)

        setIsEditFormVisible(false)
    }

    function showEditBalance(balance) {
        setEditedBalance(balance)
        setIsEditFormVisible(true)
    }

    const deleteBalance = async ($id) => {
        console.log("TOKENN " + token)
        const response = await axios.delete(BASE_API_URL + 'balance', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: $id
            }
        });

        console.log(response)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            innerHeight: '10px',
            outerHeight: '10px',
            backgroundColor: 'red',
            render: text => <a>{text}</a>,
            width: '5%'
            // title:"Index",
            // key:"index",
            // dataIndex: 'id',
            // render: (index) => (page - 1) * 10 + index
        },
        {
            title: 'Description',
            dataIndex: 'balance_description',
            key: 'description',
            render: text => <a>{text}</a>,
            width: '25%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text => <a>{text}</a>,
            width: '10%',
        },
        {
            title: 'Nominal',
            dataIndex: 'nominal',
            key: 'nominal',
            align: 'right',
            width: '10%',
            sorter: (a, b) => a.nominal - b.nominal,
            render: text => <a>{new Intl.NumberFormat('ID').format(text)}</a>
        },
        {
            title: 'Type',
            dataIndex: 'is_income',
            key: 'type',
            filters: [
                {
                    text: 'Outcome',
                    value: 0,
                },
                {
                    text: 'Income',
                    value: 1,
                },
            ],
            onFilter: (value, record) => {
                return record.is_income === value
            },
            render: text => <a>{text === 0 ? 'Outcome' : 'Income'}</a>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Done',
                    value: 'Done',
                },
                {
                    text: 'Planned',
                    value: 'Planned',
                },
            ],
            onFilter: (value, record) => {
                return record.status === value
            },
            render: text => <a>{text}</a>,
        },
        // {
        //     title: 'Proof',
        //     dataIndex: 'Transaction_proof',
        //     key: 'Transaction_proof',
        // },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: text => <a>{text.split("T")[0]}</a>
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => {
                            showEditBalance(record)
                        }} />
                        <DeleteOutlined onClick={() => {
                            showDeleteConfirm(record.id)
                        }} style={{ color: "red", marginLeft: 12 }} />
                    </>
                )
            }
        },
    ];

    function showDeleteConfirm($id) {
        confirm({
            title: 'Are you sure delete this balance?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBalance($id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        GetReport()
        GetReportOverview()
        GetWorkspaceById(workspace_id)
    }, [])

    return (
        <div>
            <div className="report-title">

                <PageTitle />

            </div>
            <div className="report-images">
                <div className="report-images-component">
                    <Income income={overview.income_balance} />
                </div>
                <div className="report-images-component">
                    <Outcome outcome={overview.outcome_balance} />
                </div>
                <div className="report-images-component">
                    <Overview total={overview.total_balance} />
                </div>
            </div>
            <div className="report-table">

                <Table
                    columns={columns}
                    dataSource={reports}
                    size="small"
                />
                <EditBalanceForm
                    editedBalance={editedBalance}
                    visible={isEditFormVisible}
                    onCreate={onEdit}
                    onCancel={() => {
                        setIsEditFormVisible(false)
                    }}
                />
            </div>

        </div>

    );
}

export default Report;