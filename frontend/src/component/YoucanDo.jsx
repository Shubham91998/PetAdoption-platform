import React, { useState } from 'react';
import { Heart, Home, Users, Utensils, DollarSign, ChevronRight, PawPrint } from 'lucide-react';

const YoucanDo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const actions = [
    {
      id: 'foster',
      title: 'Foster',
      icon: Home,
      description: 'Open your heart and home to an animal in need. Provide temporary care and love.',
      image: '/image/dog1.jpg',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      hoverColor: 'hover:border-amber-400',
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      icon: Users,
      description: 'Join our team of dedicated volunteers. Make a difference with your time and skills.',
      image: '/image/dog2.jpg',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:border-blue-400',
    },
    {
      id: 'feed',
      title: 'Feed the Needy',
      icon: Utensils,
      description: 'Help provide nutritious meals to hungry animals waiting for their forever home.',
      image: '/image/dog3.jpg',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      hoverColor: 'hover:border-emerald-400',
    },
    {
      id: 'donate',
      title: 'Donate',
      icon: DollarSign,
      description: 'Your generous contribution helps us rescue, heal, and care for more animals.',
      image: '/image/dog4.jpg',
      color: 'from-rose-400 to-pink-500',
      bgColor: 'bg-rose-50',
      hoverColor: 'hover:border-rose-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative paw prints background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 transform rotate-12">
          <PawPrint size={80} className="text-slate-400" />
        </div>
        <div className="absolute bottom-20 right-10 transform -rotate-12">
          <PawPrint size={60} className="text-slate-400" />
        </div>
        <div className="absolute top-1/2 left-1/4 transform -rotate-45">
          <PawPrint size={40} className="text-slate-400" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section with animated border */}
        <div className="relative mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"></div>
            <PawPrint size={20} className="text-cyan-600" />
            <div className="h-1 w-12 bg-gradient-to-l from-cyan-500 to-teal-400 rounded-full"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
              What You Can Do?
            </span>
          </h2>
          
          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
            Do you want to bring about a positive change in the lives of our voiceless friends? 
            Here's a great opportunity to show your compassion and love. 
            <span className="block text-sm text-slate-400 mt-1">Choose the one that suits you best.</span>
          </p>

          {/* Animated underline */}
          <div className="mt-4 h-0.5 w-32 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-pulse"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isHovered = hoveredCard === action.id;

            return (
              <div
                key={action.id}
                className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-2 
                  ${action.hoverColor} border-2 border-transparent hover:shadow-2xl`}
                onMouseEnter={() => setHoveredCard(action.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container with overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={action.image}
                    alt={action.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${action.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  
                  {/* Floating icon on image */}
                  <div className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md 
                    transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}`}>
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${
                      isHovered ? 'text-cyan-600' : 'text-slate-600'
                    }`} />
                  </div>

                  {/* Gradient badge */}
                  <div className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${action.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${
                      isHovered ? 'text-cyan-700' : 'text-slate-800'
                    }`}>
                      {action.title}
                    </h3>
                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                      isHovered ? 'translate-x-1 text-cyan-600' : 'text-slate-300'
                    }`} />
                  </div>
                  
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {action.description}
                  </p>

                  {/* Interactive CTA Button */}
                  <button
                    className={`mt-4 w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 
                      flex items-center justify-center gap-2 group/btn
                      ${isHovered 
                        ? `bg-gradient-to-r ${action.color} text-white shadow-lg shadow-${action.id}-200/50 scale-[1.02]` 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    <span>Get Started</span>
                    <Heart className={`w-4 h-4 transition-all duration-300 ${
                      isHovered ? 'fill-white animate-pulse' : ''
                    }`} />
                  </button>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-3xl`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <PawPrint size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Together, We Can Make a Difference</h3>
                  <p className="text-cyan-50/80">Every small act of kindness creates a ripple of change.</p>
                </div>
              </div>
              <button className="px-8 py-3 bg-white text-cyan-700 rounded-xl font-semibold hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 group">
                <span>Join Us Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoucanDo;