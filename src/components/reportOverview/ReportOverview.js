import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './ReportOverview.css';
import Overview from './OverviewHalf.svg'
import { BsArrowRight } from 'react-icons/bs';

export default function ReportOverview (props) {

    return (
        <div>
            <Card
                style={{
                    width: "295px",
                    height: "100%",
                    borderRadius: "18px",
                    display: "flex",
                    justifyContent: "left"
                }}
                bodyStyle={{
                    padding: "0"
                }}
            >
                <div className="card-main-division">
                    <img 
                        style={{ borderRadius: "15px" }}
                        className="imagez" src={Overview} height={150} alt=""
                    />
                    <div className="value-and-button">
                        <div className="income-value">
                           {new Intl.NumberFormat('ID').format(props.total)}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}