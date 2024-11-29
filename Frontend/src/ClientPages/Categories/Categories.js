import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios to make API requests

export default function Categories() {
  const [categories, setCategories] = useState([]); // State to store all categories
  const [filteredCategories, setFilteredCategories] = useState([]); // State to store filtered categories
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories/getall"); // Replace with your API endpoint
        setCategories(response.data); // Set fetched categories to state
        setFilteredCategories(response.data); // Initially set filtered categories to all categories
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories(); // Call the fetchCategories function on component mount
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = categories.filter((category) =>
      category.title.toLowerCase().includes(query) //selon le title du categorie
    );

    setFilteredCategories(filtered);
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-center my-5">Choose Your Category</h1>

      <div className="text-center mb-5">
        <form className="d-flex justify-content-center" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by category"
            aria-label="Search"
            style={{ width: "250px", borderRadius: "20px" }}
            value={searchQuery} 
            onChange={handleSearch} 
          />
          <button
            className="btn btn-success"
            type="button" 
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
          ) : filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category._id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{category.title}</h5> {/* Category title */}
                    <p className="card-text">{category.description}</p> {/* Category description */}
                    <Link
                      to={`/client/ProfilesListInCat/${category._id}`} // Pass category ID to the next page
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No categories found</p> 
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
