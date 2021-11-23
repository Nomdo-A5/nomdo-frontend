import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './ProgressBar.css';
import ProgressBarPercent from 'react-bootstrap/ProgressBar'

export default function ProgressBar (props) {
    return (
        <div className="progress-bar-form">
            <div className="progress-bar-chart">
                <ProgressBarPercent borderRadius="50px" variant="success" now={80} />
            </div>
        </div>
    );
}
