import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register_Provider() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    state: '',
    email: '',
    password: '',
    activity_description: '',
    price: '',
    category: ''
  });
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Fetch categories from the backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://service-mangement-final.onrender.com/categories/getall'); // Adjust the endpoint if necessary
        setCategories(response.data); // Set the categories in the state
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []); // Empty array ensures this runs once on mount

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true to show loading state
    try {
      const response = await axios.post('https://service-mangement-final.onrender.com/providers/register', formData);
      toast.success('Registration successful!');
      console.log('Server response:', response.data);
      // Optionally clear the form after success
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        state: '',
        email: '',
        password: '',
        activity_description: '',
        price: '',
        category: ''
      });
    } catch (error) {
      console.error('Error registering the user:', error.response?.data || error.message);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false
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

                      {/* Dropdown for categories */}
                      <div className="form-outline mb-4">
                        <select
                          id="category"
                          className="form-select"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.title}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading categories...</option>
                          )}
                        </select>
                        <label className="form-label" htmlFor="category">
                          Category
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="activity_description"
                          className="form-control"
                          value={formData.activity_description}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="activity_description">
                          Description
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          id="price"
                          className="form-control"
                          value={formData.price}
                          onChange={handleChange}
                          
                        />
                        <label className="form-label" htmlFor="price">
                          Price/HR (facultatif)
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-primary btn-block mb-4" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign up'}
                      </button>
                    </form>

                    <h6>
                      Already have an account?
                      <Link to="/loginProvider" style={{ textDecoration: "none" }}>
                        {" "} Log in
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
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}
