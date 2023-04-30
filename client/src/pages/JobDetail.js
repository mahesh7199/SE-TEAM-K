import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

import img1 from '../asserts/com-logo-1.jpg';

import {useForm} from 'react-hook-form';

import SweetAlert from 'react-bootstrap-sweetalert';

const JobDetail = ({notification2}) => {
    const [job, setJob] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [resume, setResume] = useState(null);
    const [logo, setLogo] = useState(null);
    const [cover, setCover] = useState(null);


    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/job/${id}`).then((response) => {
            console.log("response : ", response);
            setJob(response?.data?.job);
        }).catch((error) => {
            console.log("error : ", error);
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/recruiter/${job?.recruiterId}`).then((res) => {
            console.log("response profile fetch rec : ", res);
            setLogo(res?.data?.jobSeeker?.logo);
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }, [job])
    
    const onSubmit = (data) => {
        const userId = localStorage.getItem('job_id');

        console.log("Resume test : : ", resume)

        if(userId){
            const obj = {
                recruiterId: job?.recruiterId,
                jobId: job?._id,
                applicantId: userId,
                message: data?.message,
                jobName: job?.jobName,
                jobDescription: job?.jobDescription,
                city: job?.city,
                minSalary: job?.minSalary,
                maxSalary: job?.maxSalary,
                jobType: job?.jobType,
                resume: resume
            };
            const formData = new FormData();
            
            formData.append("recruiterId", job?.recruiterId);
            formData.append("jobId", job?._id);
            formData.append("applicantId", userId);
            formData.append("message", data?.message);
            formData.append("jobName", job?.jobName);
            formData.append("jobDescription", job?.jobDescription);
            formData.append("city", job?.city);
            formData.append("datee", job?.datee);
            formData.append("minSalary", job?.minSalary);
            formData.append("maxSalary", job?.maxSalary);
            formData.append("jobType", job?.jobType);
            formData.append("resume", resume);
            formData.append("coverLetter", cover);


            // console.log("Resume : ", re )
            axios.post('http://localhost:5000/auth/applicant/apply', formData).then((response) => {
                console.log("response : ", response);
                reset({message: ''});
                setShowAlert(true);            
            }).catch((error) => {
                console.log("error : ", error);
            });
        } else {
            // navigate('/login');
            setShowAlert2(true);
        }
    }


    return (
        <div className='c-container-xxl bg-white p-0'>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => navigate('/jobs')} onCancel={() => setShowAlert(false)}>
                Proposal Send Successfully.
                </SweetAlert>
            )}
            {showAlert2 && (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Go to Login Page"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="secondary"
                    title=""
                    onConfirm={() => navigate('/login')}
                    onCancel={() => setShowAlert2(false)}
                    // ={this.onCancel}
                    focusCancelBtn
                >
                You are not logged in. please login to your account to apply for job
                </SweetAlert>
            )}
            <Navbar notification2={notification2} />
                <div className="container-xxl py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="job-item p-4 mb-4">
                            <div className="row g-4">
                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                    <img className="flex-shrink-0 img-fluid border rounded" crossorigin="anonymous"  src={logo ? "http://localhost:5000/uploads/"+logo : img1}  alt="" style={{width: '80px', height: '80px'}} />
                                    <div className="text-start ps-4">
                                        
                                        <h5 className="mb-3">{job?.jobName}</h5>
                                        <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job?.city}</span>
                                        <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{job?.jobType}</span>
                                        <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>{job?.minSalary} - {job?.maxSalary}</span>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    <div className="d-flex mb-3">
                                        {/* <a className="btn btn-light btn-square me-3" href=""><i className="far fa-heart text-primary"></i></a> */}
                                        {/* <a className="btn btn-primary" onClick={() => console.log("daf")}>Apply Now</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className='row g-4'>
                                <div className='col-12 pt-4'>
                                    <p>{job?.jobDescription}</p>
                                    <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date : {job?.datee}</small>
                                </div>
                            </div>

                            <div className='mb-3 mt-3'>
                                <label className='form-label'>Resume</label>
                                <input type="file" required name="resume" className='form-control' onChange={(e) => setResume(e.target.files[0])} />
                            </div>
                            <div className='mb-3 mt-3'>
                                <label className='form-label'>Cover Letter</label>
                                <input type="file" required name="cover" className='form-control' onChange={(e) => setCover(e.target.files[0])} />
                            </div>

                            <div className="mb-3 mt-3">
                                <label for="exampleFormControlTextarea1" className="form-label">Description (Tell us about what makes you unique)</label>
                                <textarea {...register("message", {required: true})} className="form-control" id="exampleFormControlTextarea1" placeholder='Write about 50 - 100 words' rows="5"></textarea>
                                {errors?.message && <p className='mt-1 text-danger'>Description is required.</p>}
                            </div>
                            <div>
                                <button className='btn btn-primary px-4'>Apply</button>
                            </div>

                        </div>
                    </form>
                </div>
            <Footer />
        </div>
    )
}




export default JobDetail;