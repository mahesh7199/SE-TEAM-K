import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import img1 from '../asserts/com-logo-1.jpg';
import img2 from '../asserts/com-logo-2.jpg';
import img3 from '../asserts/com-logo-3.jpg';
import img4 from '../asserts/com-logo-4.jpg';
import img5 from '../asserts/com-logo-5.jpg';

export default function Section4(){
    const [jobs, setJobs] = useState(null);
    const [perposals, setPerposals] = useState(null);


    const navigate = useNavigate();

    const userId = localStorage.getItem('job_id');


    useEffect(() => {
        axios.get(`http://localhost:5000/api/applicant/jobs/${userId}`).then((response) => {
            console.log("Get User Perposels Response : ", response);
            setPerposals(response?.data?.applications);
        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs').then((response) => {
            console.log("response : ", response);

            setJobs(response?.data?.job);
        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [])

    function alreadyApplied(jId){
        let flg = 0;
        for(let i = 0; i < perposals?.length; i++){
            if(perposals[i]?.jobId === jId){
                // console.log("**********Matched************")
                flg = 1;
                break;
            }
        }
        return flg;   
    }

    function applyJob(id){
        // const jobId = localStorage.getItem('job_id');
        // if(jobId){
            navigate(`/job/${id}`);
        // } else {
        //     navigate('login');
        // }
    }
    
    // let counter = 1;

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                    {/* <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                        <li className="nav-item">
                            <a style={{textDecoration: 'none'}} className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
                                <h6 className="mt-n1 mb-0">Featured</h6>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{textDecoration: 'none'}} className="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
                                <h6 className="mt-n1 mb-0">Full Time</h6>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{textDecoration: 'none'}} className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
                                <h6 className="mt-n1 mb-0">Part Time</h6>
                            </a>
                        </li>
                    </ul> */}
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            {jobs && jobs.map((job, index) => { 
                                {/* if(counter < 4){ */}
                                    return (
                                        <div className="job-item p-4 mb-4" key={index}>
                                            <div className="row g-4">
                                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                                    {/* <img className="flex-shrink-0 img-fluid border rounded" crossorigin="anonymous"  src={img1}  alt="" style={{width: '80px', height: '80px'}} /> */}
                                                    <FetchImage idd={job?.recruiterId} />
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
                                                        
                                                        {alreadyApplied(job?._id) === 1 ? (
                                                            <b className="text-success">Applied</b>
                                                        ) : (
                                                            <a className="btn btn-primary" onClick={() => navigate(`/job/${job?._id}`)}>Apply Now</a>
                                                        )}
                                                        
                                                        {/* <a className="btn btn-primary" onClick={() => applyJob(job?._id)}>Apply Now</a> */}
                                                    </div>
                                                    <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date : {job?.datee}</small>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                {/* } */}
                                    {/* counter = counter + 1; */}
                            })}
                            {/* </div> */}
                            <a className="btn btn-primary py-3 px-5" onClick={() => navigate('/jobs')}>Browse More Jobs</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const FetchImage = ({idd}) => {
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/recruiter/${idd}`).then((res) => {
            console.log("response profile fetch rec : ", res);
            setLogo(res?.data?.jobSeeker?.logo);
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }, [idd])

    return (
        <img className="flex-shrink-0 img-fluid border rounded" crossorigin="anonymous"  src={logo ? "http://localhost:5000/uploads/"+logo : img1}  alt="" style={{width: '80px', height: '80px'}} />
    )
}