import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Section3(){
    return (
        <div className="container-xxl py-5">
            <Container className="py-5">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
                <Row className="row g-4">
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-mail-bulk text-primary mb-4"></i>
                            <h6 className="mb-3">Marketing</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                            <h6 className="mb-3">Customer Service</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                            <h6 className="mb-3">Human Resource</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-tasks text-primary mb-4"></i>
                            <h6 className="mb-3">Project Management</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-chart-line text-primary mb-4"></i>
                            <h6 className="mb-3">Business Development</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                            <h6 className="mb-3">Sales & Communication</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-book-reader text-primary mb-4"></i>
                            <h6 className="mb-3">Teaching & Education</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                    <Col className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                        <a className="cat-item rounded p-4" href="">
                            <i className="fa fa-3x fa-drafting-compass text-primary mb-4"></i>
                            <h6 className="mb-3">Design & Creative</h6>
                            <p className="mb-0">123 Vacancy</p>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}