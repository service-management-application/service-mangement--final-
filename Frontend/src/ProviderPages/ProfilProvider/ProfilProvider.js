import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";

export default function ProfilProvider() {
  const [providerData, setProviderData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    // Fetch provider data from local storage
    const storedData = localStorage.getItem("providerData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProviderData(parsedData);
      setEditableData(parsedData); // Initialize editable data
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setProviderData(editableData);
    localStorage.setItem("providerData", JSON.stringify(editableData));
    setIsEditing(false);
  };

  if (!providerData) {
    return <div>Loading...</div>; // Handle loading or empty state
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                 
                  <div className="d-flex justify-content-center">
                    <Link to="/client/ClientMessanger" className="btn btn-primary">
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {[
                    { label: "First Name", key: "firstName" },
                    { label: "Last Name", key: "lastName" },
                    { label: "Email", key: "email" },
                    { label: "Phone", key: "phoneNumber" },
                    { label: "Profession", key: "category" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{label}</p>
                        </div>
                        <div className="col-sm-9">
                          {isEditing ? (
                            <input
                              type="text"
                              name={key}
                              value={editableData[key]}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            <p className="text-muted mb-0">{providerData[key]}</p>
                          )}
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                  <div className="d-flex justify-content-end mt-3">
                    {isEditing ? (
                      <button className="btn btn-success" onClick={handleSaveChanges}>
                        Save Changes
                      </button>
                    ) : (
                      <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
