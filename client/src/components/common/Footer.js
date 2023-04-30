import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer(){
    const navigate = useNavigate();


    return (
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-6 col-md-6">
                        <h4 className="text-white mb-4">JOB CONNECT</h4>
                        <p>
                        JOB CONNECT is the go-to platform for both job seekers and employers. Our mission is to connect talented individuals with top-notch companies and help them find their dream jobs. We offer a wide range of job opportunities in various industries, including technology, healthcare, finance, and many more. With our user-friendly interface and powerful search engine, job seekers can easily find the perfect position that matches their skills and qualifications. 
                        </p>
                        {/* <a className="btn btn-link text-white-50" href="">Home</a>
                        <a className="btn btn-link text-white-50" href="">Jobs</a>
                        <a className="btn btn-link text-white-50" href="">Login</a>
                        <a className="btn btn-link text-white-50" href="">Signup</a> */}
                        {/* <a className="btn btn-link text-white-50" href="">Terms & Condition</a> */}
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Quick Links</h5>
                        <a className="btn btn-link text-white-50" onClick={() => navigate('/')}>Home</a>
                        <a className="btn btn-link text-white-50" onClick={() => navigate('/jobs')}>Jobs</a>
                        <a className="btn btn-link text-white-50" onClick={() => navigate('/contact')}>Contact US</a>
                        <a className="btn btn-link text-white-50" onClick={() => navigate('/login')}>Login</a>
                        <a className="btn btn-link text-white-50" onClick={() => navigate('/signup/jobseeker')}>SignUp</a>
                        {/* <a className="btn btn-link text-white-50" href="">Terms & Condition</a> */}
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Contact</h5>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@connectjob.com</p>
                        {/* <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                    </div>
                    {/* <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Newsletter</h5>
                        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                        <div className="position-relative mx-auto" style={{maxWidth: '400px'}}>
                            <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="">JobConnect</a>, All Right Reserved. 
							
							
							{/* Designed By <a className="border-bottom" href="">Free Website Code</a> */}
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            {/* <div className="footer-menu">
                                <a href="">Home</a>
                                <a href="">Cookies</a>
                                <a href="">Help</a>
                                <a href="">FQAs</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}