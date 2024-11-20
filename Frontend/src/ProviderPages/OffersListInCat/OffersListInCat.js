import React, { useState } from "react";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

export default function OffersListInCat() {
  const [priceRange, setPriceRange] = useState(250);

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };
  return (
    <div>
      <ProviderNavbar />

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

          {/* offers beginning */}
          <div className="col-sm-8">
            <div className="container-fluid mt-5">
              <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <div class="card-body">
                      <h5 class="card-title">Cutting trees</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Posted by: hamma 8rab
                      </h6>
                      <p class="card-text">
                        this is a test description for the job
                      </p>
                      <hr/>
                      <p class="card-text">
                        price : 200 DT
                      </p>
                      <Link to="/provider/offerDescription" className="btn btn-primary">
                        Check Offer
                      </Link>

                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#" class="card-link">
                        Card link
                      </a>
                      <a href="#" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card" style={{ width: "18rem;" }}>
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#" class="card-link">
                        Card link
                      </a>
                      <a href="#" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col">
                <div class="card" style={{ width: "18rem;" }}>
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#" class="card-link">
                        Card link
                      </a>
                      <a href="#" class="card-link">
                        Another link
                      </a>
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
