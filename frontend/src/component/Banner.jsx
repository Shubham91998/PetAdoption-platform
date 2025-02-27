import React from "react";
import imgage from "../../public/image/Banner.webp";
import imageh2 from "../../public/image/heading3.png";
import { Link } from "react-router-dom";


const Banner = () => {
  return (
    <>
      <div className=" relative max-w-screen-2xl container flex flex-col md:flex-row mt-16">
        <img src={imgage} alt="" className="w-full h-[500px]" />

        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">
          </h1>
          <p className="text-xl mb-6">
            Every Pet Deserves a Good Home. #AdoptLove
          </p>
          <div className="flex items-center justify-between">

          <Link to="/Form" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Upload your pet
          </Link>
          <img className="hidden md:block w-full max-w-xs" src={imageh2} alt="Heading 2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
