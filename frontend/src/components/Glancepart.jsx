import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Glancepart = () => {
  const [totalPets, setTotalPets] = useState(0);
  const [dogsAdopted, setDogsAdopted] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);

useEffect(() => {
  const fetchPetCount = async () => {
    try {
      const [statsRes, petsRes] = await Promise.all([
        axios.get("http://localhost:8001/pets/api/dashboard-stats"),
        axios.get("http://localhost:8001/original/pets/getallpet"),
      ]);
      setTotalPets(statsRes.data.data.totalApplications);
      setDogsAdopted(statsRes.data.data.totalAdopted);

      const pets = Array.isArray(petsRes.data)
        ? petsRes.data
        : petsRes.data.data || petsRes.data.pets || [];

      const availablePets = pets.filter(
        (pet) => pet.category?.toLowerCase() === "adoptable"
      );

      setTotalAvailable(availablePets.length);
    } catch (err) {
      console.error("Error fetching pet stats:", err);}
  };

  fetchPetCount();
}, []);

  return (
    <>
      <div className="overflow-hidden bg-[url('https://iadopt.in/wp-content/uploads/2020/02/Background-V1.png')] bg-cover bg-center">
        <div className="py-12 px-5 grid md:grid-cols-2 gap-6">
          <div className="grid gap-6 sm:grid-cols-2 items-center bg-white py-5 px-5 rounded-xl">
            <div className="order-2 sm:order-1">
              <h2>
                <strong>Pet At A Glance</strong>
              </h2>
              <p className="text-sm mt-4">
                Furever Friends is a passionate initiative dedicated to helping
                stray dogs and cats find their forever homes. We are a modern
                animal welfare platform that utilizes innovative approaches to
                connect our lovable pets with caring individuals who are ready
                to be responsible pet owners. Furever Friends is pioneering a
                streamlined, foster-based adoption process. We collaborate with
                a close-knit network of carefully vetted foster caregivers to
                ensure that all animals become familiar with a loving home
                environment before being adopted. Join us in making a
                difference—consider becoming a foster parent today!
              </p>
              <button className="mt-4 hover:text-blue-700">Know More</button>
            </div>
            <div className="order-1 sm:order-2 pt-10 sm:pt-0">
              <img
                src="image/dog2.jpg"
                alt="Adopt a pet"
                className="w-full h-auto rounded-3xl object-cover"
              />
            </div>
          </div>
          <div className="py-10">
            <div className="flex flex-wrap items-center justify-center gap-4 mx-5">
              <div id="adoption-applications" className="text-center bg-white rounded-2xl px-5 py-4 shadow-sm">
                <h3 className="text-3xl font-bold py-2">{totalPets}</h3>
                <p>Adoption Applications</p>
              </div>
              <div id="dogs-adopted" className="text-center bg-white rounded-2xl px-5 py-4 shadow-sm">
                <h3 className="text-3xl font-bold py-2">{dogsAdopted}</h3>
                <p>Dogs Adopted</p>
              </div>
              <div id="total-available" className="text-center bg-white rounded-2xl px-5 py-4 shadow-sm">
                <h3 className="text-3xl font-bold py-2">{totalAvailable}</h3>
                <p>Total Pets Available</p>
              </div>
              <div id="fosters-onboarded" className="text-center bg-white rounded-2xl px-5 py-4 shadow-sm">
                <h3 className="text-3xl font-bold py-2">0</h3>
                <p>Fosters Onboarded</p>
              </div>
            </div>
            <div className="pt-4 flex justify-center items-center">
              <Link
                to="/Availablepet"
                className="mt-5 bg-teal-400 rounded-xl justify-center py-2 px-2 hover:bg-teal-500 cursor-pointer"
              >
                Apply for Adoption
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Glancepart;