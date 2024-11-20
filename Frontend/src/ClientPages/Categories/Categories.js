import React from "react";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

export default function Categories() {
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
          <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link
                  to="/client/ProfilesListInCat"
                  className="btn btn-primary"
                >
                  ListEventsInCat
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
