import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginProvider = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/authProvider/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, provider } = response.data;

        localStorage.setItem("providerToken", token); 
        localStorage.setItem("providerData", JSON.stringify(provider)); 
        toast.success("Login successful!");
        navigate("/ProviderHome");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <section>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "hsl(0, 0%, 96%)",
            minHeight: "100vh",
            padding: "50px 0",
          }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  LOG <span className="text-primary">IN</span>
                </h1>
              </div>
              <div className="col-lg-6 mb-5">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign in
                      </button>
                    </form>
                    <h6>
                      Don't have an account yet?
                      <Link to="/RegisterProvider" style={{ textDecoration: "none" }}>
                        Sign up here
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-right" autoClose={8000} />
        </div>
      </section>
    </>
  );
};

export default LoginProvider;
