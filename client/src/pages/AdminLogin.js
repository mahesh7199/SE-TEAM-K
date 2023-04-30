import React, { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

import Navbar from '../components/common/Navbar';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        console.log("data : ", data);
        
        if(data?.username === "admin@gmail.com" && data?.password === "admin1234"){
            // alert("Login successfully");
            setError(null);
            navigate('/super/admin/jobseekers');
            localStorage.setItem('sa_token', "logged-in");
        } else {
            setError("Invalid Email or Password!");
        }

        
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className='w-100'>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Container>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <div className='signup-div  pb-5' style={{marginTop: '15vh'}}>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={12} className="px-4 py-4">
                                            <h1 className='text-center mt-4 pb-4'>Admin Login</h1>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" {...register("username", {required: true})} placeholder="Enter your email" />

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="password" {...register("password", {required: true})} placeholder="Enter your password" />
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

export default AdminLogin;