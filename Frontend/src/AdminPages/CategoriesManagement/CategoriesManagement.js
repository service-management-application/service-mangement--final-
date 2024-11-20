import React, { useState } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";

export default function CategoriesManagement() {
  const [showForm, setShowForm] = useState(false);
  const [categoryData, setCategoryData] = useState({
    image: null,
    name: "",
    description: "",
  });

  // Array to store all categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1", description: "Description 1", image: null },
    { id: 2, name: "Category 2", description: "Description 2", image: null },
  ]);

  // Function to handle input changes for name and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle image file input changes
  const handleImageChange = (e) => {
    setCategoryData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (categoryData.id) {
      // If categoryData has an id, we are updating an existing category
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryData.id ? { ...categoryData } : cat
        )
      );
    } else {
      // Otherwise, we are adding a new category
      setCategories((prevCategories) => [
        ...prevCategories,
        { ...categoryData, id: prevCategories.length + 1 },
      ]);
    }
    setShowForm(false);
    setCategoryData({ image: null, name: "", description: "" }); // Clear the form
  };

  // Function to handle deleting a category
  const handleDelete = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== id)
    );
  };

  // Function to handle selecting a category for updating
  const handleUpdate = (category) => {
    setCategoryData(category);
    setShowForm(true); // Show the form with the category data pre-filled
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="main-content w-100">
          <AdminNavbar />
          <br />
          <div className="container py-4">
            <Link to="/admin/Management" type="button" class="btn btn-link">
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
            <div className="row mb-4">
              <div className="table-container px-3">
                <table className="table table-hover table-bordered w-100">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <th scope="row">{category.id}</th>
                        <td>{category.name}</td>
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
                            onClick={() => handleDelete(category.id)}
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

            {showForm && (
              <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={categoryData.name}
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
                  {categoryData.id ? "Update" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
