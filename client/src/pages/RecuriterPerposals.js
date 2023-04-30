import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const RecuriterPerposals = ({notification}) => {
    
    const [perposals, setPerposals] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [jobSeekerId, setJobSeekId] = useState(null);
    const [applicationId, setApplicationId] = useState(null);

    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const recId = localStorage.getItem('rid');

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000)
    }
    
    const handleAlert3 = () => {
        setShowAlert3(true);
        setTimeout(() => {
            setShowAlert3(false);
        }, 3000)
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/recruiter/get-applications/${recId}`).then((response) => {
            console.log("Get User Perposels Response : ", response);
            setPerposals(response?.data?.applications);
        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [showAlert])

    function changeStatus(idd, val){
        console.log("Clickeddd");
        axios.patch(`http://localhost:5000/api/recruiter/application/${idd}`, {applicationStatus: val}).then((res) => {
            console.log("Status change Response : ", res);
            handleAlert();
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }
    
    function sendMessage(){
        const ridd = localStorage.getItem('rid');
        setShowAlert2(false);
        if(message){
            axios.post('http://localhost:5000/api/recruiter/start-chat', {recruiterId: ridd, applicantId: jobSeekerId, messages: [{message: message, sender: 'REC', status: "delivered"}]}).then((res) => {
                console.log("Message sent");
                
                axios.patch(`http://localhost:5000/api/recruiter/application/chatstatus/${applicationId}`, {chatStatus: 'Initiated'}).then((res) => {
                    console.log("Status change Response : ", res);
                    // handleAlert();
                    axios.get(`http://localhost:5000/api/recruiter/get-applications/${recId}`).then((response) => {
                        console.log("Get User Perposels Response : ", response);
                        setPerposals(response?.data?.applications);
                    }).catch((error) => {
                        console.log("Error : ", error);
                    })

                }).catch((err) => {
                    console.log("Error : ", err);
                })
                
                handleAlert3();

            }).catch((err) => {
                console.log("Error : ", err);
            })
        }
    }

    function chatFun(id, jsId){ 
        setApplicationId(id);
        setJobSeekId(jsId);
        setShowAlert2(true);
    }

    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Status Updated Successfully.
                </SweetAlert>
            )}
            
            {showAlert2 && (
                <SweetAlert confirmBtnText="Send" title="Start Chat" onConfirm={sendMessage} onCancel={() => setShowAlert2(false)}>
                    <div>
                        <label className='mb-1'>Message</label>
                        <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder='Enter your message' className='form-control' />
                    </div>
                </SweetAlert>
            )}    
            {showAlert3 && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert3(false)} onCancel={() => setShowAlert3(false)}>
                    Chat Stated Successfully.
                </SweetAlert>
            )}

            <Navbar type={1} tab={9} notification={notification} />
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
                                                    {job?.chatStatus === "Pending" ? (
                                                        <button className='btn btn-primary me-2' onClick={() => chatFun(job?._id, job?.applicantId, job?.recruiterId)}>Chat</button>
                                                    ) : (
                                                        <button className='btn btn-info me-2'>Chat Initiated</button>
                                                    )}
                                                    {job?.applicationStatus === "Pending" ? (
                                                        <>
                                                            <button className='btn btn-success' onClick={() => changeStatus(job?._id, "Accepted")}>Accept</button>
                                                            <button className='btn btn-danger ms-2' onClick={() => changeStatus(job?._id, "Rejected")}>Reject</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* <a className={job?.applicationStatus === 'Accepted' ? "btn btn-success" : job?.applicationStatus === 'Rejected' ? "btn btn-danger" : "btn btn-warning"}>{job?.applicationStatus === 'Accepted' ? "Accepted" : job?.applicationStatus === 'Rejected' ? "Rejected" : "Pending"}</a> */}
                                                            {job?.applicationStatus === 'Accepted' && (
                                                                <b className='text-success mt-1 ms-2'>Accepted</b>
                                                            )}
                                                            {job?.applicationStatus === 'Rejected' && (
                                                                <b className='text-danger mt-1 ms-2'>Rejected</b>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                {/* <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date : {job?.datee}</small> */}
                                            </div>
                                        </div>
                                        <div className='row g-4'>
                                            <div className='col-12'>
                                                <p className='mt-3'>{job?.message}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='btn btn-info' onClick={() => navigate(`/profile/${job?.applicantId}`)}>View Profile</button>
                                            <a className='btn btn-warning ms-3' target="_blank" href={`http://localhost:5000/uploads/${job?.resume}`}>View Resume</a>
                                            <a className='btn btn-secondary ms-3' target="_blank" href={`http://localhost:5000/uploads/${job?.coverLetter}`}>View Cover Letter</a>
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

export default RecuriterPerposals;