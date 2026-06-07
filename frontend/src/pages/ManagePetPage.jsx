import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import { toast } from "react-hot-toast";

const ManagePet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all pets from the database
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/pets/allpets`);
        setPets(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Function to handle adding a pet
  const handleAddPet = async (pet) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/original/pets/addpet`, pet);
      if (res.status === 201) {
        toast.success("Pet added successfully!");
        // Update the pets state with the new pet
        setPets([...pets, res.data]);
      }
    } catch (error) {
      toast.error("Failed to add pet: " + error.message);
    }
  };

  // Function to handle deleting a pet
  const handleDeletePet = async (petId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/pets/deletepet/${petId}`);
      if (res.status === 200) {
        toast.success("Pet deleted successfully!");
        // Update the pets state by removing the deleted pet
        setPets(pets.filter((pet) => pet._id !== petId));
      }
    } catch (error) {
      toast.error("Failed to delete pet: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 return (
  <>
    <Navbar />

    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-28 mx-5">
        {pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-3xl font-semibold text-gray-600">
              No Pets Available 🐾
            </h2>
            <p className="text-gray-500 mt-2">
              There are currently no pets to display.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-64 object-cover rounded-md mb-2"
                />

                <h2 className="text-lg font-semibold">{pet.name}</h2>

                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>Breed:</strong> {pet.breed}
                    </p>
                    <p>
                      <strong>Age:</strong> {pet.age}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Type:</strong> {pet.type}
                    </p>
                    <p>
                      <strong>Category:</strong> {pet.category}
                    </p>
                  </div>
                </div>

                <p>
                  <strong>User ID:</strong> {pet.userid}
                </p>

                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleAddPet(pet)}
                  >
                    Add
                  </button>

                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeletePet(pet._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  </>
);
};

export default ManagePet;