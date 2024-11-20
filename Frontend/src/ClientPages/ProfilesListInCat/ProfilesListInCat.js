import React, { useState } from "react";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import img1 from "../../assets/images/person_1.jpg";
import { Link } from "react-router-dom";

export default function ProfilesListInCat() {
  const [priceRange, setPriceRange] = useState(250);

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div>
      <Navbar />

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4">
            <table width="90%" border="1" className="mt-5 ">
              <thead style={{ backgroundColor: "#caf0f8", height: "50px" }}>
                <tr>
                  <th>Filter By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <select
                      id="location"
                      className="form-select"
                      aria-label="Location select"
                    >
                      <option value="">Select Location</option>
                      <option value="nabeul">Nabeul</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="priceRange" className="form-label">
                      Price Range: {priceRange} DT
                    </label>
                    <input
                      type="range"
                      id="priceRange"
                      className="form-control"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange}
                      onChange={handlePriceChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="availability" className="form-label">
                      Availability
                    </label>
                    <select
                      id="availability"
                      className="form-select"
                      aria-label="Availability select"
                    >
                      <option value="">Select availability</option>
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* profiles beginning */}
          <div className="col-sm-8">
            <div className="container-fluid mt-5">
              <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <img src={img1} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                      <Link to="/client/profile" className="btn btn-primary">
                        Go to Profile
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <img src={img1} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                      <Link to="/client/profile" className="btn btn-primary">
                        Go to Profile
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <img src={img1} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                      <Link to="/client/profile" className="btn btn-primary">
                        Go to Profile
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <img src={img1} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                      <Link to="/client/profile" className="btn btn-primary">
                        Go to Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>














      </div>
      <Footer />
    </div>
  );
}
