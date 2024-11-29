import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const [clientData, setClientData] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch client data from localStorage on initial render
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("clientData"));
    if (data) {
      setClientData(data);
      setNewAddress(data.address || "");
      setNewPhone(data.phone || "");
    }
  }, []);

  // Function to update the address and phone in localStorage
  const handleSaveChanges = () => {
    if (newAddress.trim() !== "" || newPhone.trim() !== "") {
      const updatedData = { ...clientData, address: newAddress, phone: newPhone };
      setClientData(updatedData);
      localStorage.setItem("clientData", JSON.stringify(updatedData));
      setUpdateSuccess(true); // Indicating success
      toast.success("Profile updated successfully!"); // Display success toast
    }
  };

  // Toggle between edit and view mode
  const toggleEditMode = () => {
    if (isEditMode) {
      // Save changes when exiting edit mode
      handleSaveChanges();
    }
    setIsEditMode(!isEditMode);
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
                  <li className="breadcrumb-item">
                    <Link to="/client/ProfilesListInCat">Go Back</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Provider Profile
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
                  <div>Discuss here</div>
                  <div className="d-flex justify-content-center">
                    <Link to="/client/ClientMessanger" className="btn btn-primary">
                      Messagerie
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditMode ? (
                        <input
                          type="text"
                          className="form-control"
                          value={clientData.firstName}
                          onChange={(e) => setClientData({ ...clientData, firstName: e.target.value })}
                        />
                      ) : (
                        <p className="text-muted mb-0">{clientData.firstName}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Name</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditMode ? (
                        <input
                          type="text"
                          className="form-control"
                          value={clientData.lastName}
                          onChange={(e) => setClientData({ ...clientData, lastName: e.target.value })}
                        />
                      ) : (
                        <p className="text-muted mb-0">{clientData.lastName}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{clientData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditMode ? (
                        <input
                          type="text"
                          className="form-control"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                        />
                      ) : (
                        <p className="text-muted mb-0">{clientData.address}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditMode ? (
                        <input
                          type="tel"
                          className="form-control"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                        />
                      ) : (
                        <p className="text-muted mb-0">{clientData.phone}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button onClick={toggleEditMode} className="btn btn-success">
                  {isEditMode ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">Description</span>
                        <br />
                        <br />
                        {clientData.description || "This is a description of the provider."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" autoClose={5000}/> {/* Add this to show the toast notifications */}
      
      <Footer />
    </div>
  );
}
