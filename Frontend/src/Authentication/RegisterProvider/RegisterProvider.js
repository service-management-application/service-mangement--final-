import React from "react";
import { Link } from "react-router-dom";

export default function RegisterProvider() {
  return (
    <div>
      <section>
        {/* Jumbotron */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "hsl(0, 0%, 96%)",
            minHeight: "100vh",
            margin: 0,
            padding: "50px 0",
          }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Sign up as <br />
                  <span className="text-primary">service provider</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}></p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>
                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1"
                              className="form-control"
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example2"
                              className="form-control"
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example2"
                            >
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example3"
                              className="form-control"
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              Phone number
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example4"
                              className="form-control"
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example2"
                            >
                              State
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example5"
                          className="form-control"
                          required
                        />
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                      </div>

                      {/* Password input */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example"
                          className="form-control"
                          required
                        />
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                      </div>

                      {/* Submit button */}
                      <Link to="/login">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                        >
                          Sign up
                        </button>
                      </Link>
                    </form>

                    <h6>
                      Already have an account?
                      <Link to="/Login" style={{ textDecoration: "none" }}>
                        {" "}
                        Log in
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Jumbotron */}
      </section>
    </div>
  );
}
