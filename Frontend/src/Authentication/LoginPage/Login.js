import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      {/* Section: Design Block */}
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
                  LOG
                  <span className="text-primary">IN</span>
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>


                      {/* Email input */}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                      </div>

                      {/* Password input */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                      </div>

                      {/* Submit button */}
                      <Link to="/">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign in
                      </button>
                      </Link>
                    </form>

                    <h6>
                      Don't have an account yet?
                      <Link to="/Join" style={{ textDecoration: "none" }}>
                        {" "}
                        Sign up here
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
      {/* Section: Design Block */}
    </>
  );
};

export default Login;
