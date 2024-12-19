import React from "react";
import About from "../../Components/About/About";
import ClientNavbar from "../../Components/Navbar/ClientNavbar";
import ProviderNavbar from "../../Components/Navbar/ProviderNavbar";
import Footer from "../../Components/Footer/Footer";

export default function AboutUs() {
  const usertype = localStorage.getItem("usertype"); 

  return (
    <div>
      {usertype === "client" ? <ClientNavbar /> : <ProviderNavbar />}
      <About />
      <Footer />
    </div>
  );
}
