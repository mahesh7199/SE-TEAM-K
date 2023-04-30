import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function ListOfSeekers(){
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
        axios.get('http://localhost:5000/api/users/applicants').then((response) => {
            console.log("response : ", response);
            
            setFilteredJobSeekers(response?.data?.applicants);
            
            setJobSeekers(response?.data?.applicants);

        }).catch((error) => {
            console.log("Error : ", error);
        })
    }, [flag])

    function deleteJob(idd){
        axios.delete(`http://localhost:5000/api/job/${idd}`).then((response) => {
            console.log("Response : ", response);
            setFlag(flag+1);
            // alert("Job deleted successfully.");
            handleAlert();
        }).catch((error) => {
            console.log("error : ", error);
        })
    }

    useEffect(() => {
        const result = filteredJobSeekers && filteredJobSeekers.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.qualifications.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.desiredJob.toLowerCase().includes(search.toLowerCase()));
        setJobSeekers(result);
    }, [search])

    useEffect(() => {
        const result = filteredJobSeekers && filteredJobSeekers.filter(item => item.city.toLowerCase().includes(location.toLowerCase()));
        setJobSeekers(result);
    }, [location])

    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Job Deleted Successfully.
                </SweetAlert>
            )}
            <Navbar type={3} tab={12} />
            <div className='w-100 mt-5'>
                <Container>
                    <div className="w-100 d-flex">
                        <div className="w-50 py-4 mb-md-5 mb-0">
                            <h2 className="text-start">List of Job Seekers</h2>
                        </div>
                        <div className="w-25 px-2 py-4 mb-md-5 mb-0">
                            <input type="text"  className="form-control w-100" onChange={(e) => setSearch(e.target.value)} placeholder="Search by job title, type or any keyword " />
                        </div>
                        <div className="w-25 px-2 py-4 mb-md-5 mb-0">
                            <input type="text"  className="form-control w-100" onChange={(e) => setLocation(e.target.value)} placeholder="search by location" />
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Qualifications</th>
                                <th>Job Desired</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>View Profile</th>
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
                                            <td>{job?.name}</td>
                                            <td>{job?.email}</td>
                                            <td>{job?.qualifications}</td>
                                            <td>{job?.desiredJob}</td>
                                            <td>{job?.city}</td>
                                            <td>{job?.country}</td>
                                            <td className='text-center'><button className='btn btn-primary' onClick={() => navigate(`/jobseeker/profile/${job?._id}`)}>View</button></td>
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