import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Services from '../components/Services.jsx';
import Services2 from '../components/Services2.jsx';


const ServicesPage = () => {
  return (
    <>
      <Navbar/>
      <Services/>
      <Services2 />
      <Footer/>
    </>
  )
}

export default ServicesPage
