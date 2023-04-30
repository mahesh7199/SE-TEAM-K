import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function MessageList(){
    const [jobSeeker, setJobSeekers] = useState(null);
    const [flag, setFlag] = useState(1);

    const [search, setSearch] = useState(null);
    const [location, setLocation] = useState(null);
    const [filteredJobSeekers, setFilteredJobSeekers] = useState(null);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(false);

    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            // navigate('/login');
        }, 2000);
    }

    useEffect(() => {
        const admin_token = localStorage.getItem('sa_token');
        if(!admin_token){
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/contact').then((response) => {
            console.log("response : ", response);
            
            setFilteredJobSeekers(response?.data?.messages);
            
            setJobSeekers(response?.data?.messages);

        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [flag])



    return (
        <>
            {showAlert && (
                <SweetAlert
                    title={<span>Message</span>}
                    onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}
                    >
                    {/* <span>A custom <span style={{color:'#F8BB86'}}>html</span> message.</span> */}
                    <span>{message}</span>
                    </SweetAlert>
            )}
            <Navbar type={3} tab={14} />
            <div className='w-100 mt-5'>
                <Container>
                    <div className="w-100 d-flex">
                        <div className="w-50 py-4 mb-md-2 mb-0">
                            <h2 className="text-start">List of Support Messages</h2>
                        </div>
                        <div className="w-25 px-2 py-4 mb-md-5 mb-0">
                            {/* <input type="text"  className="form-control w-100" onChange={(e) => setSearch(e.target.value)} placeholder="Search by job title, type or any keyword " /> */}
                        </div>
                        <div className="w-25 px-2 py-4 mb-md-5 mb-0">
                            {/* <input type="text"  className="form-control w-100" onChange={(e) => setLocation(e.target.value)} placeholder="search by location" /> */}
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobSeeker && jobSeeker.map((job, index) => (
                                job && (
                                    <>
                                        <tr>
                                            <td >{index+1}</td>
                                            <td>{job?.name}</td>
                                            <td>{job?.email}</td>
                                            {/* <td><p className='d-inline-block' style={{width: '65%'}}>{job?.subject}</p></td> */}
                                            <td>{job?.subject}</td>
                                            <td ><button className='text-center btn btn-primary px-4' onClick={() => { setMessage(job?.message); setShowAlert(true)}}>View</button></td>
                                        </tr>
                                        {/* <tr>
                                            <td>Bio : </td>
                                            <td colSpan="6">{job?.description}</td>
                                        </tr> */}
                                    </>
                                )
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    )
}