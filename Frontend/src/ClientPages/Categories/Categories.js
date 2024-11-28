import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios to make API requests

export default function Categories() {
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state to show a loading message

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories/getall"); // Replace with your API endpoint
        setCategories(response.data); // Set the fetched categories to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories(); // Call the fetchCategories function on component mount
  }, []);

  return (
    <div>
      <Navbar />

      <h1 className="text-center my-5">Choose Your Category</h1>

      <div className="text-center mb-5">
        <form className="d-flex justify-content-center" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
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

      <div className="container text-center">
        <div className="row justify-content-center">
          {loading ? (
            <p>Loading categories...</p> // Show loading message while fetching
          ) : (
            categories.map((category) => (
              <div key={category._id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{category.title}</h5> {/* Category title */}
                    <p className="card-text">{category.description}</p> {/* Category description */}
                    <Link
                      to={`/client/ProfilesListInCat/${category._id}`} // Pass category ID to the next page
                      className="btn btn-primary"
                    >
                      learn more {/* Adjust button text */}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
