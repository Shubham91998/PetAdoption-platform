import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Banner from '../components/Banner.jsx';
import Banner2 from '../components/Banner2.jsx';
import FourButton from '../components/FourButton.jsx';
import Petlist from '../components/Petlist.jsx';
import Glancepart from '../components/Glancepart.jsx';
import YoucanDo from '../components/YoucanDo.jsx';
import NeutritionChart from '../components/NutritionChart.jsx';
import Frequently from '../components/Frequently.jsx';

const Home = () => {
  return (
    <>
      <Navbar />
    
    <Banner />
    <Banner2 />
    <FourButton />
    <Petlist />
    <Glancepart />
    <YoucanDo />
    <NeutritionChart />
    <Frequently />
    <Footer />
    </>
  )
}

export default Home
