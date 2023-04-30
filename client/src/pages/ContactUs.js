import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import SweetAlert from 'react-bootstrap-sweetalert';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showAlert, setShowAlert] = useState(null);

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
        setShowAlert(false);
    }, 3000)
  }

  const { name, email, subject, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(formData);

      const res = await axios.post('http://localhost:5000/api/contact', body, config);

      handleAlert();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    //   alert(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <>
        {showAlert && (
            <SweetAlert success title="congratulations" confirmBtnText="Ok"  onConfirm={() => setShowAlert(false)} onCancel={() => setShowAlert(false)}>
                Message Send Successfully.
            </SweetAlert>
        )}
        <Navbar tab={3} />
        <div className="container pb-5 mb-5">
        <div className="row pb-5 mb-5">
            <div className="col-md-6 offset-md-3">
            <h1 className="mt-4 mb-4 pt-3">Contact Us</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => onChange(e)}
                    rows="5"
                    required
                ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-4 px-4">
                Submit
                </button>
            </form>
            </div>
        </div>
        </div>
    </>
  );
};

export default ContactUs;
