import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";

export default function ProfilePage() {
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
                    Provier Profile
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
                  <p className="text-muted mb-1">Name</p>
                  <p className="text-muted mb-4">@</p>
                  <div className="d-flex justify-content-center">
                    <Link to="/client/ClientMessanger" className="btn btn-primary">
                      Message
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="card mt-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <i className="fas fa-globe text-warning"></i>
                    <span>https://mdbootstrap.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <i className="fab fa-github" style={{ color: "#333" }}></i>
                    <span>mdbootstrap</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <i
                      className="fab fa-twitter"
                      style={{ color: "#55acee" }}
                    ></i>
                    <span>@mdbootstrap</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <i
                      className="fab fa-instagram"
                      style={{ color: "#ac2bac" }}
                    ></i>
                    <span>mdbootstrap</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <i
                      className="fab fa-facebook"
                      style={{ color: "#3b5998" }}
                    ></i>
                    <span>mdbootstrap</span>
                  </li>
                </ul>
              </div> */}
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Johnatan Smith</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Johnatan Smith</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">example@example.com</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(097) 234-5678</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Profession</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Mecanical</p>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        Bay Area, San Francisco, CA
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Availability</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          Description
                        </span>
                        <br />
                        <br />
                        this is a description of the provider
                      </p>
                      {/* Add project progress details or other content here */}
                    </div>
                  </div>
                </div>
                {/* Add more cards if needed */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
