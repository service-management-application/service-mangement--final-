import React from 'react'
import ProviderNavbar from '../../Components/Navbar/ProviderNavbar'
import Footer from '../../Components/Footer/Footer'
import ProviderCarousel from '../../Components/Carousel/ProviderCarousel'
import About from '../../Components/About/About'

export default function ProviderHome() {
  return (
    <div>
        <ProviderNavbar />
        <ProviderCarousel/>
        <About />
        <Footer />
    </div>
  )
}
