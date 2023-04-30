import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

import Navbar from '../components/common/Navbar';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function UpdateJS({notification2}){
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState(false);

    // const navigate = useNavigate();

    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            // navigate('/login');
        }, 2000);
    }

    const navigate = useNavigate();

    useEffect(() => {

        const jsid = localStorage.getItem('job_id');

        axios.get(`http://localhost:5000/api/users/applicant/${jsid}`).then((response) => {
            console.log("response : ", response);
            setUser(response?.data?.jobSeeker);
            const duser= response?.data?.jobSeeker;
            reset({name: duser?.name, email: duser?.email, contactnumber: duser?.contactnumber, city: duser?.city, country: duser?.country, desiredJob: duser?.desiredJob, qualifications: duser?.qualifications, experience: duser?.experience, description: duser?.description});
            
        }).catch((err) => {
            console.log("Error : ", err);
        })

    }, [])


    const onSubmit = (data) => {
        const jsid = localStorage.getItem('job_id');
        console.log("data : ", data);
        axios.patch(`http://localhost:5000/api/users/applicant/update/${jsid}`, data).then((response) => {
            console.log("response : ", response);
            // reset({name: duser?.name, email: duser?.email, contactnumber: duser?.contactnumber, city: duser?.city, country: duser?.country, desiredJob: duser?.desiredJob, qualifications: duser?.qualifications, experience: duser?.experience, description: duser?.description});
            // reset({name: "", email: "", contactnumber: "", city: "", country: "", desiredJob: "", qualifications: "", experience: "", password: "", description: ""});
            
            handleAlert();
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }
    
    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Account Update Successfully.
                </SweetAlert>
            )}
            <Navbar notification2={notification2} />
            <div className='w-100'>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                                <h1 className='text-center mt-4'>Job Seeker's Update Account</h1>
                                <div className='signup-div mt-4'>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={6} className="px-4">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" {...register("name", {required: true})} placeholder="Enter your name" />
                                                {/* <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                                </Form.Text> */}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" {...register("email", {required: true})} placeholder="Enter your email" />

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword1">
                                                <Form.Label>Contact Number</Form.Label>
                                                <Form.Control type="text" {...register("contactnumber", {required: true})} placeholder="+1 234 1924 1234" />

                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword4">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control type="text" {...register("city", {required: true})} placeholder="Enter your city name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword5">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control type="text" {...register("country", {required: true})} placeholder="Enter your country name" />
                                            </Form.Group>
                                            {/* <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="password" {...register("password", {required: true})} placeholder="Enter your password" />
                                            </Form.Group> */}
                                            <Form.Group className="mb-3" controlId="formBasicPassword62">
                                                <Form.Label> Qualification </Form.Label>
                                                <Form.Control type="text" {...register("qualifications", {required: true})} placeholder="Enter your Qualification" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="px-4">

                                            <Form.Group className="mb-3" controlId="formBasicPassword27">
                                                <Form.Label> Years of Experience </Form.Label>
                                                <Form.Control type="text" {...register("experience", {required: true})} placeholder="Enter number of Experience" />
                                            </Form.Group>                                        
                                            
                                            <Form.Group className="mb-3" controlId="formBasicPassword28">
                                                <Form.Label> Job your looking for </Form.Label>
                                                <Form.Control type="text" {...register("desiredJob", {required: true})} placeholder="Enter category of job you are looking for" />
                                            </Form.Group>
                                            {/* <Form.Group className="mb-3" controlId="formBasicPassword28">
                                                <Form.Label> Profile Picture </Form.Label>
                                                <Form.Control type="file"  placeholder="Enter category of job you are looking for" />
                                            </Form.Group> */}

                                            <Form.Group className="mb-3" controlId="formBasicPassword29">
                                                <Form.Label> Description  </Form.Label>
                                                <Form.Control as="textarea" {...register("description", {required: true})} placeholder="Enter a brief description about your" style={{ height: '241px' }} />
                                            </Form.Group>                                        

                                            <Button variant="primary" className='w-100' type="submit">
                                                Update Profile
                                            </Button>
                                            {/* <Button variant="secondary" className='w-100 mt-3' onClick={() => navigate('/signup/recuriter')}>
                                                Click here to signup as Recuriter
                                            </Button> */}
                                        </Col>
                                    </Row>

                                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group> */}
                                </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                {/* </form> */}
            </div>
        </>
    )
}