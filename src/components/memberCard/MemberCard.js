import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import './MemberCard.css';
import { BsArrowRight } from 'react-icons/bs';
import Initial from './Initial.svg'
import { FloatingMember } from "../../components/floatingMember/FloatingMember";

export default function MemberCard (props) {

    return (
        <div>
            <Card
                style={{
                    width: "12em",
                    height: "100%",
                    borderRadius: "18px",
                    display: "flex",
                    justifyContent: "center"
                }}
                bodyStyle={{
                    padding: "0"
                }}
            >
                <div className="member-card-main">
                    <div className="member-card-initial">
                        <img 
                            style={{ borderRadius: "15px" }}
                            className="imagez" src={Initial} height={75} alt=""
                        />
                    </div>
                    <div className="member-card-names">
                        Alan Novianto
                    </div>
                    <div className="member-card-view-details">
                        <FloatingMember/>
                    </div>
                </div>
            </Card>
        </div>
    );
}
