import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {RiLogoutCircleRLine} from 'react-icons/ri';
import axios from "axios";

export default function Navbar({type, tab, notification, notification2}){
    const navigate = useNavigate();
    // const [notification, setNotification] = useState(null);

    const js_id = localStorage.getItem('job_id');

    const js_token = localStorage.getItem('job_token');

    const rec_token = localStorage.getItem('rtoken');
    
    const admin_token = localStorage.getItem('sa_token');
    
    const js_profile = localStorage.getItem('job_profile');




    function logoutFun(){
        localStorage.removeItem('job_token');
        localStorage.removeItem('job_id');
        navigate('/login');
    }

    function logoutFun3(){
        localStorage.removeItem('sa_token');
        navigate('/');
    }
    
    function logoutFun2(){
        localStorage.removeItem('rtoken');
        localStorage.removeItem('rlogo');
        localStorage.removeItem('remail');
        localStorage.removeItem('rid');
        navigate('/login');        
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            {type === 1 ? (
                <>
                    <a className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <h1 className="m-0 text-primary">JOB CONNECT</h1>
                    </a>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a onClick={() => navigate('/recuriter/jobseekers')} className={tab === 7 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Job Seekers</a>
                            <a onClick={() => navigate('/recuriter/jobs')} className={tab === 8 ? "nav-item nav-link active cursor" : "nav-item cursor nav-link"}>Jobs</a>
                            <a onClick={() => navigate('/recuriter/perposals')} className={tab === 9 ? "nav-item nav-link active cursor" : "nav-item cursor nav-link"}>Applications</a>
                            <a onClick={() => navigate('/chat')} className={tab === 10 ? "nav-item nav-link active cursor" : "nav-item cursor nav-link"}>Chats {notification > 0 && <span className="chat-label bg-danger text-white">{notification}</span>}</a>
                            
                            <a onClick={() => navigate('/recuriter/postjob')} className={tab === 11 ? "nav-item nav-link active cursor" : "nav-item cursor nav-link"}>Post A Job</a>
                        </div>
                        {rec_token && (
                            <a onClick={logoutFun2} className="btn cursor btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Logout <i className="fa fa-arrow-right ms-3"></i></a>
                        )}
                    </div>
                </>
            ) : type === 3 ? (
                <>
                    <a className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <h1 className="m-0 text-primary">Super Admin</h1>
                    </a>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a onClick={() => navigate('/super/admin/jobseekers')} className={tab === 12 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Job Seekers</a>
                            <a onClick={() => navigate('/super/admin/recruiters')} className={tab === 13 ? "nav-item nav-link active cursor" : "nav-item cursor nav-link"}>Recuriter</a>
                            <a onClick={() => navigate('/super/admin/messages')} className={tab === 14 ? "nav-item nav-link active cursor" : "nav-item cursor nav-link"}>Support</a>
                            {/* <a onClick={() => navigate('/chat')} className="nav-item cursor nav-link">Chats</a> */}
                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Jobs</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="job-list.html" className="dropdown-item">Job List</a>
                                    <a href="job-detail.html" className="dropdown-item">Job Detail</a>
                                </div>
                            </div> */}
                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="category.html" className="dropdown-item">Job Category</a>
                                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                    <a href="404.html" className="dropdown-item">404</a>
                                </div>
                            </div> */}
                            {/* <a onClick={() => navigate('/recuriter/postjob')} className="nav-item cursor nav-link">Post A Job</a> */}
                        </div>
                        {admin_token && (
                            <a onClick={logoutFun3} className="btn cursor btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Logout <i className="fa fa-arrow-right ms-3"></i></a>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <a className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <h1 className="m-0 text-primary">JOB CONNECT</h1>
                    </a>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a onClick={() => navigate('/')} className={tab === 1 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Home</a>
                            <a onClick={() => navigate('/jobs')} className={tab === 2 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Jobs</a>
                            {!js_token && (
                                <a onClick={() => navigate('/contact')} href="" className={tab === 3 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Contact Us</a>
                            )}
                            
                            {js_token && (
                                <>
                                    <a onClick={() => navigate('/jobseeker/chat')} className={tab === 4 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Chat {notification2 > 0 && <span className="chat-label bg-danger text-white">{notification2}</span>}</a>
                                    {/* <a onClick={() => navigate('/updatebio')} href="" className="nav-item nav-link cursor">Update Bio</a> */}
                                </>
                            )}
                            
                            {!js_token && (
                                <a onClick={() => navigate('/login')} className={tab === 6 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Login</a>
                            )}
                            {js_token && (
                                <a onClick={() => navigate('/perposals')} className={tab === 5 ? "nav-item nav-link active cursor" : "nav-item nav-link cursor"}>Jobs Applied</a>
                            )}
                        </div>
                            {/* <a onClick={logoutFun} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block cursor">Logout<i className="fa fa-arrow-right ms-3"></i></a> */}
                        {js_token ? (
                            <>
                                <a onClick={() => navigate(`/profile/${js_id}`)} className="btn btn-primary2 rounded-0 py-4 px-lg-3 pe-lg-5 d-none d-lg-block cursor"><img src={`http://localhost:5000/uploads/${js_profile}`} className="nav-profile" /></a>
                                <a onClick={logoutFun} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block cursor"><RiLogoutCircleRLine /></a>

                            </>
                        ) : (
                            <a onClick={() => navigate('/signup/jobseeker')} className="cursor btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">SignUp<i className="fa fa-arrow-right ms-3"></i></a>
                        )}
                    </div>
                </>
            )}
            
        </nav>
    )
}