import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PetDelivered = () => {
  const { petId } = useParams();
  const [formData, setFormData] = useState({
    currentLocation: "",
    address: "",
    reasonForAdoption: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userString = localStorage.getItem("user");
      let userId = null;

      try {
        const user = userString ? JSON.parse(userString) : null;
        userId = user?._id || null;
      } catch (error) {
        console.error("Error parsing user from local storage:", error);
        toast.error("Failed to retrieve user information.");
        return;
      }

      if (!userId) {
        toast.error("User not logged in. Please log in to submit a pet adoption request.");
        return;
      }

      if (!petId) {
        toast.error("Pet ID is missing. Please try again.");
        return;
      }

      // Check if either currentLocation or address is filled
      if (!formData.currentLocation && !formData.address) {
        toast.error("Please provide either your current location or address.");
        return;
      }

      // Prepare data to send
      const dataToSend = {
        userId,
        petId,
        currentLocation: formData.currentLocation || formData.address, // Use currentLocation if filled, otherwise use address
        reasonForAdoption: formData.reasonForAdoption,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/pets/petrequest`, dataToSend);
      console.log("Response:", response.data);
      toast.success("Form submitted successfully!");
      navigate(from , {replace:true})
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              const address = data.display_name || "Unknown Location";
              setFormData({
                ...formData,
                currentLocation: address,
                address: address,
              });
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setFormData({
                ...formData,
                currentLocation: `${latitude}, ${longitude}`,
              });
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to retrieve your location. Please enter it manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Pet Adoption Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Location:</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Location
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address manually or use location"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Adoption:</label>
            <textarea
              name="reasonForAdoption"
              value={formData.reasonForAdoption}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetDelivered;