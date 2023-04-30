import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';

const JobseekerPerposals = ({notification2}) => {
    const [perposals, setPerposals] = useState(null);
    
    
    const userId = localStorage.getItem('job_id');
    

    useEffect(() => {
        axios.get(`http://localhost:5000/api/applicant/jobs/${userId}`).then((response) => {
            console.log("Get User Perposels Response : ", response);
            setPerposals(response?.data?.applications);
        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [])



    return (
        <>
            <Navbar tab={5} notification2={notification2} />
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                {perposals && perposals.map((job, index) => { 
                                            
                                    return (
                                    <div className="job-item p-4 mb-4" key={index}>
                                        <div className="row g-4">
                                            <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                                {/* <img className="flex-shrink-0 img-fluid border rounded" crossorigin="anonymous"  src={img1}  alt="" style={{width: '80px', height: '80px'}} /> */}
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
                                                    <a className={job?.applicationStatus === 'Accepted' ? "btn btn-success" : job?.applicationStatus === 'Rejected' ? "btn btn-danger" : "btn btn-warning"}>{job?.applicationStatus === 'Accepted' ? "Accepted" : job?.applicationStatus === 'Rejected' ? "Rejected" : "Pending"}</a>
                                                </div>
                                                {/* <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date : {job?.datee}</small> */}
                                            </div>
                                        </div>
                                        <div className='row g-4'>
                                            <div className='col-12'>
                                                <p className='mt-3'>{job?.message}</p>
                                            </div>
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default JobseekerPerposals;