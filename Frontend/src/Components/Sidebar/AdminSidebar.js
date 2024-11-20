import React from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer, cilSettings } from "@coreui/icons"; // Import specific icons
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <div className="sidebar border-end" style={{ height: "100vh" }}>
        <ul className="sidebar-nav">
          <li className="nav-title">Content</li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="active-link"
              to="/admin/dashboard"
            >
              <CIcon icon={cilSpeedometer} className="nav-icon me-2" /> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="active-link"
              to="/admin/Management"
            >
              <CIcon icon={cilSettings} className="nav-icon me-2" /> Manage Data
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
