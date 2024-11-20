import React, { useState } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";

export default function ClientsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [clientData, setClientData] = useState({
    id: null,
    image: null,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "", // Add password field
  });

  const [clients, setClients] = useState([]); // To store the list of clients

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image input change (you can choose to handle images as you need)
  const handleImageChange = (e) => {
    setClientData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Handle form submit (Add/Update)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (clientData.id) {
      // Update existing client
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientData.id ? { ...clientData } : client
        )
      );
    } else {
      // Add new client
      setClients((prevClients) => [
        ...prevClients,
        { ...clientData, id: Date.now() }, // using current timestamp as ID for simplicity
      ]);
    }
    setShowForm(false); // Hide form after submission
    setClientData({
      id: null,
      image: null,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "", // Reset password field
    }); // Clear the form
  };

  // Handle update (pre-fill form with selected client's data)
  const handleUpdate = (client) => {
    setClientData(client);
    setShowForm(true);
  };

  // Handle delete client
  const handleDelete = (id) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
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
                Add Client
              </button>
              <h2 className="text-center">Clients Data</h2>
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
                        <th scope="col">Email</th>
                        <th scope="col">Password</th> {/* New Password Column */}
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id}>
                          <th scope="row">{client.id}</th>
                          <td>{client.firstname}</td>
                          <td>{client.lastname}</td>
                          <td>{client.phone}</td>
                          <td>{client.email}</td>
                          <td>{client.password}</td> {/* Display password in table */}
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-primary mx-3"
                              onClick={() => handleUpdate(client)}
                            >
                              Update
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(client.id)}
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
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={clientData.firstname}
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
                      value={clientData.lastname}
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
                      value={clientData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={clientData.email}
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
                      value={clientData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-3">
                    {clientData.id ? "Update" : "Submit"}
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
