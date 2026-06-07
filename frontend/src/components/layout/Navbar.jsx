import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Logout from "../auth/Logout.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuth();
  


  // const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleSearch = () => {
  //   setIsSearchActive(!isSearchActive);
  // };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItem = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/Services">Service</a>
      </li>
      <li>
        <a href="/Availablepet">Available Pets</a>
      </li>
      {/* <li>
        <a href="/Process">Adoption Process</a>
      </li> */}
      <li>
        <a href="/PetManage">Admin Page</a>
      </li>
      <li>
        <a href="/about">About Us</a>
      </li>

    </>
  );

  return (
    <>
      <div
        className={`transition-all fixed top-0 left-0 w-full bg-white shadow-lg z-50 ${
          isFixed ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="navbar bg-base-100">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown">
              <button
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
                onClick={toggleMobileMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              {isMobileMenuOpen && (
                <ul
                  tabIndex={0}
                  className="text-sm menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {navItem}
                </ul>
              )}
            </div>
            <img className="hidden md:block w-10 h-10" src="/img.jpeg" alt="Pet Adoption logo" />
            <a className="btn btn-ghost text-xl">Pet Adoption</a>
          </div>

          {/* Navbar Center */}
          <div className="md:pr-[600px] navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex items-center space-x-4">
           

            {/* Notification Button */}
            <Link to="/Process" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
            </Link>

            {/* Login Button */}

              {
                authUser ? (<Logout/>)
             :(<div>
              <a
                  className="bg-black text-white px-3 py-2 rounded-md mr-3 hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
            </div> 
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
