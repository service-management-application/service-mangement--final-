import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const [services, setServices] = useState([]); // All job services
  const [allCategories, setAllCategories] = useState([]); // All job categories
  const [filteredServices, setFilteredServices] = useState([]); // Filtered services
  const [loading, setLoading] = useState(true); // Loading state

  const [searchQuery] = useState(""); // Search query
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category
  const [priceRange, setPriceRange] = useState(5000); // Price range
  const navigate = useNavigate();

  // Fetch services and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all services
        const servicesResponse = await axios.get("https://service-mangement-final-rxc3.onrender.com/services/getall");
        setServices(servicesResponse.data);
        setFilteredServices(servicesResponse.data); // Initial filtered state

        // Fetch all categories
        const categoriesResponse = await axios.get("https://service-mangement-final-rxc3.onrender.com/categories/getall");
        setAllCategories(categoriesResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters dynamically
  useEffect(() => {
    const filtered = services.filter((service) => {
      // Category filter: Match the selected category with service's category name
      const matchesCategory =
        selectedCategory === "All" || service.title.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearchQuery =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = service.price <= priceRange;

      return matchesCategory && matchesSearchQuery && matchesPrice;
    });

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, priceRange, services]);

  // Handle navigation
  const handleViewProfile = (serviceId) => {
    localStorage.setItem("selectedServiceId", serviceId);
    navigate(`/Provider/OfferDescription`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mt-5 flex-grow-1">
        <h1 className="text-center mb-4">Job Requests</h1>

        <div className="row">
          {/* Filter Bar */}
          <div className="col-md-3">
            <div className="filter-bar border p-4 rounded">
              <h4 className="text-center mb-4">Filters</h4>

              {/* Category Dropdown */}
              <div className="mb-4">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Slider */}
              <div className="mb-4">
                <label className="form-label">Max Price: ${priceRange}</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="col-md-9">
            {loading ? (
              <p>Loading jobs...</p>
            ) : filteredServices.length > 0 ? (
              <div className="row">
                {filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
                  >
                    <div className="card shadow-sm" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <h5 className="card-title">{service.title}</h5>
                        <p className="card-text">
                          Posted by: {service.Client?.firstName} {service.Client?.lastName}
                        </p>
                        <p className="card-text">Price: ${service.price}</p>
                        <p className="card-text">
                          Needed Before: {new Date(service.date).toLocaleDateString("en-GB")}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewProfile(service._id)}
                        >
                          View Job Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No jobs found matching your filters.</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
