import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const Profile = ({notification}) => {
    const [js, setJS] = useState(null);
    const js_id = localStorage.getItem('job_id');

    const {id} = useParams();

    const naviagte = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/applicant/${id}`).then((res) => {
            console.log("Response profile : ", res);
            setJS(res?.data?.jobSeeker);
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }, [])


  return (
    <>
        <Navbar type={!js_id && 1} notification={notification} />
        <Container className="py-4 my-4">
        <Row>
            <Col md={4}>
            <Card className="mt-3">
                <div className="card-image-container">
                <Image
                    src={`http://localhost:5000/uploads/${js?.profilePic}`}
                    roundedCircle
                    className="profile-pic mb-3"
                />
                </div>
                <Card.Body>
                <Card.Title className="text-center">{js?.name}</Card.Title>
                <div className="text-muted">
                    <Card.Text>
                        <div className="d-flex justify-content-between">
                            <div>Contact</div>
                            <div>{js?.contactnumber}</div>
                        </div>
                    </Card.Text>
                    
                    <Card.Text>
                        <div className="d-flex justify-content-between">
                            <div>Email</div>
                            <div>{js?.email}</div>
                        </div>
                    </Card.Text>

                    <Card.Text>
                        <div className="d-flex justify-content-between">
                            <div>City</div>
                            <div>{js?.city}</div>
                        </div>
                    </Card.Text>
                    <Card.Text className={!js_id ? "mb-4 pb-3" : "nododf"}>
                        <div className="d-flex justify-content-between">
                            <div>Country</div>
                            <div>{js?.country}</div>
                        </div>
                    </Card.Text>

                    <Card.Text className={!js_id ? "mb-233" : "nododf"}>
                        {js_id && (
                            <div className="text-center">
                                <button style={{marginTop: '-7px'}} onClick={() => naviagte('/updatebio')} className="btn px-4 btn-info">Edit</button>
                            </div>
                        )}
                    </Card.Text>

                </div>
                </Card.Body>
            </Card>
            </Col>
            <Col md={8}>
            <div className="mt-3 qualifications-container">
                <h3 className="text-center">Details </h3>
                <div className="qualification-item">
                <h5>Degree</h5>
                <p>{js?.qualifications}</p>
                <h5>Desired Job</h5>
                <p>{js?.desiredJob}</p>
                <h5>Years of Experience</h5>
                <p>{js?.experience}</p>
                
                </div>
                <div className="qualification-item end-item-q">
                <h5>Description</h5>
                <p>{js?.description}</p>
                {/* <p>University</p>
                <p>Year Graduated</p> */}
                </div>
            </div>
            </Col>
        </Row>
        </Container>
    </>
  );
};

export default Profile;
