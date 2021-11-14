import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './ProgressBar.css';
import ProgressBarPercent from 'react-bootstrap/ProgressBar'

export default function ProgressBar (props) {
    return (
        <div>
            <Card
                style={{
                    alignContent: "center",
                    width: "750px",
                    height: "auto",
                    borderRadius: "16px",
                    margin: "0 auto",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    backgroundColor: "#F6F6F6"
                }}
                title={props.task_name}
            >
                <div className="progress-bar-form">
                    <div className="progress-bar-title">
                        Divisi Acara 
                    </div>
                    <div className="progress-bar-chart">
                        <ProgressBarPercent variant="success" now={80} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
