import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";

export default function ProfilesListInCat() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(5000);

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
          `https://service-mangement-final.onrender.com/providerS/providers/category/${categoryId}`
        );
        setProviders(response.data);
        setFilteredProviders(response.data); // Initialize filtered providers
      } catch (err) {
        console.error("Error fetching providers:", err);
        setError("No provider in this category.");
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

  // Store providerId in localStorage and navigate to the profile page
  const handleViewProfile = (providerId) => {
    localStorage.setItem("selectedProviderId", providerId);
    navigate(`/Client/OfferDescriptionProvider`);
  };

  // Filter Logic
  useEffect(() => {
    let filtered = providers;

    if (stateFilter) {
      filtered = filtered.filter((provider) =>
        provider.state.toLowerCase().includes(stateFilter.toLowerCase())
      );
    }

    if (priceFilter) {
      filtered = filtered.filter((provider) => provider.price <= priceFilter);
    }

    setFilteredProviders(filtered);
  }, [stateFilter, priceFilter, providers]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center my-5">Providers in this Category</h1>

        {/* Filter Bar Positioned on the Right */}
        <div className="row">
          <div className="col-md-3">
            <div className="filter-bar p-3 border rounded bg-light shadow">
              <h5 className="mb-3 text-primary text-center">Filter Providers</h5>
              <div className="mb-4">
                <label htmlFor="stateFilter" className="form-label fw-bold">
                  Filter by State
                </label>
                <input
                  id="stateFilter"
                  type="text"
                  className="form-control"
                  placeholder="Enter State"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="priceFilter" className="form-label fw-bold">
                  Max Price: ${priceFilter}
                </label>
                <input
                  id="priceFilter"
                  type="range"
                  className="form-range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setStateFilter("");
                  setPriceFilter(5000);
                }}
                className="btn btn-danger w-100"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Providers List */}
          <div className="col-md-9">
            {loading ? (
              <p>Loading providers...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : filteredProviders.length > 0 ? (
              <div className="row">
                {filteredProviders.map((provider) => (
                  <div className="col-md-4 mt-5" key={provider._id}>
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">
                          {provider.firstName} {provider.lastName}
                        </h5>
                        <p className="card-text">State: {provider.state}</p>
                        <p className="card-text">
                          Price per hour: {provider.price}$/h
                        </p>
                        <p className="card-text">Phone: {provider.phoneNumber}</p>
                        <button
                          onClick={() => handleViewProfile(provider._id)}
                          className="btn btn-primary w-100"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No providers found in this category.</p>
            )}
          </div>
        </div>

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
