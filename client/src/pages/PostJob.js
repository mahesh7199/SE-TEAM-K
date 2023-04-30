import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

import Navbar from '../components/common/Navbar';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function PostJob({notification}){
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [showAlert, setShowAlert] = useState(false);

    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            // navigate('/login');
        }, 2000);
    }


    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("data : ", data);
        const remail = localStorage.getItem('remail');
        const rid = localStorage.getItem('rid');

        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        console.log(formattedDate);

        const obj = {...data, recruiterId: rid, companyEmail: remail, datee: formattedDate}
        axios.post('http://localhost:5000/api/jobs', obj).then((response) => {
            console.log("response : ", response);
            if(response?.status == 201){
                // alert("Job Created Successfully.");
                reset({jobName: "", city: "", desiredJob: "", qualificationsReq: "", jobType: "", minSalary: "", maxSalary: "", jobDescription: "", salary: ""});
                handleAlert();
            }
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }
    
    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Job Added Successfully.
                </SweetAlert>
            )}
            <Navbar type={1} tab={11} notification={notification} />
            <div className='w-100'>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Container>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={10}>
                                <h1 className='text-center mt-4'>Post a Job</h1>
                                <div className='signup-div mt-4'>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={6} className="px-4">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Job Title</Form.Label>
                                                <Form.Control type="text" {...register("jobName", {required: true})} placeholder="Enter job title" />
                                                {errors?.jobName && <p className='text-danger'>Job title is required.</p>}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Job Type</Form.Label>
                                                <Form.Control type="text" {...register("jobType", {required: true})} placeholder="Enter job type" />
                                                {errors?.jobType && <p className='text-danger'>Job type is required.</p>}
                                                
                                            </Form.Group>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                                                        <Form.Label>Minimum Salary </Form.Label>
                                                        <Form.Control type="text" {...register("minSalary", {required: true})} placeholder="Enter Min Salary" />
                                                        {errors?.minSalary && <p className='text-danger'>Min Salary is required.</p>}

                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                                                        <Form.Label>Maximum Salary </Form.Label>
                                                        <Form.Control type="text" {...register("maxSalary", {required: true})} placeholder="Enter Max Salary" />
                                                        {errors?.maxSalary && <p className='text-danger'>Max Salary is required.</p>}

                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <Form.Group className="mb-3" controlId="formBasicPassword4">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control type="text" {...register("city", {required: true})} placeholder="Enter job location " />
                                                {errors?.city && <p className='text-danger'>Location is required.</p>}

                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword62">
                                                <Form.Label> Qualification Required</Form.Label>
                                                <Form.Control type="text" {...register("qualificationsReq", {required: true})} placeholder="Enter qualification required" />
                                                {errors?.qualificationsReq && <p className='text-danger'>Qualification is required.</p>}

                                            </Form.Group>
                                            
                                            {/* <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                <Form.Label> Password </Form.Label>
                                                <Form.Control type="password" {...register("password", {required: true})} placeholder="Enter your password" />
                                            </Form.Group> */}
                                        </Col>
                                        <Col md={6} className="px-4">

                                            {/* <Form.Group className="mb-3" controlId="formBasicPassword27">
                                                <Form.Label> Years of Experience </Form.Label>
                                                <Form.Control type="text" {...register("experience", {required: true})} placeholder="Enter number of Experience" />
                                            </Form.Group>                                        
                                            <Form.Group className="mb-3" controlId="formBasicPassword28">
                                                <Form.Label> Job your looking for </Form.Label>
                                                <Form.Control type="text" {...register("desiredJob", {required: true})} placeholder="Enter category of job you are looking for" />
                                            </Form.Group>                                         */}
                                            <Form.Group className="mb-3" controlId="formBasicPassword29">
                                                <Form.Label> Description  </Form.Label>
                                                <Form.Control as="textarea" {...register("jobDescription", {required: true})} placeholder="Enter a detailed description" style={{ height: '360px' }} />
                                                {errors?.jobDescription && <p className='text-danger'>Job description is required.</p>}

                                            </Form.Group>                                        

                                            <Button variant="primary" className='w-100' type="submit">
                                                Post
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