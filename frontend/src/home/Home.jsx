import React from 'react'
import { Link } from 'react-router-dom'
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
import NearbyShelters from '../components/NearbyShelters.jsx'

const Home = () => {
  return (
    <>
      <Navbar />
    
    <Banner />
    <Banner2 />
    <FourButton />
    <Petlist />

    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-100 font-semibold">Shelter Connect</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Register your shelter and start helping pets find homes</h2>
            <p className="mt-3 text-orange-50 max-w-2xl">
              Reach adopters, manage available animals, share updates, and build trust with your community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/shelter-register"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Register Your Shelter
            </Link>
            <Link
              to="/shelter-login"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Shelter Login
            </Link>
          </div>
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 py-12">
      <NearbyShelters />
    </div>
    <Glancepart />
    <YoucanDo />
    <NeutritionChart />
    <Frequently />
    <Footer />
    </>
  )
}

export default Home
