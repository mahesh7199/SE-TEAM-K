import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

import Navbar from '../components/common/Navbar';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function SignUp(){
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [showAlert, setShowAlert] = useState(false);

    const [error2, setError2] = useState(null);

    const [logo, setLogo] = useState(null);


    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/login');
        }, 2500);
    }

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("data : ", data);
        if(logo){
            console.log("data : ", data);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("contactnumber", data.contactnumber);
            formData.append("city", data.city);
            formData.append("country", data.country);
            formData.append("desiredJob", data.desiredJob);
            formData.append("qualifications", data.qualifications);
            formData.append("experience", data.experience);
            formData.append("description", data.description);
            formData.append("password", data.password);
            formData.append("profilePic", logo);
            console.log("FormData : ", formData);

            axios.post('http://localhost:5000/auth/applicant/register', formData).then((response) => {
                console.log("response : ", response);
    
    
                if(response?.status == 201){
                    // alert("Account Created Successfully.");
                    reset({name: "", email: "", contactnumber: "", city: "", country: "", desiredJob: "", qualifications: "", experience: "", password: "", description: ""});
                }
                handleAlert();
            }).catch((err) => {
                console.log("Error : ", err);
                if(err?.response?.status === 401){
                    setError2(err?.response?.data?.msg);
                }
            })
        }
    }
    
    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Account Created Successfully.
                </SweetAlert>
            )}
            <Navbar />
            <div className='w-100'>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                                <h1 className='text-center mt-4'>Job Seeker's Signup</h1>
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
                                                {error2 && <p className='pt-1 pb-2  text-danger'>{error2}</p>}
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
                                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="password" {...register("password", {required: true})} placeholder="Enter your password" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Profile </Form.Label>
                                                <Form.Control type="file" required onChange={(e) => setLogo(e.target.files[0])} placeholder="Enter your Profile" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="px-4">
                                            <Form.Group className="mb-3" controlId="formBasicPassword62">
                                                <Form.Label> Qualification </Form.Label>
                                                <Form.Control type="text" {...register("qualifications", {required: true})} placeholder="Enter your Qualification" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword27">
                                                <Form.Label> Years of Experience </Form.Label>
                                                <Form.Control type="text" {...register("experience", {required: true})} placeholder="Enter number of Experience" />
                                            </Form.Group>                                        
                                            
                                            <Form.Group className="mb-3" controlId="formBasicPassword28">
                                                <Form.Label> Job your looking for </Form.Label>
                                                <Form.Control type="text" {...register("desiredJob", {required: true})} placeholder="Enter category of job you are looking for" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword29">
                                                <Form.Label> Description  </Form.Label>
                                                <Form.Control as="textarea" {...register("description", {required: true})} placeholder="Enter a brief description about your" style={{ height: '190px' }} />
                                            </Form.Group>                                        

                                            <Button variant="primary" className='w-100' type="submit">
                                                Register
                                            </Button>
                                            <Button variant="secondary" className='w-100 mt-3' onClick={() => navigate('/signup/recuriter')}>
                                                Click here to signup as Recuriter
                                            </Button>
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