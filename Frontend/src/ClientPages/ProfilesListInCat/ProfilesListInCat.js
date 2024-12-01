import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";

export default function ProfilesListInCat() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      const categoryId = localStorage.getItem("selectedCategoryId");

      if (!categoryId) {
        setError("No category selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/providerS/providers/category/${categoryId}`
        );
        setProviders(response.data);
      } catch (err) {
        console.error("Error fetching providers:", err);
        setError("Failed to load providers.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Reset selectedCategoryId and navigate back to categories
  const handleResetCategory = () => {
    localStorage.removeItem("selectedCategoryId");
    navigate("/client/categories");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center my-5">Providers in this Category</h1>

        {loading ? (
          <p>Loading providers...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : providers.length > 0 ? (
          <div className="row">
            {providers.map((provider) => (
              <div className="col-md-4" key={provider._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{provider.firstName} {provider.lastName}</h5>
                    <p className="card-text">State: {provider.state}</p>
                    <p className="card-text">Phone: {provider.phoneNumber}</p>
                    <Link to={`/client/profile/${provider._id}`} className="btn btn-primary">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No providers found in this category.</p>
        )}

        {/* Link to reset category and go back */}
        <div className="text-center mt-5">
          <button onClick={handleResetCategory} className="btn btn-secondary">
            Back to Categories
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
