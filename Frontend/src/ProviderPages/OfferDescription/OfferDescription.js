import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios"; // Ensure axios is imported

export default function OfferDescription() {
  const [service, setService] = useState(null); // Use `setService` to store the service data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      const serviceId = localStorage.getItem("selectedServiceId");

      if (!serviceId) {
        setError("No service selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/services/get/${serviceId}` // Correct API endpoint
        );
        setService(response.data);
      } catch (err) {
        console.error("Error fetching service data:", err);
        setError("Failed to load service information.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ProviderNavbar />

      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          {/* Go Back Button */}
          <Link to="/provider/providercategories" className="btn btn-secondary mb-3">
            Go Back
          </Link>

          <div className="row gx-4 gx-lg-5 align-items-center">
            {/* Service Info */}
            <div className="col-md-6">
              <div className="card text-center">
                <div className="card-body">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  <h5 className="card-title">
                    {service.Client.firstName} {service.Client.lastName}
                  </h5>
                </div>
              </div>
            </div>

            {/* Offer Details */}
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">Offer Details</h1>

              <div className="card mb-4">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>
                      <strong>Email: </strong> {service.Client.email}
                    </li>
                    <li>
                      <strong>Price: </strong> {service.price} $ {/* Example price */}
                    </li>
                    <li>
                      <strong>Location: </strong> {service.state} {/* Example location */}
                    </li>
                    <li>
                      <strong>Description: </strong> {service.description}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Client Button */}
              <div className="d-flex">
                <Link
                  className="btn btn-outline-dark flex-shrink-0"
                  to="/provider/Providermessanger"
                >
                  <i className="bi-cart-fill me-1"></i>
                  Contact Client
                </Link>
                <div style={{ margin: "0 10px" }}></div>
                <Link
                      className="btn btn-outline-dark flex-shrink-0"
                      to="/provider/Providermessanger"
                    >
                      <i className="bi-cart-fill me-1"></i>
                      Reserver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
