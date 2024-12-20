import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CategoriesManagement() {
  const [showForm, setShowForm] = useState(false);
  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
  });

  const [categories, setCategories] = useState([]); // Fetch from backend
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  const API_BASE_URL = "https://service-mangement-final-rxc3.onrender.com/categories"; // No /categories here

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/getall");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };
    fetchCategories();
  }, [categories]);  // Add categories as a dependency
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: categoryData.title,
      description: categoryData.description,
    };

    try {
      if (categoryData._id) {
        // Update category
        await axios.put(`${API_BASE_URL}/update/${categoryData._id}`, formData);
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === categoryData._id ? { ...categoryData } : cat
          )
        );
      } else {
        // Create new category
        const response = await axios.post(API_BASE_URL + "/create", formData);
        setCategories((prevCategories) => [
          ...prevCategories,
          { ...response.data },
        ]); // Add new category to the state directly
      }

      setShowForm(false);
      setCategoryData({ title: "", description: "" });
    } catch (err) {
      setError("Failed to save category.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== id)
      );
    } catch (err) {
      setError("Failed to delete category.");
    }
  };

  // Handle update selection
  const handleUpdate = (category) => {
    setCategoryData(category);
    setShowForm(true);
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="main-content w-100">
          <AdminNavbar />
          <br />
          <div className="container py-4">
            <Link to="/admin/Management" className="btn btn-link">
              Go Back
            </Link>
            <br />
            <br />

            <button
              className="btn btn-primary mb-3"
              type="button"
              onClick={() => setShowForm(!showForm)}
            >
              Add Category
            </button>
            <h2 className="text-center">Categories Data</h2>
            <br />

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="row mb-4">
                <div className="table-container px-3">
                  <table className="table table-hover table-bordered w-100">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category._id}> {/* Ensuring unique key */}
                          <th scope="row" hidden>{category._id} </th>
                          <td>{category.title}</td>
                          <td>{category.description}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-primary mx-3"
                              onClick={() => handleUpdate(category)}
                            >
                              Update
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="form-group mt-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={categoryData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={categoryData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success mt-3">
                  {categoryData._id ? "Update" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
