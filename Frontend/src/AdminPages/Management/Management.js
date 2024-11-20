import React from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import { Link } from "react-router-dom";

export default function Management() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content w-100">
        <AdminNavbar />
        <div class="container text-center mt-5">
          <h1>Management Section</h1>
          <br></br>
          <hr></hr>
          <div class="row justify-content-center mt-5">
            {/* card start */}
            <div class="col-4 m-3">
              <div class="card">
                {/* <div class="card-header">Featured</div> */}
                <div class="card-body">
                  <h5 class="card-title">Clients</h5>
                  <p class="card-text">
                    Here you can manage all the clients data other details. 
                  </p>
                  <Link to="/admin/clientsmanagement" class="btn btn-primary">
                    Check Now
                  </Link>
                </div>
              </div>
            </div>

            
         {/* card start */}

            <div class="col-4 m-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Service-Providers</h5>
                  <p class="card-text">
                  Here you can manage all the Service-Providers data other details. 

                  </p>
                  <Link to="/admin/providersmanagement" class="btn btn-primary">
                  Check Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

            {/* card start */}
          <div class="row justify-content-center mt-5">
            <div class="col-4 m-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Categories</h5>
                  <p class="card-text">
                  Here you can manage all the categories data other details. 

                  </p>
                  <Link to="/admin/categoriesmanagement" class="btn btn-primary">
                  Check Now
                  </Link>
                </div>
              </div>
            </div>

          
            
          </div>
        </div>
      </div>
    </div>
  );
}
