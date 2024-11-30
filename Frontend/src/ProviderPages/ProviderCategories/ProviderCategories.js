import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]); // State to store the categories (or services)
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch categories (or services) from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/services/getall"); // Replace with the correct API endpoint
        setCategories(response.data); // Set the fetched categories (or services) to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories(); // Call fetchCategories when the component mounts
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <h1 className="text-center my-5">Job Requests</h1>

      {/* Search Bar */}
      <div className="text-center mb-5">
        <form
          className="d-flex justify-content-center"
          onSubmit={(e) => e.preventDefault()} // Prevent form submission
          role="search"
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search jobs by title"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            style={{ width: "250px", borderRadius: "20px" }}
          />
          <button
            className="btn btn-success"
            type="submit"
            style={{ borderRadius: "20px" }}
          >
            Search
          </button>
        </form>
      </div>

      <br />

      {/* Job Cards */}
      <div className="container text-center">
        <div className="row justify-content-center">
          {loading ? (
            <p>Loading jobs...</p> // Show loading text while fetching
          ) : filteredCategories.length > 0 ? (
            filteredCategories.map((service) => (
              <div
                key={service._id}
                className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
              >
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5> {/* Job title */}
                    <p className="card-text">{service.date}</p> {/* Job date */}
                    <p className="card-text">{service.description}</p> {/* Job description */}
                    <Link
                      to={`/Provider/offerslistInCat/${service._id}`} // Pass job ID to the next page
                      className="btn btn-primary"
                    >
                      View Job Details {/* Button to navigate */}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found for "{searchQuery}".</p> // Show message if no jobs match search
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
