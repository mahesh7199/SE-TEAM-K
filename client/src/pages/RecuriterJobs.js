import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function RecuriterJobs({notification}){
    const [jobs, setJobs] = useState(null);
    const [flag, setFlag] = useState(1);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    function handleAlert(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            // navigate('/login');
        }, 2000);
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs').then((response) => {
            console.log("response : ", response);
            const rid = localStorage.getItem('rid');
            
            const rjobs =  response?.data?.job && response?.data?.job.map((item) => {
                // console.log("False : ", item);
                // console.log("RID : ", rid)
                if(item.recruiterId === rid){
                    // console.log("True : ", item);
                    return item;
                }
            })
            // console.log(" r jobs : ",rjobs)
            setJobs(rjobs);

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

    let co = 1;

    return (
        <>
            {showAlert && (
                <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                    Job Deleted Successfully.
                </SweetAlert>
            )}
            <Navbar type={1} tab={8} notification={notification} />
            <div className='w-100 mt-5'>
                <Container>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Job Type</th>
                                <th>Qualifications</th>
                                <th>Location</th>
                                <th>Salary</th>
                                <th>Date</th>
                                {/* <th>Status</th> */}
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs && jobs.map((job, index) => (
                                job && (
                                    <tr>
                                        <td>{co++}</td>
                                        <td>{job?.jobName}</td>
                                        <td>{job?.jobType}</td>
                                        <td>{job?.qualificationsReq}</td>
                                        <td>{job?.city}</td>
                                        <td>{job?.minSalary} - {job?.maxSalary}</td>
                                        <td>{job?.datee}</td>
                                        {/* <td><button className='btn btn-warning'>Unactive</button></td> */}
                                        <td><button className='btn btn-info px-4' onClick={() => navigate(`/recuriter/editjob/${job?._id}`)}>Edit</button></td>
                                        <td><button className='btn btn-danger' onClick={() => deleteJob(job?._id)}>Delete</button></td>                                    
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    )
}