import React, { useState } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";

export default function ProvidersManagement() {
  const [showForm, setShowForm] = useState(false);
  const [providerData, setProviderData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    profession: "Electrician", // Default to "Electrician"
    email: "",
    phone: "",
    password: "", // Add password field
  });

  const [providers, setProviders] = useState([]); // To store the list of providers

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProviderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (Add/Update)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (providerData.id) {
      // Update existing provider
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === providerData.id ? { ...providerData } : provider
        )
      );
    } else {
      // Add new provider
      setProviders((prevProviders) => [
        ...prevProviders,
        { ...providerData, id: Date.now() }, // Using current timestamp as ID for simplicity
      ]);
    }
    setShowForm(false); // Hide form after submission
    setProviderData({
      id: null,
      firstname: "",
      lastname: "",
      profession: "Electrician", // Reset to default value
      email: "",
      phone: "",
      password: "", // Reset password field
    }); // Clear the form
  };

  // Handle update (pre-fill form with selected provider's data)
  const handleUpdate = (provider) => {
    setProviderData(provider);
    setShowForm(true);
  };

  // Handle delete provider
  const handleDelete = (id) => {
    setProviders((prevProviders) =>
      prevProviders.filter((provider) => provider.id !== id)
    );
  };

  return (
    <div>
      <div>
        <div className="d-flex">
          <Sidebar />
          <div className="main-content w-100">
            <AdminNavbar />
            <br />
            <div className="container py-4">
              <Link to="/admin/Management" type="button" className="btn btn-link">
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
              <div className="row mb-4">
                <div className="table-container px-3">
                  <table className="table table-hover table-bordered w-100">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Profession</th> {/* Corrected column name */}
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider) => (
                        <tr key={provider.id}>
                          <th scope="row">{provider.id}</th>
                          <td>{provider.firstname}</td>
                          <td>{provider.lastname}</td>
                          <td>{provider.phone}</td>
                          <td>{provider.profession}</td> {/* Display profession */}
                          <td>{provider.email}</td>
                          <td>{provider.password}</td>
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
                              onClick={() => handleDelete(provider.id)}
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
                      name="profession"
                      value={providerData.profession}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Painter">Painter</option>
                      <option value="Mason">Mason</option>
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
                  <button type="submit" className="btn btn-success mt-3">
                    {providerData.id ? "Update" : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
