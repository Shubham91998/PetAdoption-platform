import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ManagePet from "./ManagePet";
import { Link } from 'react-router-dom';

const ManageRoute = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Choose an Application
      </h1>
      <div className="space-y-4">
        {/* Link to Pet Post Application */}
        <Link
          to="/Manageallpet"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all block text-center"
        >
          Pet Post Application
        </Link>

        {/* Link to Pet Adoption Application */}
        <Link
          to="/ManageallGet"
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all block text-center"
        >
          Pet Adoption Application
        </Link>
      </div>
    </div>
      <Footer className="bg-gray-800 text-white text-center p-4" />
    </div>
  );
}

export default ManageRoute;
