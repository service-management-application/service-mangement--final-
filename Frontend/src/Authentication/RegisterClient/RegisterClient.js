import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterClient() {
  const navigate = useNavigate();
  
  // State to store form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being sent:", formData);  // Log data being sent

    try {
      // Send POST request to backend
      const response = await axios.post(
        'http://localhost:4000/authClient/register',
        formData,
        { withCredentials: true } // Include credentials
      );
      
      // Check if the registration is successful
      if (response.status === 201) {
        toast.success('Registration successful!'); //< Success toast
        setTimeout(() => {
          navigate('/loginClient');  // Redirect to login page after success
        }, 2000); // Delay to allow user to see the success toast
      } else {
        setErrorMessage('Registration failed. Please try again.');  // In case the backend does not return 201
        toast.error('Registration failed. Please try again.'); // Failure toast
      }
    } catch (error) {
      console.error('Error registering:', error);
      setErrorMessage(error.response ? error.response.data.message : 'Registration failed. Please try again.');  // More detailed error message
      toast.error(error.response ? error.response.data.message : 'Registration failed. Please try again.'); // Failure toast
    }
  };

  return (
    <div>
      <section>
        <div className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'hsl(0, 0%, 96%)',
            minHeight: '100vh',
            margin: 0,
            padding: '50px 0'
          }}>
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Sign up as <br />
                  <span className="text-primary">client</span>
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      {/* First and Last Names */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                            <label className="form-label" htmlFor="firstName">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                            <label className="form-label" htmlFor="lastName">Last name</label>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        <label className="form-label" htmlFor="email">Email address</label>
                      </div>

                      {/* Password */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>

                      {/* Submit button */}
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign up
                      </button>
                    </form>
                    <h6>Already have an account? <Link to="/LoginClient" style={{ textDecoration: 'none' }}>Log in</Link></h6>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Show error message */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Container for notifications */}
      <ToastContainer
      position='bottom-right' 
      autoClose={8000}/>
    </div>
  );
}