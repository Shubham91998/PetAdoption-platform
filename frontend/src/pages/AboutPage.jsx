import React from "react";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-10 px-5 mt-10 w-full">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-4">
          About Us
        </h1>

        {/* About Shubham */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
          <p className="text-gray-700 mt-2">
            Hi, I&apos;m <strong>Shubham Kumar</strong>, a passionate web developer with a deep 
            interest in building meaningful projects. Coming from a farming background, 
            I have always been driven by the idea of using technology to create positive 
            change. My journey into web development started with learning HTML, CSS, and JavaScript, 
            and I have since expanded my skills to work with React, Node.js, Java, and databases like 
            MySQL and MongoDB.
          </p>
          <p className="text-gray-700 mt-2">
            I believe in leveraging technology to solve real-world problems, and this pet 
            adoption platform is a step towards that vision.
          </p>
        </section>

        {/* About the Pet Adoption Platform */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            About Our Pet Adoption Platform
          </h2>
          <p className="text-gray-700 mt-2">
            Our platform, <strong>Furever Friends</strong>, is dedicated to helping homeless 
            pets find loving homes. Many stray dogs and cats struggle to survive on the streets, 
            and countless pets are abandoned each year. Our mission is to connect these pets with 
            caring individuals who are ready to provide them with a second chance at life.
          </p>
          <p className="text-gray-700 mt-2">
            The platform simplifies the pet adoption process by allowing users to:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-2">
            <li>View available pets and their adoption status</li>
            <li>Submit adoption applications online</li>
            <li>Track the progress of their adoption request</li>
            <li>Connect with foster caregivers for better integration</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Join Us</h2>
          <p className="text-gray-700 mt-2">
            Whether you are looking to adopt, foster, or support our mission, 
            we welcome you to be a part of this journey. Let&apos;s make a difference together!
          </p>
          <Link to="/AvailablePet">
          <button className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
            Explore Available Pets
          </button>
          </Link>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
