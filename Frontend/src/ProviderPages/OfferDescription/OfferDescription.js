import React from "react";
import { Link } from "react-router-dom";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";

export default function OfferDescription() {
  return (
    <div>
      <ProviderNavbar />

      <section class="py-5">

        <div class="container px-4 px-lg-5 my-5">
        <Link to="/provider/offerslistincat" className="btn btn-secondary mb-3">go back</Link>

          <div class="row gx-4 gx-lg-5 align-items-center">

            <div class="col-md-6">
            <div className="card text-center">
                <div className="card-body">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  <p className="text-muted mb-1">Name</p>

                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h1 class="display-5 fw-bolder">Shop item template</h1>
                <ul class="fs-5 mb-5">
                    <li>Price:<span>  $40.00 </span> </li>

                    <li>Location:<span> sidi 3morr</span></li>
                    <li>Description :</li>

                </ul>
              <p class="lead">
                lavabou mazdoud 7ajti b wa7ed ysar7o w na3tih 500dt
              </p>
              <div class="d-flex">
                <Link
                  class="btn btn-outline-dark flex-shrink-0"
                  to="/provider/Providermessanger"
                >
                  <i class="bi-cart-fill me-1"></i>
                  Contact Client
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
