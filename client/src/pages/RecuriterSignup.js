import React, { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

import Navbar from '../components/common/Navbar';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

const RecuriterSignup = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [logo, setLogo] = useState(null);
    const [error2, setError2] = useState(null);

    const [showAlert, setShowAlert] = useState(false);

    const navigate= useNavigate();

    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/login');
        }, 2000);
    }

    // const handleAlert = () => {
    //     setShowAlert(true);
    //     setTimeout(() => {
    //       setShowAlert(false);
    //     }, 2000); // Replace 3000 with the desired time in milliseconds
    // };

    const onSubmit = (data) => {
        console.log("data : ", data);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("companyName", data.companyName);
        formData.append("contactnumber", data.contactnumber);
        formData.append("email", data.email);
        formData.append("companyLink", data.companyLink);
        formData.append("password", data.password);
        formData.append("logo", logo);
        console.log("FormData : ", formData);

        axios.post('http://localhost:5000/auth/recruiter/register', formData).then((response) => {
            console.log("response : ", response);
            if(response?.status == 201){
                // alert("Account Created Successfully.");
                reset({name: "", email: "", contactnumber: "", logo: "", password: "", companyName: ""});
                setLogo(null);
                handleAlert();
            }
        }).catch((err) => {
            console.log("Error : ", err);
            console.log("Error : ", err?.response?.data?.msg);
            if(err?.response?.status === 401){
                setError2(err?.response?.data?.msg);
            }
        })
    }

    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Go to Login"  onConfirm={() => navigate('/login')} onCancel={() => showAlert(false)}>
                    Account Created Successfully.
                </SweetAlert>
            )}
            <Navbar />
            <div className='w-100'>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Container>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <h1 className='text-center mt-4'>Recuriter Signup</h1>
                                <div className='signup-div mt-4'>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={12} className="px-4">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" {...register("name", {required: true})} placeholder="Enter your name" />
                                                {errors?.name && (<p className='text-danger font10' >Recuriter Name is required.</p>)}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" {...register("companyName", {required: true})} placeholder="Enter your email" />
                                                {errors?.companyName && (<p className='text-danger font10' >Company Name is required.</p>)}

                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Contact Number</Form.Label>
                                                <Form.Control type="text" {...register("contactnumber", {required: true})} placeholder="Enter your contact number" />
                                                {errors?.contactnumber && (<p className='text-danger font10' >Contact Number is required.</p>)}

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" {...register("email", {required: true})} placeholder="Enter your email" />
                                                {errors?.email && (<p className='text-danger font10' >Email is required.</p>)}
                                                {error2 && (<p className='text-danger font10' >{error2}</p>)}

                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Compnay Wesbiste Link</Form.Label>
                                                <Form.Control type="text" {...register("companyLink", {required: true})} placeholder="Enter your company website link" />
                                                {errors?.companyLink && (<p className='text-danger font10' >Company Link is required.</p>)}
                                            
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword5">
                                                <Form.Label>Company Logo or Profile</Form.Label>
                                                <Form.Control type="file" onChange={(e) => setLogo(e.target.files[0])} required placeholder="Enter your country name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="password" {...register("password", {required: true})} placeholder="Enter your password" />
                                            </Form.Group>                                        

                                            <Button variant="primary" className='w-100' type="submit">
                                                Register
                                            </Button>
                                            <Button type="button" variant="secondary" onClick={() => navigate('/signup/jobseeker')} className='w-100 mt-3'>
                                                Click here to signup as Job Seeker
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

export default RecuriterSignup;