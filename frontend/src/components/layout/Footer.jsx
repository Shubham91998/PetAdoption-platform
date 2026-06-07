import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <div className=" footer sm:footer-center text-base-content rounded dark:bg-slate-900 dark:text-white bottom-0 left-0 right-0">
        <div className=" md:display sm:flex  sm:justify-between p-2">
          <div className="sm:w-1/3 ml-0">
            <h3 className="pl-36 sm:pl-0 text-yellow-600 text-xl ">The PetNest</h3>
            <p>
              Your trusted{" "}
              <span className="text-red-500 font-bold">
                {" "}
                pet adoption platform,
              </span>{" "}
              helping you find a perfect pet and create lasting bonds with your
              furry friend!
            </p>
          </div>
          <div className="">
            
            <h3 className="text-yellow-600 text-xl sm:pt-3 pl-36 sm:pl-0">Quick Links</h3>
            <div className="display flex gap-3">

            <div>
              <a href="/adopt">Adopt a Pet</a>
            </div>
              <div>
                <a href="/about">About Us</a>
              </div>
              <div>
                <a href="/contact">Contact Us</a>
              </div>
              <div>
                <a href="/faq">FAQ</a>
              </div>
              <div>
                <a href="/blog">Pet Care Blog</a>
              </div>
            
            </div>
          </div>

          <div>
            <h3 className="text-yellow-600 text-xl pl-36 sm:pl-0">Contect Us</h3>
            <div className="">
            <div>
              <div className="pl-10 sm:pl-0">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Galgotias University,
                Uttar Pardesh, India
              </div>
              <div className="sm:flex-none flex gap-10">
              <div >
                <FontAwesomeIcon icon={faPhoneAlt} /> +91-9576430463
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} /> kshubham5642@gmail.com
              </div>
              </div>
            </div>
            </div>
          </div>
          
         
          
        </div>

        <div className="w-full border-t-2">
            <h3 className="text-yellow-600 text-xl pl-36 sm:pl-0">Follow Us</h3>
            <div className="display flex gap-6 sm:gap-2 sm:px-5 px-14">
              <img
                className="bg-white h-7 w-7"
                src="https://img.icons8.com/?size=100&id=447&format=png&color=000000"
                alt=""
              />
              <img
                className="bg-white h-7 w-7"
                src="https://img.icons8.com/?size=100&id=12598&format=png&color=000000"
                alt=""
              />
              <img
                className="bg-white h-7 w-7"
                src="https://img.icons8.com/?size=100&id=118468&format=png&color=000000"
                alt=""
              />
              <img
                className="bg-white h-7 w-7"
                src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000"
                alt=""
              />
              <img
                className="bg-white h-7 w-7"
                src="https://img.icons8.com/?size=100&id=z6gJ8gyjaapn&format=png&color=000000"
                alt=""
              />
            </div>
            <div className="pb-5 px-5">
            <p>&copy; 2024 ThePetNest | Designed by Shubham Kumar</p>
        </div>

        </div>
      </div>
    </>
  );
};

export default Footer;
