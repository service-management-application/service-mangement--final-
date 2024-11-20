import React from "react";
import About from "../../Components/About/About";
import ClientNavbar from "../../Components/Navbar/ClientNavbar";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";

export default function AboutUs() {
  // Determine the user type based on localStorage
  const userType = localStorage.getItem("userType"); // 'client' or 'provider'

  return (
    <div>
      {userType === "provider" ? <ProviderNavbar /> : <ClientNavbar />}
      <About />
      <Footer />
    </div>
  );
}
