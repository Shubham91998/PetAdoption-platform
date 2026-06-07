import React, { useState } from "react";

const Services2 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "🐕 Pet Care Services",
      description: "From regular health check-ups and vaccinations to advanced treatments, our team of skilled veterinarians is here to keep your dog healthy and happy. We also offer diagnostic testing, dental care, and emergency services.",
      image: "https://images.unsplash.com/photo-1632236542159-809925d85fc0?q=80&w=870&auto=format&fit=crop",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      badge: "⭐ Premium Care"
    },
    {
      id: 2,
      title: "📦 Pet Relocation Services",
      description: "Our pet relocation services ensure a smooth and stress-free move for your furry companions. From transportation arrangements to health certifications, we handle every detail with care and professionalism.",
      image: "https://plus.unsplash.com/premium_photo-1661676191997-0c0cece2a683?q=80&w=870&auto=format&fit=crop",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      badge: "✈️ Global Service"
    },
    {
      id: 3,
      title: "🚶 Dog Walking Services",
      description: "Our dog walking services provide your furry friend with the exercise, care, and companionship they need. Whether it's a quick walk or a longer adventure, our experienced walkers ensure your dog stays happy and healthy.",
      image: "https://media.istockphoto.com/id/1749214597/photo/low-section-of-a-dog-walker-walking-with-group-of-dogs-on-their-leash-on-the-street-new-york.jpg?s=612x612&w=0&k=20&c=KzHrtB6RLk3Shz1F1za_83xl2yC3u9jrTLKdMjWlmDI=",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      badge: "🏃 Active & Fun"
    },
    {
      id: 4,
      title: "🎓 Dog Training Services",
      description: "Professional behavior training to help your dog become a well-mannered family member. Our certified trainers use positive reinforcement techniques for obedience, agility, and specialized training programs.",
      image: "https://plus.unsplash.com/premium_photo-1679521026509-ecf65d3381f5?w=400&auto=format&fit=crop&q=60",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      badge: "🎯 Certified Trainers"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative px-4 py-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-4 animate-bounce">
            🐾 Pet Care Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Comprehensive Pet Services
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            We provide everything your furry friend needs for a happy, healthy life
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`${service.bgColor} rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Badge */}
              <div className="relative">
                <div className={`absolute top-4 right-4 z-10 bg-gradient-to-r ${service.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                  {service.badge}
                </div>
                
                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                    src={service.image}
                    alt={service.title}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-0 hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Interactive Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className={`px-4 py-2 bg-gradient-to-r ${service.color} text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}>
                    <span>Book Now</span>
                    <span className="text-lg">→</span>
                  </button>
                  <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
                    Learn More
                  </button>
                </div>

                {/* Animated Features */}
                {hoveredCard === service.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-slideIn">
                    <div className="flex gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">✓ 24/7 Support</span>
                      <span className="flex items-center gap-1">✓ Certified Experts</span>
                      <span className="flex items-center gap-1">✓ Best Price</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white transform hover:scale-105 transition-all duration-500">
          <h3 className="text-3xl font-bold mb-3">Need Emergency Pet Care?</h3>
          <p className="text-lg mb-4 opacity-95">Our team is available 24/7 for all pet emergencies</p>
          <button className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            🚨 Call Emergency: +1 234 567 890
          </button>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Services2;