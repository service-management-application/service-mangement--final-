import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProfile() {
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const storedAdminData = localStorage.getItem("adminData");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  const handleEditClick = () => {
    if (isEditable) {
      // Save changes to localStorage
      localStorage.setItem("adminData", JSON.stringify(adminData));

      // Show success toast
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 2000, // Auto close after 2 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      // Refresh the page after a short delay to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 2100); // Slightly longer than the toast duration
    }
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer />
      <div className="d-flex">
        <Sidebar />
        <div className="main-content w-100">
          <AdminNavbar />
          <Link to="/admin/Management" type="button" className="btn btn-link mt-3">
            Go Back
          </Link>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="container rounded bg-white">
              <div className="row">
                <div className="col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img
                      className="rounded-circle mt-5"
                      width="150px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="Profile"
                    />
                    <span className="font-weight-bold">{adminData.firstName}</span>
                    <span className="text-black-50">{adminData.email}</span>
                  </div>
                </div>
                <div className="col-md-6 border-right">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Profile Settings</h4>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="labels">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          name="firstName"
                          value={adminData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditable}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          name="lastName"
                          value={adminData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditable}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          name="email"
                          value={adminData.email}
                          onChange={handleInputChange}
                          disabled={!isEditable}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          name="password"
                          value={adminData.password}
                          onChange={handleInputChange}
                          disabled={!isEditable}
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button
                        className={`btn ${isEditable ? "btn-success" : "btn-primary"}`}
                        type="button"
                        onClick={handleEditClick}
                      >
                        {isEditable ? "Save Changes" : "Edit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
