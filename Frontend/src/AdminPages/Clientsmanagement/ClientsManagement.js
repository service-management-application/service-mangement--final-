import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ClientsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [clientData, setClientData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [clients, setClients] = useState([]); // Fetch from backend
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  const API_BASE_URL = "https://service-mangement-final-rxc3.onrender.com/clients"; // Replace with actual API endpoint

  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getall`);
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch clients.");
        setLoading(false);
      }
    };
    fetchClients();
  }, [clients]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: clientData.firstname, // Update to firstName
      lastName: clientData.lastname,   // Update to lastName
      email: clientData.email,
      password: clientData.password,
    };
    

    try {
      if (clientData._id) {
        // Update client
        await axios.put(`${API_BASE_URL}/update/${clientData._id}`, formData);
        setClients((prevClients) =>
          prevClients.map((client) =>
            client._id === clientData._id ? { ...clientData } : client
          )
        );
      } else {
        // Create new client
        const response = await axios.post(`${API_BASE_URL}/register`, formData);
        setClients((prevClients) => [...prevClients, response.data]);
      }

      setShowForm(false);
      setClientData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError("Failed to save client.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== id)
      );
    } catch (err) {
      setError("Failed to delete client.");
    }
  };

  // Handle update selection
  const handleUpdate = (client) => {
    setClientData(client);
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
              Add Client
            </button>
            <h2 className="text-center">Clients Data</h2>
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
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client._id}>
                          <th scope="row" hidden>{client._id}</th>
                          <td>{client.firstName}</td>{" "}
                          {/* Update to firstName */}
                          <td>{client.lastName}</td> {/* Update to lastName */}
                          <td>{client.email}</td>
                          {/* Note: Storing password directly is insecure */}
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
                              onClick={() => handleDelete(client._id)}
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
                    value={clientData.firstName}
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
                    value={clientData.lastName}
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
                  {clientData._id ? "Update" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
