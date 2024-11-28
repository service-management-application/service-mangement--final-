import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests

export default function Categories() {
  const [categories, setCategories] = useState([]); // State to store the categories
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories/getall"); // Replace with the actual API endpoint for categories
        setCategories(response.data); // Set the fetched categories to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories(); // Call fetchCategories when the component mounts
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
            <p>Loading categories...</p> // Show loading text while fetching
          ) : (
            categories.map((category) => (
              <div key={category._id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={category.imageUrl || "default-image-url.jpg"} className="card-img-top" alt={category.title} />
                  <div className="card-body">
                    <h5 className="card-title">{category.title}</h5> {/* Category title */}
                    <p className="card-text">{category.description}</p> {/* Category description */}
                    <Link
                      to={`/Provider/offerslistInCat/${category._id}`} // Pass category ID to the next page for the list of jobs
                      className="btn btn-primary"
                    >
                      List of jobs in {category.title} {/* Display category name in the button */}
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
