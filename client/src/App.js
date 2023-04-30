import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup';
import RecuriterSignup from './pages/RecuriterSignup';
import Login from './pages/Login';
import RecruiterDashboard from './pages/RecuriterDashboard';
import PostJob from './pages/PostJob';
import RecuriterJobs from './pages/RecuriterJobs';
import EditJob from './pages/EditJob';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import JobseekerPerposals from './pages/JobSeekerPerposals';
import RecuriterPerposals from './pages/RecuriterPerposals';
import ChatPage from './pages/ChatPage';
import JobSeekers from './pages/JobSeekers';
import JSChatPage from './pages/JSChatPage';
import UpdateJS from './pages/UpdateJS';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import ListOfSeekers from './pages/ListOfSeekers';
import ListOfRecs from './pages/ListOfRecs';
import ContactUs from './pages/ContactUs';
import MessageList from './pages/MessageList';
import Profile2 from './pages/Profile2';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notification, setNotification] = useState(null);
  const [notification2, setNotification2] = useState(null);



  useEffect(() => {
  const jsidd = localStorage.getItem('rid');


  const interval = setInterval(() => {
      if(jsidd){
          axios.get(`http://localhost:5000/api/all-chats/${jsidd}`).then((res) => {
            console.log("Response Get All Chats : ", res);
            const dummy = res?.data?.chats;          
            let countNot = 0;
            for(let i = 0; i < dummy?.length; i++){
              const val = checkDeliveredMsg(dummy[i]?.messages);
              countNot = countNot + val;
              console.log("Val : ", val);
            }
            console.log("Count ", countNot);
            setNotification(countNot);
          }).catch((err) => {
            console.log("Error Get All Chats : ", err);
          });
      }

  }, 3000);

  return () => clearInterval(interval);

}, [])

  useEffect(() => {
  
  const job_id = localStorage.getItem('job_id');

  const interval = setInterval(() => {


    if(job_id){
        axios.get(`http://localhost:5000/api/all-chats/${job_id}`).then((res) => {
          console.log("Response Get All Chats : ", res);
          const dummy = res?.data?.chats;          
          let countNot2 = 0;
          for(let i = 0; i < dummy?.length; i++){
            const val = checkDeliveredMsg2(dummy[i]?.messages);
            countNot2 = countNot2 + val;
            console.log("Val : ", val);
          }
          console.log("Count ", countNot2);
          setNotification2(countNot2);
        }).catch((err) => {
          console.log("Error Get All Chats : ", err);
        });
    }

  }, 3000);

  return () => clearInterval(interval);

}, [])




  function checkDeliveredMsg (messages) {
      let count = 0;
      for(let i = 0; i < messages?.length; i++){
          if(messages[i]?.status === "send"){
              count = count + 1;
          }
      }
      console.log("Count : ", count);
      // setNotification(count);
      return count;
  }

  function checkDeliveredMsg2 (messages) {
      let count = 0;
      for(let i = 0; i < messages?.length; i++){
          if(messages[i]?.status === "delivered"){
              count = count + 1;
          }
      }
      console.log("Count notification 2 : ", count);
      // setNotification(count);
      return count;
  }
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home notification2={notification2} />} />
        <Route path='/jobs' element={<Jobs notification2={notification2} />} />
        <Route path='/jobseeker/chat' element={<JSChatPage notification2={notification2} />} />
        <Route path='/updatebio' element={<UpdateJS notification2={notification2} />} />
        <Route path='/chat' element={<ChatPage notification={notification} />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/profile/:id' element={<Profile notification={notification} />} />
        <Route path='/jobseeker/profile/:id' element={<Profile2 notification2={notification2} />} />

        <Route path='/perposals' element={<JobseekerPerposals notification2={notification2} />} />
        <Route path='/job/:id' element={<JobDetail notification2={notification2} />} />
        <Route path='/signup/jobseeker' element={<SignUp />} />
        <Route path='/signup/recuriter' element={<RecuriterSignup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/super/admin/login' element={<AdminLogin />} />
        <Route path='/super/admin/jobseekers' element={<ListOfSeekers />} />
        <Route path='/super/admin/recruiters' element={<ListOfRecs />} />
        <Route path='/super/admin/messages' element={<MessageList />} />

        <Route path='/recuriter/dashboard' element={<RecruiterDashboard />} />
        <Route path='/recuriter/postjob' element={<PostJob notification={notification} />} />
        <Route path='/recuriter/jobs' element={<RecuriterJobs notification={notification} />} />
        <Route path='/recuriter/jobseekers' element={<JobSeekers notification={notification} />} />
        <Route path='/recuriter/perposals' element={<RecuriterPerposals notification={notification} />} />
        <Route path='/recuriter/editjob/:id' element={<EditJob notification={notification} />} />
      </Routes>
    </>
  );
}

export default App;
