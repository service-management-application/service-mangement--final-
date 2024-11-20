import React from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import ServiceStatistics from "../../Components/Charts/ServiceStatistics";
import BasicBars from "../../Components/Charts/BasicBars";
import Axis from "../../Components/Charts/Axis";
import Pie from "../../Components/Charts/Pie";
import Legend from "../../Components/Charts/Legend";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content w-100">
        <AdminNavbar />
        <div className="container py-4">
          {/* Responsive chart layout */}
          <div className="row mb-4">
            {/* First Chart Column */}
            <div className="col-12 col-lg-6 mb-4">
              <h5 className="text-center">Basic Bars</h5>
              <div className="chart-container">
                <BasicBars />
              </div>
              <Legend />
            </div>

            {/* Second Chart Column */}
            <div className="col-12 col-lg-6 mb-4">
              <h5 className="text-center">Axis and Pie</h5>
              <div className="chart-container">
                <Axis />
              </div>
              <div className="chart-container mt-4">
                <Pie />
              </div>
            </div>
          </div>

          {/* Service Statistics section */}
          <div className="row">
            <div className="col-12">
              <ServiceStatistics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
