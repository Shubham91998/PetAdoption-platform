import React from 'react'
import Navbar from "../component/Navbar.jsx"
import Footer from '../component/Footer.jsx'
import Banner from '../component/Banner.jsx'
import Banner2 from '../component/Banner2.jsx'
import FourButton from '../component/FourButton.jsx'
import Petlist from '../component/Petlist.jsx'
import Glancepart from '../component/Glancepart.jsx'
import YoucanDo from '../component/YoucanDo.jsx'
import NeutritionChart from '../component/NeutritionChart.jsx'
import Frequently from '../component/Frequently.jsx'

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
