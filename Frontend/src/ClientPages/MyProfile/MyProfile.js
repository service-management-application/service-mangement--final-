import React from "react";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
export default function MyProfile() {
  return (
    <div>
      <Navbar />
      <div className="container-xl px-4 mt-4">
        {/* Account page navigation */}
        <nav className="nav nav-borders">
          <Link to="/">Go back</Link>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            {/* Profile picture card */}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {/* Profile picture image */}
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
                {/* Profile picture help block */}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* Profile picture upload button */}
                <button className="btn btn-primary" type="button">
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            {/* Account details card */}
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  {/* Form Group (username) */}
                  {/* <div className="mb-3">
                    <label className="small mb-1" for="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      value="username"
                    />
                  </div> */}

                  {/* Form Row */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (first name) */}
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        value="Valerie"
                      />
                    </div>
                    {/* Form Group (last name) */}
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        value="Luna"
                      />
                    </div>
                  </div>
                  {/* Form Row */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (organization name) */}
                    {/* <div className="col-md-6">
                      <label className="small mb-1" for="inputOrgName">
                        Organization name
                      </label>
                      <input
                        className="form-control"
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your organization name"
                        value="Start Bootstrap"
                      />
                    </div> */}
                    {/* Form Group (location) */}
                    {/* <div className="col-md-6">
                      <label className="small mb-1" for="inputLocation">
                        Location
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        value="San Francisco, CA"
                      />
                    </div> */}
                  </div>
                  {/* Form Group (email address) */}
                  <div className="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      value="name@example.com"
                    />
                  </div>
                  {/* Row */}
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputPhone">
                        PAssword
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="password"
                        placeholder="Enter your phone number"
                        value="555-123-4567"
                      />
                    </div>
                    {/* <div className="col-md-6">
                      <label className="small mb-1" for="inputBirthday">
                        Birthday
                      </label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        value="06/10/1988"
                      />
                    </div> */}
                  </div>
                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
