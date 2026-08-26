import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Heart, Home, Users, ChevronRight, Award, TrendingUp, Calendar } from "lucide-react";

const Glancepart = () => {
  const [totalPets, setTotalPets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    adoptionApplications: 0,
    dogsAdopted: 0,
    fostersOnboarded: 0,
  });

  useEffect(() => {
    const fetchPetCount = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || ''}/pets/api/pet-requests`
        );
        console.log("Fetched pet requests length:", res.data.length);
        const count = res.data.data?.length || 0;
        setTotalPets(count);
        setStats(prev => ({ ...prev, adoptionApplications: count }));
        
        // Simulate additional stats - replace with real API calls
        setStats(prev => ({ ...prev, dogsAdopted: Math.floor(count * 0.7) }));
        setStats(prev => ({ ...prev, fostersOnboarded: Math.floor(count * 0.3) }));
        
      } catch (err) {
        console.error("Error fetching pet data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetCount();
  }, []);

  const statItems = [
    {
      id: "adoption-applications",
      value: stats.adoptionApplications,
      label: "Adoption Applications",
      icon: Heart,
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      delay: 0,
    },
    {
      id: "dogs-adopted",
      value: stats.dogsAdopted,
      label: "Dogs Adopted",
      icon: Award,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      delay: 100,
    },
    {
      id: "fosters-onboarded",
      value: stats.fostersOnboarded,
      label: "Fosters Onboarded",
      icon: Users,
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      delay: 200,
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/10 rounded-full blur-3xl"></div>
          
          {/* Paw print decorations */}
          <div className="absolute top-10 left-10 opacity-5">
            <PawPrint size={60} className="text-slate-400" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-5 rotate-12">
            <PawPrint size={40} className="text-slate-400" />
          </div>
        </div>

        <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - About Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Image */}
                <div className="relative w-full sm:w-56 h-56 flex-shrink-0 order-1 sm:order-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-teal-400 rounded-xl rotate-3"></div>
                  <img
                    src="/image/dog2.jpg"
                    alt="Adopt a pet"
                    className="relative w-full h-full object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 order-2 sm:order-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"></div>
                    <PawPrint size={18} className="text-cyan-600" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Pet <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">At A Glance</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                    Furever Friends is a passionate initiative dedicated to helping
                    stray dogs and cats find their forever homes. We are a modern
                    animal welfare platform that utilizes innovative approaches to
                    connect our lovable pets with caring individuals who are ready
                    to be responsible pet owners.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                    Furever Friends is pioneering a streamlined, foster-based adoption process.
                    We collaborate with a close-knit network of carefully vetted foster caregivers
                    to ensure that all animals become familiar with a loving home environment
                    before being adopted.
                  </p>
                  <button className="mt-5 group inline-flex items-center gap-2 text-cyan-700 font-semibold hover:text-cyan-800 transition-all">
                    <span>Know More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Section */}
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className={`relative ${item.bgColor} rounded-xl p-5 border ${item.borderColor} 
                        transition-all duration-300 hover:scale-105 hover:shadow-lg group
                        animate-fadeInUp`}
                      style={{ animationDelay: `${item.delay}ms` }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} 
                          flex items-center justify-center text-white shadow-lg mb-3
                          group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {isLoading ? (
                          <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mb-1"></div>
                        ) : (
                          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                            {item.value.toLocaleString()}
                          </h3>
                        )}
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-xl p-6 shadow-xl 
                transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                      <Heart className="w-6 h-6 text-white fill-white/50" />
                    </div>
                    <div className="text-white">
                      <h4 className="text-lg font-bold">Ready to Make a Difference?</h4>
                      <p className="text-sm text-cyan-50/80">Start your adoption journey today</p>
                    </div>
                  </div>
                  <Link
                    to="/Availablepet"
                    className="group bg-white text-cyan-700 px-6 py-2.5 rounded-xl font-semibold 
                      hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl 
                      transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    <span>Apply for Adoption</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Glancepart;