import React, { useState } from "react";

const Services = () => {
  const [activeLink, setActiveLink] = useState("");
  const [pets, setPets] = useState([]);

  const serviceLinks = [
    { id: "pet-grooming", label: "🐕 Grooming Services", section: "grooming" },
    { id: "vet-consultation", label: "🩺 Vet Consultations", section: "vet" },
    { id: "behavior-training", label: "🎓 Behavior Training", section: "training" },
    { id: "walking-services", label: "🚶 Dog Walking", section: "walking" },
    { id: "moving", label: "📦 Pet Relocation", section: "relocation" },
    { id: "insurance-options", label: "🛡️ Insurance Options", section: "insurance" },
    { id: "our-community", label: "🤝 Community Engagement", section: "community" },
    { id: "boarding-services", label: "🏠 Pet Boarding", section: "boarding" },
    { id: "rehoming", label: "🏡 Rehome a Pet", section: "rehoming" },
    { id: "adopt", label: "❤️ Adopt a New Friend", section: "adopt" },
    { id: "blog", label: "📝 Pet Care Blog", section: "blog" },
    { id: "get-in-touch", label: "📞 Get in Touch", section: "contact" },
    { id: "report-abuse", label: "🚨 Report Abuse", section: "report" },
    { id: "breeding-services", label: "🐾 Breeding Services", section: "breeding" },
    { id: "register-breeding", label: "📋 Register for Breeding", section: "register" },
  ];

  const handleScroll = (sectionId, linkId) => {
    setActiveLink(linkId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  // pet fetch from backend
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/original/pets/getallpet`)
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);



  return ( 
    <>
    <div className="relative mt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
      
      <div className="relative px-4 py-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-gray-600 mt-2 text-lg">Everything your pet needs under one roof</p>
        </div>

        <ul className="list-none">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceLinks.map((link, index) => (
                <li 
                  key={link.id}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <a
                    href={`#${link.section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(link.section, link.id);
                    }}
                    className={`block p-3 rounded-xl transition-all duration-300 ${
                      activeLink === link.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{link.label.split(" ")[0]}</span>
                      <span className="font-medium">{link.label.split(" ").slice(1).join(" ")}</span>
                    </span>
                  </a>
                </li>
              ))}
            </div>
          </div>
        </ul>

        {/* Quick Stats Banner */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">{pets.length}+</div>
            <div className="text-sm">Happy Pets</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-teal-400 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm">Emergency Care</div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">{pets.length}+</div>
            <div className="text-sm">Expert Vets</div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-sm">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default Services;