import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ProfilePage() {
  const [clientData, setClientData] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobRequest, setJobRequest] = useState({
    title: "",
    date: "",
    description: "",
  });

  const [showHistory, setShowHistory] = useState(false);
  const [jobHistory, setJobHistory] = useState([]);

  // Fetch client data and job history
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get client data from local storage
        const data = JSON.parse(localStorage.getItem("clientData"));
        if (data) {
          setClientData(data);
          setNewAddress(data.address || "");
          setNewPhone(data.phone || "");
          
          // Fetch job history using the clientId from clientData
          const clientId = data._id;
          if (clientId) {
            const response = await axios.get(`http://localhost:4000/services/client/${clientId}`);
            setJobHistory(response.data || []);
          } else {
            console.error("Client ID is missing in local storage.");
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

// Save profile changes
const handleSaveChanges = () => {
  if (newAddress.trim() || newPhone.trim() || clientData.firstName || clientData.lastName ) {
    // Update the clientData state with the new fields
    const updatedData = {
      ...clientData,
      firstName: clientData.firstName,  // Ensuring first name is retained
      lastName: clientData.lastName,
      address: newAddress,
      phone: newPhone
    };

    // Save the updated data to localStorage
    setClientData(updatedData); // This updates the component state
    localStorage.setItem("clientData", JSON.stringify(updatedData));
    
    toast.success("Profile updated successfully!");
  }
};


  const toggleEditMode = () => {
    if (isEditMode) {
      handleSaveChanges();
    }
    setIsEditMode(!isEditMode);
  };

  // Handle job request form changes
  const handleJobRequestChange = (e) => {
    const { name, value } = e.target;
    setJobRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit job request
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
        Client: clientData.id, // Fix: Use `id` from `clientData`
      };
  
      const response = await axios.post("http://localhost:4000/services/create", requestData);
  
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
  
  

  const toggleHistory = () => {
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
                    src={clientData.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  <div className="d-flex justify-content-center mb-3">
                    <Link to="/client/ClientMessanger" className="btn btn-success">
                      Messagerie
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowJobForm((prev) => !prev)}
                    >
                      {showJobForm ? "Close Job Request Form" : "Request a Job"}
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-secondary" onClick={toggleHistory}>
                      {showHistory ? "Close History" : "Historique"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {["firstName", "lastName", "email"].map((field) => (
                    <React.Fragment key={field}>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{field === "firstName" ? "First Name" : field === "lastName" ? "Last Name" : "Email"}</p>
                        </div>
                        <div className="col-sm-9">
                          {isEditMode && field !== "email" ? (
                            <input
                              type="text"
                              className="form-control"
                              value={clientData[field]}
                              onChange={(e) =>
                                setClientData((prev) => ({ ...prev, [field]: e.target.value }))
                              }
                            />
                          ) : (
                            <p className="text-muted mb-0">{clientData[field]}</p>
                          )}
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}

                  {["address", "phone"].map((field) => (
                    <React.Fragment key={field}>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{field === "address" ? "Address" : "Phone"}</p>
                        </div>
                        <div className="col-sm-9">
                          {isEditMode ? (
                            <input
                              type={field === "phone" ? "tel" : "text"}
                              className="form-control"
                              value={field === "address" ? newAddress : newPhone}
                              onChange={(e) =>
                                field === "address" ? setNewAddress(e.target.value) : setNewPhone(e.target.value)
                              }
                            />
                          ) : (
                            <p className="text-muted mb-0">{clientData[field]}</p>
                          )}
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}

                  <div className="d-flex justify-content-end mt-3">
                    <button onClick={toggleEditMode} className="btn btn-warning">
                      {isEditMode ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showJobForm && (
            <div className="row mt-4">
              <div className="col-lg-8 offset-lg-2">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Request a Job</h4>
                    <form onSubmit={handleJobRequestSubmit}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Request Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="Enter job title"
                          value={jobRequest.title}
                          onChange={handleJobRequestChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          value={jobRequest.date}
                          onChange={handleJobRequestChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Job Description</label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Enter job description"
                          rows="4"
                          value={jobRequest.description}
                          onChange={handleJobRequestChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Request
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showHistory && (
            <div className="mt-4">
              <h4>Job History</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {jobHistory.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.date}</td>
                      <td>{job.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}
