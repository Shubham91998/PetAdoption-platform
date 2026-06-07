import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { toast } from "react-hot-toast";

const ManagePet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pets/allpets`);
        setPets(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleAddPet = async (pet) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/original/pets/addpet`, pet);
      if (res.status === 201) {
        toast.success("Pet added successfully!");
        setPets([...pets, res.data]);
      }
    } catch (error) {
      toast.error("Failed to add pet: " + error.message);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/pets/deletepet/${petId}`);
      if (res.status === 200) {
        toast.success("Pet deleted successfully!");
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
      <div className="mt-28 mx-5">
        <h1 className="text-2xl font-bold mb-4">Pet List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-64 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{pet.name}</h2>
              <div className="display flex justify-between">
                <div>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                </div>
                <div>
                  <p><strong>Type:</strong> {pet.type}</p>
                  <p><strong>Category:</strong> {pet.category}</p>
                </div>
              </div>
              <p><strong>User ID:</strong> {pet.userid}</p>
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
      </div>
      <Footer />
    </>
  );
};

export default ManagePet;