import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProvidersManagement() {
  const [showForm, setShowForm] = useState(false);
  const [providerData, setProviderData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    category: "",
    email: "",
    phone: "",
    password: "",
    state: "", // Add the state field here
  });

  const [providers, setProviders] = useState([]); // List of providers
  const [categories, setCategories] = useState([]); // List of categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PROVIDERS_API_URL = "https://service-mangement-final-rxc3.onrender.com/providers";
  const CATEGORIES_API_URL = "https://service-mangement-final-rxc3.onrender.com/categories";

  // Fetch providers and categories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [providersResponse, categoriesResponse] = await Promise.all([
          axios.get(`${PROVIDERS_API_URL}/getall`),
          axios.get(`${CATEGORIES_API_URL}/getall`),
        ]);

        // Set providers with populated category data
        setProviders(providersResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data from the server.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProviderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (Add/Update provider)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: providerData.firstname,
      lastName: providerData.lastname,
      email: providerData.email,
      phoneNumber: providerData.phone,
      password: providerData.password,
      category: providerData.category,
      state: providerData.state, // Add the state field to the form data
    };

    try {
      if (providerData.id) {
        // Update provider
        await axios.put(
          `${PROVIDERS_API_URL}/update/${providerData.id}`,
          formData
        );
        setProviders((prevProviders) =>
          prevProviders.map((provider) =>
            provider._id === providerData.id
              ? { ...formData, _id: providerData.id }
              : provider
          )
        );
      } else {
        // Create new provider
        const response = await axios.post(
          `${PROVIDERS_API_URL}/register`,
          formData
        );
        setProviders((prevProviders) => [...prevProviders, response.data]);
      }

      setShowForm(false);
      setProviderData({
        id: null,
        firstname: "",
        lastname: "",
        category: "",
        email: "",
        phone: "",
        password: "",
        state: "", // Reset the state field
      });
    } catch (err) {
      setError("Failed to save provider.");
    }
  };

  // Handle delete provider
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${PROVIDERS_API_URL}/delete/${id}`);
      setProviders((prevProviders) =>
        prevProviders.filter((provider) => provider._id !== id)
      );
    } catch (err) {
      setError("Failed to delete provider.");
    }
  };

  // Handle update (pre-fill form with selected provider's data)
  const handleUpdate = (provider) => {
    setProviderData({
      id: provider._id,
      firstname: provider.firstName,
      lastname: provider.lastName,
      category: provider.category?._id || "",
      email: provider.email,
      phone: provider.phoneNumber,
      password: provider.password,
      state: provider.state || "", // Add state field for update
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="main-content w-100">
          <AdminNavbar />
          <br />
          <div className="container py-4">
            <Link to="/admin/Management" className="btn btn-link">
              Go Back
            </Link>
            <br />
            <br />

            <button
              className="btn btn-primary mb-3"
              type="button"
              onClick={() => setShowForm(!showForm)}
            >
              Add Provider
            </button>
            <h2 className="text-center">Providers Data</h2>
            <br />

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="row mb-4">
                <div className="table-container px-3">
                  <table className="table table-hover table-bordered w-100">
                    <thead>
                      <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Profession</th>
                        <th scope="col">Email</th>
                        <th scope="col">State</th> {/* Add state column */}
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider) => (
                        <tr key={provider._id}>
                          <td>{provider.firstName}</td>
                          <td>{provider.lastName}</td>
                          <td>{provider.phoneNumber}</td>
                          <td>{provider.category?.title || "N/A"}</td>
                          <td>{provider.email}</td>
                          <td>{provider.state}</td> {/* Display state */}
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-primary mx-3"
                              onClick={() => handleUpdate(provider)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(provider._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="form-group mt-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={providerData.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={providerData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={providerData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Profession</label>
                  <select
                    className="form-control"
                    name="category"
                    value={providerData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={providerData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={providerData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>State</label> {/* Add state input */}
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={providerData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success mt-3">
                  {providerData.id ? "Update" : "Register"} Provider
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
