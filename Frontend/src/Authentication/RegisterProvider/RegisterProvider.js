import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios by running `npm install axios`
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register_Provider() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    state: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/authProvider/register', formData);
      toast.success('Registration successful!'); //< Success toast
      console.log('Server response:', response.data);
      // Redirect or clear form if needed
    } catch (error) {
      console.error('There was an error registering the user:', error.response.data);
      toast.error('Registration failed. Please try again.'); // Failure toast
    }
  };

  return (
    <div>
      <section>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "hsl(0, 0%, 96%)",
            minHeight: "100vh",
            margin: 0,
            padding: "50px 0",
          }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Sign up as <br />
                  <span className="text-primary">service provider</span>
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      {/* Form fields */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="firstName"
                              className="form-control"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="firstName">
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="lastName"
                              className="form-control"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="lastName">
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="phoneNumber"
                              className="form-control"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="phoneNumber">
                              Phone number
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="state"
                              className="form-control"
                              value={formData.state}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="state">
                              State
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleChange}>
                        Sign up
                      </button>
                    </form>

                    <h6>
                      Already have an account?
                      <Link to="/LoginProvider" style={{ textDecoration: "none" }}>
                        {" "}
                        Log in
                      </Link>
                    </h6>
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