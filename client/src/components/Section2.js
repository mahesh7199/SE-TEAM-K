import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import slider_img from '../asserts/process-02.png';

export default function Section2(){
    const navigate = useNavigate();
    return (
        <div className="section2">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="sec-diva">
                            <h6>WE HAVE 150,000+ LIVE JOBS</h6>
                            <h1>Find your dream jobs with <span> JOB CONNECT</span></h1>
                            <p>Find jobs, create trackable resumes and enrich your applications.Carefully crafted after analyzing the needs of different industries.</p>
                            <button onClick={() => navigate('/jobs')} className="btn btn-primary px-md-5 py-3 mt-4">Search A Job</button>
                        </div>
                    </Col> 
                    <Col md={6}>
                        <img src={slider_img} className="image-slider" alt="img" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

