import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import img1 from '../asserts/com-logo-1.jpg';
import { useNavigate } from "react-router-dom";


export default function Jobs({notification2}){
    const [jobs, setJobs] = useState(null);
    const [search, setSearch] = useState(null);
    const [location, setLocation] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState(null);
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

            // let jobsData = [];
            // response?.data?.job && response?.data?.job.map((job) => { 
            //     console.log("runing : ")
            //     let dataa = null;
            //     axios.get(`http://localhost:5000/api/get-image/${job?.recruiterId}`).then((response) => {
            //         console.log("response img : ", response);
            //         const ans = response?.data?.img;
            //         {/* dataa= ans; */}
            //         let arr = ans.split('\\')
            //         let revArr = arr.reverse();
            //         console.log("name : ", revArr[0]);
            //         dataa = revArr[0];
            //         let sJob = {...job, img: revArr[0]};
            //         jobsData.push(sJob);
            //     }).catch((error) => {
            //         console.log("Error img : ", error);
            //     })
            //     console.log("JobsDAta : ", jobsData);
            // })

            setJobs(response?.data?.job);
            setFilteredJobs(response?.data?.job);
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


    useEffect(() => {
        const result = jobs && jobs.filter(item => item.jobName.toLowerCase().includes(search.toLowerCase()) || item.jobDescription.toLowerCase().includes(search.toLowerCase()) || item.qualificationsReq.toLowerCase().includes(search.toLowerCase()) || item.jobType.toLowerCase().includes(search.toLowerCase()));
        setFilteredJobs(result);
    }, [search])

    useEffect(() => {
        const result = jobs && jobs.filter(item => item.city.toLowerCase().includes(location.toLowerCase()));
        setFilteredJobs(result);
    }, [location])


    return (
        <>
            <div className="c-container-xxl bg-white p-0">
                <Navbar tab={2} notification2={notification2} />
                <div className="container-xxl py-5">
                    <div className="container">
                        {/* <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1> */}
                        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                            <div className="w-100 d-flex">
                                <div className="w-50 py-4 mb-md-5 mb-0">
                                    <h2 className="text-start">Recuriters are looking for you</h2>
                                </div>
                                <div className="w-25 px-2 py-4 mb-md-5 mb-0">
                                    <input type="text"  className="form-control w-100" onChange={(e) => setSearch(e.target.value)} placeholder="Search by job title, type or any keyword " />
                                </div>
                                <div className="w-25 px-2 py-4 mb-md-5 mb-0">
                                    <input type="text"  className="form-control w-100" onChange={(e) => setLocation(e.target.value)} placeholder="search by location" />
                                </div>
                            </div>
                            {/* <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                                <li className="nav-item">
                                    <a style={{textDecoration: 'none'}} className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" >
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
                                    {filteredJobs && filteredJobs.map((job, index) => { 
                                        
                                        return (
                                        <div className="job-item p-4 mb-4" key={index}>
                                            <div className="row g-4">
                                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                                    <FetchImage idd={job?.recruiterId} />
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
                                                        {alreadyApplied(job?._id) === 1 ? (
                                                            <b className="text-success">Applied</b>
                                                        ) : (
                                                            <a className="btn btn-primary" onClick={() => navigate(`/job/${job?._id}`)}>Apply Now</a>
                                                        )}
                                                    </div>
                                                    <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date : {job?.datee}</small>
                                                </div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!localStorage.getItem('job_token') && (
                    <Footer />
                )}
            </div>
        </>
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