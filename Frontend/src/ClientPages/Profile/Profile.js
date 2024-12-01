import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ProfilePage() {
  const [clientData, setClientData] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobRequest, setJobRequest] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [showHistory, setShowHistory] = useState(false);
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("clientData"));
        if (data) {
          setClientData(data);
          setNewAddress(data.address || "");
          setNewPhone(data.phone || "");
          setNewEmail(data.email || "");
        }

        const clientId = data?._id;
        if (clientId) {
          const response = await axios.get(
            `http://localhost:4000/services/client/${clientId}`
          );
          setJobHistory(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    if (
      newAddress.trim() ||
      newPhone.trim() ||
      newEmail.trim() ||
      newPassword.trim() ||
      clientData.firstName ||
      clientData.lastName
    ) {
      const updatedData = {
        ...clientData,
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        address: newAddress,
        phone: newPhone,
        email: newEmail,
        password: newPassword,
      };

      setClientData(updatedData);
      localStorage.setItem("clientData", JSON.stringify(updatedData));

      try {
        const response = await axios.put(
          `http://localhost:4000/clients/update/${clientData.id}`,
          updatedData
        );
        if (response.status === 200) {
          toast.success("Profile updated successfully!");
          window.location.reload();
        }
      } catch (err) {
        console.error("Error updating profile:", err);
        toast.error("Error updating profile. Please try again.");
      }
    }
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      handleSaveChanges();
    }
    setIsEditMode(!isEditMode);
  };

  const handleJobRequestChange = (e) => {
    const { name, value } = e.target;
    setJobRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      const clientData = JSON.parse(localStorage.getItem("clientData"));

      if (!clientData || !clientData.id) {
        toast.error("Client information is missing. Please log in again.");
        return;
      }

      const requestData = {
        title: jobRequest.title,
        date: jobRequest.date,
        description: jobRequest.description,
        Client: clientData.id,
      };

      const response = await axios.post(
        "http://localhost:4000/services/create",
        requestData
      );

      if (response.status === 201) {
        toast.success("Job request submitted successfully!");
        setJobRequest({ title: "", date: "", description: "" });
        setShowJobForm(false);
        setJobHistory((prev) => [...prev, response.data.service]);
      }
    } catch (err) {
      console.error("Error submitting job request:", err);
      toast.error("Error submitting job request. Please check your input.");
    }
  };






  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/services/delete/${jobId}`
      );
      if (response.status === 200) {
        toast.success("Job deleted successfully!");
        // Remove deleted job from the history
        setJobHistory((prev) => prev.filter((job) => job._id !== jobId));
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete the job. Please try again.");
    }
  };

  const toggleHistory = async () => {
    if (!showHistory) {
      try {
        const response = await axios.get(
          `http://localhost:4000/services/client/${clientData.id}`
        );
        if (response.status === 200) {
          setJobHistory(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching job history:", err);
        toast.error("Failed to load job history. Please try again.");
      }
    }
    setShowHistory((prev) => !prev);
  };

  if (!clientData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-light rounded-3 p-3">
                  <li className="breadcrumb-item active" aria-current="page">
                    Client Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <img
                    src={
                      clientData.image ||
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowJobForm((prev) => !prev)}
                    >
                      {showJobForm ? "Close Job Request Form" : "Request a Job"}
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-secondary"
                      onClick={toggleHistory}
                    >
                      {showHistory ? "Close History" : "Jobs History"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {["firstName", "lastName", "email", "password"].map(
                    (field) => (
                      <React.Fragment key={field}>
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">
                              {field === "firstName"
                                ? "First Name"
                                : field === "lastName"
                                ? "Last Name"
                                : field === "email"
                                ? "Email"
                                : "Password"}
                            </p>
                          </div>
                          <div className="col-sm-9">
                            {isEditMode &&
                            field !== "email" &&
                            field !== "password" ? (
                              <input
                                type="text"
                                className="form-control"
                                value={clientData[field]}
                                onChange={(e) =>
                                  setClientData((prev) => ({
                                    ...prev,
                                    [field]: e.target.value,
                                  }))
                                }
                              />
                            ) : field === "email" && isEditMode ? (
                              <input
                                type="email"
                                className="form-control"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                              />
                            ) : field === "password" && isEditMode ? (
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            ) : (
                              <p className="text-muted mb-0">
                                {field === "password"
                                  ? "••••••••"
                                  : clientData[field]}
                              </p>
                            )}
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    )
                  )}

                  {["address", "phone"].map((field) => (
                    <React.Fragment key={field}>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">
                            {field === "address" ? "Address" : "Phone"}
                          </p>
                        </div>
                        <div className="col-sm-9">
                          {isEditMode ? (
                            <input
                              type={field === "phone" ? "tel" : "text"}
                              className="form-control"
                              value={
                                field === "address" ? newAddress : newPhone
                              }
                              onChange={(e) =>
                                field === "address"
                                  ? setNewAddress(e.target.value)
                                  : setNewPhone(e.target.value)
                              }
                            />
                          ) : (
                            <p className="text-muted mb-0">
                              {clientData[field]}
                            </p>
                          )}
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      onClick={toggleEditMode}
                      className="btn btn-warning"
                    >
                      {isEditMode ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showJobForm && (
            <div className="row mt-3">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5>Submit a Job Request</h5>
                    <form onSubmit={handleJobRequestSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Job Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={jobRequest.title}
                          onChange={handleJobRequestChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={jobRequest.date}
                          onChange={handleJobRequestChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          rows="3"
                          value={jobRequest.description}
                          onChange={handleJobRequestChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showHistory && (
            <div className="row mt-3">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5>Job History</h5>
                    {jobHistory.length > 0 ? (
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobHistory.map((job) => (
                            <tr key={job._id}>
                              <th scope="row" hidden>
                                {job._id}{" "}
                              </th>

                              <td>{job.title}</td>
                              <td>{new Date(job.date).toLocaleDateString()}</td>
                              <td>{job.description}</td>
                              <td>

                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(job._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No job history found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}
