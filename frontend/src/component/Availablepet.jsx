import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import axios from "axios"

const Availablepet = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [error, setError] = useState(null);
  const [filterValues, setFilterValues] = useState({ breed: '', minAge: '', maxAge: '', petType: '' });
  const [availableBreeds, setAvailableBreeds] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:4001/original/pets/getallpet");
      
        setPets(res.data);
        setFilteredPets(res.data); // Initialize with all pets by default
      } catch (err) {
        setError(err.message);
        console.error(err); // Log error for debugging
      }
    };

    fetchPets();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });

    if (name === 'petType') {
      const breeds = [...new Set(pets.filter(pet => pet.type === value).map(pet => pet.breed))];
      setAvailableBreeds(breeds);
      setFilterValues({ ...filterValues, breed: '' }); // Reset breed when pet type changes
    }
  };

  const applyFilter = () => {
    let filtered = pets;

    if (filterValues.petType) {
      filtered = filtered.filter((pet) => pet.type === filterValues.petType);
    }

    // Apply breed filter
    if (filterValues.breed) {
      filtered = filtered.filter((pet) => pet.breed === filterValues.breed);
    }

    // Apply age range filter
    if (filterValues.minAge) {
      filtered = filtered.filter((pet) => pet.age >= parseInt(filterValues.minAge, 10));
    }
    if (filterValues.maxAge) {
      filtered = filtered.filter((pet) => pet.age <= parseInt(filterValues.maxAge, 10));
    }

    setFilteredPets(filtered);
  };

  return (
    <div className="mx-auto p-4 bg-white shadow-md rounded-lg mt-28">

      <div className="items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          We&apos;re delighted to have you{" "}
          <span className="text-pink-500"> Here! :)</span>
        </h1>
        <p className="mt-12">
          Every paw has a story. Some were lost, some abandoned, but all long for love. On this platform, second chances come alive. Adopting a pet isn’t just saving a life—it’s gaining unconditional love and loyalty. Be their hero; let them be your joy. Together, create a forever home.
        </p>
        <Link to="/">
          <button className="my-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="filter-section flex flex-wrap items-center gap-4 mb-6 md:justify-center items-center">
        <div className="flex items-center">
          <label htmlFor="petTypeFilter" className="mr-2 font-semibold">
            Pet Type:
          </label>
          <select
            id="petTypeFilter"
            name="petType"
            value={filterValues.petType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="breedFilter" className="mr-2 font-semibold">
            Breed:
          </label>
          <select
            id="breedFilter"
            name="breed"
            value={filterValues.breed}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            {/* Dynamically generate breed options based on selected pet type */}
            {availableBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="minAgeFilter" className="mr-2 font-semibold">
            Min Age:
          </label>
          <input
            id="minAgeFilter"
            type="number"
            name="minAge"
            value={filterValues.minAge}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-24"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="maxAgeFilter" className="mr-2 font-semibold">
            Max Age:
          </label>
          <input
            id="maxAgeFilter"
            type="number"
            name="maxAge"
            value={filterValues.maxAge}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-24"
          />
        </div>

        <button
          onClick={applyFilter}
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Apply Filter
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {filteredPets.map((pet) => (
          <li key={pet.id}>
            <Cards item={pet} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default Availablepet;