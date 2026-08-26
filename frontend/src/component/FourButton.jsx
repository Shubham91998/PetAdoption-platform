import React, { useState, useEffect, useRef } from 'react';
import { Search, Video, Calendar, Heart, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

const FourButton = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      id: 'search',
      title: 'Search',
      icon: Search,
      description: 'Simply enter your city to start your search',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      gradient: 'hover:shadow-blue-200/50',
      delay: 0,
    },
    {
      id: 'meet',
      title: 'Meet',
      icon: Calendar,
      description: 'Schedule your appointment to meet the pet you love',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      gradient: 'hover:shadow-purple-200/50',
      delay: 150,
    },
    {
      id: 'meet-online',
      title: 'Meet Online',
      icon: Video,
      description: 'Meet the pet with an online video chat',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-600',
      gradient: 'hover:shadow-amber-200/50',
      delay: 300,
    },
    {
      id: 'adopt',
      title: 'Adopt',
      icon: Heart,
      description: 'Finally adopt the dog or cat you love',
      color: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-600',
      gradient: 'hover:shadow-rose-200/50',
      delay: 450,
    },
  ];

  return (
    <div className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-100/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm border border-white/50 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600">Simple Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            How It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Four simple steps to find and adopt your new furry family member
          </p>
          
          {/* Step indicators */}
          <div className="hidden sm:flex items-center justify-center gap-3 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${index === 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-slate-200 mx-1">
                    <div className="h-full w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000"
                         style={{ width: visible ? '100%' : '0%', transitionDelay: `${step.delay + 200}ms` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={step.id}
                className={`group relative bg-white rounded-2xl p-6 border-2 transition-all duration-500 
                  ${step.bgColor} ${step.borderColor} 
                  hover:shadow-xl ${step.gradient}
                  hover:-translate-y-2 hover:border-transparent
                  animate-fadeInUp`}
                style={{ animationDelay: `${step.delay}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${step.color} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-500 rounded-bl-3xl`}></div>

                {/* Step number badge */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full ${step.bgColor} border ${step.borderColor}
                  flex items-center justify-center text-xs font-bold ${step.textColor} transition-all duration-300
                  group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:text-white ${step.color}`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} 
                  flex items-center justify-center mb-4 shadow-lg transition-all duration-500
                  group-hover:scale-110 group-hover:rotate-3
                  ${isHovered ? 'shadow-xl' : ''}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold transition-colors duration-300 mb-2
                  ${isHovered ? step.textColor : 'text-slate-800'}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>

                {/* Hover action hint */}
                <div className={`mt-4 flex items-center gap-1 ${step.textColor} font-medium text-sm
                  transition-all duration-300 group-hover:gap-2`}>
                  <span>Learn more</span>
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 
                    ${isHovered ? 'translate-x-1' : ''}`} />
                </div>

                {/* Progress bar on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} 
                  rounded-b-2xl transition-all duration-700 ease-out
                  ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`h-full bg-white/30 rounded-b-2xl transition-all duration-700
                    ${isHovered ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Ready to find your perfect companion?</h3>
                <p className="text-blue-100 text-sm">Start your adoption journey today</p>
              </div>
            </div>
            <button className="group bg-white text-blue-700 px-8 py-2.5 rounded-xl font-semibold 
              hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl 
              transform hover:-translate-y-1 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
    </div>
  );
};

export default FourButton;