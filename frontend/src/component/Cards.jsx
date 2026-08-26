import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const Cards = ({ item }) => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const handleAdoptClick = (e) => {
    if (!authUser) {
      e.preventDefault(); // Prevent navigation to the adoption page
      alert("Please log in first to adopt a pet.");
      navigate("/"); // Redirect to the login page
    }
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition-shadow">
        <img
          src={item.image || "https://via.placeholder.com/150"} // Fallback image if `item.image` is not available
          alt={item.name}
          className="w-full h-60 md:h-80 object-cover rounded-md"
        />
        <h3 className="mt-2 text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">Breed: {item.breed}</p>
        <p className="text-sm text-gray-600">Age: {item.age} years</p>
        <div className="my-5">
          {/* Pass petId to the AdoptionProcess component */}
          <Link
            to={`/AdoptionProcess/${item._id}`} // Use the pet's ID in the URL
            className="bg-red-500 py-2 px-5 rounded-xl text-white mt-3 hover:bg-red-600 transition-all"
            onClick={handleAdoptClick}
          >
            Adopt Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;