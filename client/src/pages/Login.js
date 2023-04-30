import React, { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

import Navbar from '../components/common/Navbar';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

const Login = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const onSubmit = (data) => {
        console.log("data : ", data);
        if(data.user === "job_seeker"){
            axios.post('http://localhost:5000/auth/applicant/login', data).then((response) => {
                console.log("response : ", response);
                if(response?.status == 200){
                    // alert("Account Created Successfully.");
                    // reset({username: "", password: ""});
                    localStorage.setItem('job_token', response?.data?.token);
                    localStorage.setItem('job_id', response?.data?.id);
                    localStorage.setItem('job_profile', response?.data?.profilePic);
                    // localStorage.setItem('rlogo', response?.data?.user?.logo);
                    // localStorage.setItem('remail', response?.data?.user?.email);
                    // localStorage.setItem('rid', response?.data?.user?._id);
                    navigate('/jobs');
                }
            }).catch((err) => {
                console.log("Error : ", err);
                setError(err?.response?.data?.msg);
            })
        }

        if(data.user === "recuriter"){
            axios.post('http://localhost:5000/auth/recruiter/login', data).then((response) => {
                console.log("response : ", response);
                // if(response?.status == 200){
                    // alert("Account Created Successfully.");
                    // reset({username: "", password: ""});
                    if(response?.data?.user?.status === "Approved"){
                        localStorage.setItem('rtoken', response?.data?.token);
                        localStorage.setItem('rlogo', response?.data?.user?.logo);
                        localStorage.setItem('remail', response?.data?.user?.email);
                        localStorage.setItem('rid', response?.data?.user?._id);
                        navigate('/recuriter/jobs');
                    } else if(response?.data?.user?.status === "Blocked") {
                        
                        setError("Your account is blocked! Contact admin for more information");
                    } else {
                        // setShowAlert(true);
                        setError("Can't access! Waiting for Admin approval");
                    }
                // }
            }).catch((err) => {
                setError(err?.response?.data?.msg);
                console.log("Error : ", err?.response?.data?.msg);
                // console.log("Error : ", err);
            })
        }
    }

    return (
        <>
            <Navbar tab={6} />
            <div className='w-100'>
                    {showAlert && (
                        <SweetAlert title="Admin has not yet approved you." onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)} />
                    )}
                    <Container>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <div className='signup-div mt-4 pb-5 logindivv'>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={12} className="px-4 py-4">
                                            <h1 className='text-center mt-4 pb-4'>Login</h1>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" {...register("username", {required: true})} placeholder="Enter your email" />

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="password" {...register("password", {required: true})} placeholder="Enter your password" />
                                            </Form.Group>
                                            

                                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> User Type </Form.Label>
                                                <Form.Select className='mb-3' {...register("user", {required: true})} aria-label="Select User">
                                                    <option>Select User Type</option>
                                                    <option value="job_seeker">Job Seeker</option>
                                                    <option value="recuriter">Recuriter</option>
                                                </Form.Select>                                        
                                            </Form.Group>

                                            <Button variant="primary" className='w-100 mt-3' type="submit">
                                                Login
                                            </Button>
                                            {/* <Button variant="secondary" className='w-100 mt-3'>
                                                Login As a Recuriter 
                                            </Button> */}
                                        </Col>
                                    </Row>
                                    {error && (
                                        <p className='text-danger mt-2'>{error}</p>
                                    )}

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

export default Login;