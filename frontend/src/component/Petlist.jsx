import React, { useEffect, useState } from "react";
import Slider from "react-slick";  
import Cards from "./Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const Petlist = () => {

  const [authUser] = useAuth();
  const navigate = useNavigate();

  const handleAdoptClick = (e) => {
    if (!authUser) {
      e.preventDefault(); // Prevent navigation to the adoption page
      alert("Please log in first to upload your pet.");
      navigate("/"); // Redirect to the login page
    }
  };

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4001/original/pets/getallpet")
    .then((response) => {
      if (!response.ok){
        throw new Error("Failed to fetch data.")
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
    })
  }, []);

  if (loading) {
    return <p>Loading pets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
          
        }
      }
    ]
  };

  return (
    <>
    <div className="overflow-hidden py-20 bg-[url('https://iadopt.in/wp-content/uploads/2020/02/Background-V1.png')] bg-cover bg-center">
      <div className="px-4 py-5">
        <div className="bg-white py-5 px-5 rounded-md">
          <h2 className="w-full border-t-2 border-t-blue-700 py-2">
            <strong className="text-xl">Adopt a Pet, Don’t Shop.</strong>
          </h2>
          <p className="text-xs">
            If you are an animal lover and looking to get a pet for your home,
            consider adopting one. There are many wonderful pets waiting for
            you to take them home.
          </p>
          <br />
          <Link
            className="bg-red-500 text-white rounded-md px-3 py-2 mt-4"
            to="/AvailablePet"
            onClick={handleAdoptClick}
          >
            Adopt
          </Link>
        </div>


        <div className="px-5">
        <Slider {...settings}>
          {list.map((item) => (
            <div key={item.id}>
              <Cards item={item} />
            </div>
          ))}
        </Slider>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Petlist;
