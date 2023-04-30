import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function ListOfRecs(){
    const [jobSeeker, setJobSeekers] = useState(null);
    const [flag, setFlag] = useState(1);

    const [search, setSearch] = useState(null);
    const [location, setLocation] = useState(null);
    const [filteredJobSeekers, setFilteredJobSeekers] = useState(null);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const admin_token = localStorage.getItem('sa_token');
        if(!admin_token){
            navigate('/login');
        }
    }, [])

    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            // navigate('/login');
        }, 2000);
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/recruiters').then((response) => {
            console.log("response recruiter: ", response);
            
            setFilteredJobSeekers(response?.data?.recruiters);
            
            setJobSeekers(response?.data?.recruiters);

        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [flag])

    function approveRec(jobb, stat){
        console.log(jobb);
        axios.patch(`http://localhost:5000/api/recruiter/update/${jobb?._id}`, {...jobb, status: stat}).then((response) => {
            console.log("Response : ", response);
            setFlag(flag+1);
            // alert("Job deleted successfully.");
            handleAlert();
        }).catch((error) => {
            console.log("error : ", error);
        })
    }

    // useEffect(() => {
    //     const result = filteredJobSeekers && filteredJobSeekers.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.qualifications.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.desiredJob.toLowerCase().includes(search.toLowerCase()));
    //     setJobSeekers(result);
    // }, [search])

    // useEffect(() => {
    //     const result = filteredJobSeekers && filteredJobSeekers.filter(item => item.city.toLowerCase().includes(location.toLowerCase()));
    //     setJobSeekers(result);
    // }, [location])

    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Status Updated Successfully.
                </SweetAlert>
            )}
            <Navbar type={3} tab={13} />
            <div className='w-100 mt-5'>
                <Container>
                    <div className="w-100 d-flex">
                        <div className="w-50 py-4 mb-md-5 mb-0">
                            <h2 className="text-start">List of Recruiters</h2>
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
                                <th>Profile</th>
                                <th>Company Name</th>
                                <th>Recruiter</th>
                                <th>Email</th>
                                <th>Contact</th>
                                {/* <th>City</th> */}
                                <th>Status</th>
                                <th>Change Status</th>
                                <th className='text-center'>View Site</th>
                                {/* <th>Edit</th>
                                <th>Delete</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {jobSeeker && jobSeeker.map((job, index) => (
                                job && (
                                    <>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td><img src={`http://localhost:5000/uploads/${job?.logo}`} className='rec-prof' /></td>
                                            <td>{job?.companyName}</td>
                                            <td>{job?.name}</td>
                                            <td>{job?.email}</td>
                                            <td>{job?.contactnumber}</td>
                                            {/* <td>{job?.desiredJob}</td> */}
                                            {/* <td>{job?.city}</td> */}
                                            <td>{job?.status === "Approved" ? <b className='text-success'>Approved</b> : job?.status === "Blocked" ? <b className='text-danger'>Blocked</b> : <button className='btn btn-success' onClick={() => approveRec(job, "Approved")}>Approve</button>}</td>
                                            <td className='text-center'>{job?.status === "Blocked" ? <button className='btn btn-warning' onClick={() => approveRec(job, "Approved")}>Unblock</button> : <button className='btn btn-danger' onClick={() => approveRec(job, "Blocked")}>Block</button>}</td>
                                            <td className='text-center'><a target='_blank' className='btn btn-primary' href={`${job?.companyLink}`}>View</a></td>
                                            {/* <td>{job?.minSalary} - {job?.maxSalary}</td> */}
                                            {/* <td><button className='btn btn-info px-4' onClick={() => navigate(`/recuriter/editjob/${job?._id}`)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={() => deleteJob(job?._id)}>Delete</button></td>                                     */}
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