import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cards from "./Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { PawPrint, Heart, ArrowRight, AlertCircle, Loader2, Sparkles } from "lucide-react";

const Petlist = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAdoptClick = (e) => {
    if (!authUser) {
      e.preventDefault();
      alert("Please log in first to upload your pet.");
      navigate("/");
    }
  };

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';

    fetch(`${backendUrl}/original/pets/getallpet`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response.json();
      })
      .then((data) => {
        const limitedPets = data.slice(0, 10);
        setList(limitedPets);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the pet data:", error);
        setError("Error fetching pet data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    pauseOnHover: true,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 rounded-2xl">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-600">Finding your perfect companion...</p>
        <div className="mt-2 flex gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-red-50 rounded-2xl border border-red-200 p-8">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <p className="mt-4 text-lg font-medium text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-blue-50 via-white to-indigo-50/30">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-100/10 rounded-full blur-3xl"></div>
          
          <div className="absolute top-20 left-10 opacity-5 rotate-12">
            <PawPrint size={60} className="text-blue-600" />
          </div>
          <div className="absolute bottom-20 right-10 opacity-5 -rotate-12">
            <PawPrint size={40} className="text-indigo-600" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <PawPrint className="w-5 h-5 text-blue-600" />
              <div className="h-1 w-12 bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                  Adopt a Pet, <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Don't Shop.
                  </span>
                </h2>
                <p className="mt-3 text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                  If you are an animal lover and looking to get a pet for your home,
                  consider adopting one. There are many wonderful pets waiting for
                  you to take them home.
                </p>
              </div>
              
              <div className="flex gap-3 flex-shrink-0">
                <Link
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold 
                    hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1
                    flex items-center gap-2"
                  to="/AvailablePet"
                  onClick={handleAdoptClick}
                >
                  <Heart className="w-4 h-4 group-hover:fill-white transition-colors" />
                  <span>Adopt Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Pet Cards Carousel */}
          {list.length > 0 ? (
            <div className="relative px-1 sm:px-2">
              <style>
                {`
                  .slick-prev:before, .slick-next:before {
                    color: #3b82f6 !important;
                    font-size: 24px !important;
                  }
                  .slick-prev, .slick-next {
                    z-index: 10;
                  }
                  .slick-prev {
                    left: -20px !important;
                  }
                  .slick-next {
                    right: -20px !important;
                  }
                  .slick-dots {
                    bottom: -40px !important;
                  }
                  .slick-dots li button:before {
                    font-size: 10px !important;
                    color: #93c5fd !important;
                  }
                  .slick-dots li.slick-active button:before {
                    color: #3b82f6 !important;
                  }
                  @media (max-width: 480px) {
                    .slick-prev, .slick-next {
                      display: none !important;
                    }
                  }
                `}
              </style>
              <Slider {...settings}>
                {list.map((item) => (
                  <div key={item._id || item.id} className="px-2 sm:px-3">
                    <Cards item={item} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto" />
              <p className="mt-4 text-lg font-medium text-slate-600">No pets available at the moment</p>
              <p className="text-sm text-slate-400">Check back soon for new furry friends!</p>
            </div>
          )}

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <div className="text-3xl font-bold text-blue-600">{list.length}</div>
              <p className="text-sm text-slate-500">Pets Available</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <div className="text-3xl font-bold text-indigo-600">#</div>
              <p className="text-sm text-slate-500">Happy Adoptions</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <div className="text-3xl font-bold text-purple-600">4.9★</div>
              <p className="text-sm text-slate-500">Adopter Rating</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Petlist;