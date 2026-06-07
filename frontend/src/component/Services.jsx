import React, { useState } from "react";

const Services = () => {
  return (
    <>
      <div>
        <ul className="list-none">
          <ul className="bg-gray-200 p-4 mt-16 rounded shadow-lg border border-gray-300">
            <div className="flex justify-between">
              <div className="flex flex-col space-y-2">
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#pet-grooming"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Grooming Services
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#vet-consultation"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Vet Consultations
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#behavior-training"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Behavior Training
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#walking-services"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Dog Walking
                  </a>
                </li>
                <li>
                  <a
                    href="#moving"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Pet Relocation
                  </a>
                </li>
              </div>
              <div className="flex flex-col space-y-2">
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#insurance-options"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Insurance Options
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#our-community"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Community Engagement
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#boarding-services"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Pet Boarding
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#rehoming"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Rehome a Pet
                  </a>
                </li>
                <li>
                  <a
                    href="#adopt"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Adopt a New Friend
                  </a>
                </li>
              </div>
              <div className="flex flex-col space-y-2">
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#blog"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Pet Care Blog
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#get-in-touch"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Get in Touch
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#report-abuse"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Report Abuse
                  </a>
                </li>
                <li className="border-b border-gray-300 pb-2">
                  <a
                    href="#breeding-services"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Breeding Services
                  </a>
                </li>
                <li>
                  <a
                    href="#register-breeding"
                    className="block p-2 text-blue-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    Register for Breeding
                  </a>
                </li>
              </div>
            </div>
          </ul>
        </ul>
      </div>
    </>
  );
};

export default Services;
