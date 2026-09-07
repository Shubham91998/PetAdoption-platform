import React, { useState, useEffect, useRef } from "react";
import { Search, Users, Heart, Stethoscope, ArrowRight, Sparkles, PawPrint, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

const Banner2 = () => {
  const [visible, setVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);
  const [imageScale, setImageScale] = useState(1);
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

  const handleZoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.1, 0.6));
  };

  const handleRotate = () => {
    setImageRotation(prev => prev + 90);
  };

  const handleReset = () => {
    setImageScale(1);
    setImageRotation(0);
  };

  const steps = [
    {
      id: "search",
      title: "Search Pet",
      icon: Search,
      description:
        "Adopt a dog or cat who's right for you. Simply enter your city above to start your search.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      iconBg: "bg-blue-100",
      delay: 100,
    },
    {
      id: "connect",
      title: "Connect",
      icon: Users,
      description:
        "Once you find a pet, click 'show number' to get contact info for their pet parent or rescue.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
      iconBg: "bg-purple-100",
      delay: 200,
    },
    {
      id: "adopt",
      title: "Adopt Love",
      icon: Heart,
      description:
        "The rescue or pet parents will walk you through their adoption process.",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      textColor: "text-rose-600",
      iconBg: "bg-rose-100",
      delay: 300,
    },
    {
      id: "vet",
      title: "Free Vet Consultation",
      icon: Stethoscope,
      description:
        "ThePetNest will help your pet to settle down in its new home.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      delay: 400,
    },
  ];

  return (
    <div className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-blue-50/20">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-100/10 rounded-full blur-3xl"></div>
        
        <div className="absolute top-20 right-20 opacity-5 rotate-12">
          <PawPrint size={60} className="text-blue-600" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-5 -rotate-12">
          <PawPrint size={40} className="text-purple-600" />
        </div>
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm border border-white/50 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600">How It Works</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            Your Pet Adoption Journey <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              With ThePetNest
            </span>
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Four simple steps to find and welcome your new furry family member
          </p>
        </div>

        {/* 50/50 Layout */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
          {/* Left - Interactive Image (50%) */}
          <div className="lg:w-1/2 flex items-center">
            <div className="relative group w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 overflow-hidden">
                {/* Image Container with Interactive Controls */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
                  <div 
                    className="transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `scale(${imageScale}) rotate(${imageRotation}deg)`,
                    }}
                  >
                    <img
                      className="w-full h-auto object-contain select-none"
                      src="/image/heading-removebg-preview.png"
                      alt="Pet Adoption Journey"
                      draggable={false}
                    />
                  </div>
                  
                  {/* Interactive Controls Overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={handleZoomIn}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg shadow-md 
                        hover:bg-white hover:shadow-lg transition-all duration-200
                        flex items-center justify-center text-slate-700 hover:text-blue-600"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg shadow-md 
                        hover:bg-white hover:shadow-lg transition-all duration-200
                        flex items-center justify-center text-slate-700 hover:text-blue-600"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRotate}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg shadow-md 
                        hover:bg-white hover:shadow-lg transition-all duration-200
                        flex items-center justify-center text-slate-700 hover:text-purple-600"
                      title="Rotate"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Zoom/Rotation Indicator */}
                  {(imageScale !== 1 || imageRotation !== 0) && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs">
                      <span>{(imageScale * 100).toFixed(0)}%</span>
                      {imageRotation !== 0 && (
                        <>
                          <span className="w-px h-4 bg-white/30"></span>
                          <span>{imageRotation}°</span>
                        </>
                      )}
                      <button
                        onClick={handleReset}
                        className="ml-1 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-white text-xs transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </div>

                {/* Image Info Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1.5">
                  <Heart className="w-3 h-3 fill-white" />
                  #Adoptions
                </div>

                {/* Hover hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  🖱️ Hover for controls
                </div>
              </div>

              {/* Image Interaction Hint */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 flex items-center gap-1">
                <span className="inline-block animate-pulse">👆</span>
                <span>Interactive Image</span>
              </div>
            </div>
          </div>

          {/* Right - Steps (50%) */}
          <div className="lg:w-1/2 space-y-4 sm:space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === index;

              return (
                <div
                  key={step.id}
                  className={`group relative flex items-start gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl 
                    bg-white border-2 transition-all duration-500 cursor-pointer
                    ${step.bgColor} ${step.borderColor}
                    hover:shadow-xl hover:-translate-y-1
                    animate-fadeInRight`}
                  style={{ animationDelay: `${step.delay}ms` }}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Progress line connecting steps */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-transparent opacity-30 hidden sm:block">
                      <div className={`h-0 bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-1000
                        ${visible ? 'h-full' : 'h-0'}`}
                        style={{ transitionDelay: `${step.delay + 300}ms` }}></div>
                    </div>
                  )}

                  {/* Step number */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color} 
                      flex items-center justify-center shadow-lg transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-6
                      ${isHovered ? 'shadow-xl' : ''}`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-slate-200 
                      flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-300
                        ${isHovered ? step.textColor : 'text-slate-800'}`}>
                        {step.title}
                      </h3>
                      {isHovered && (
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          Step {index + 1}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed mt-1">
                      {step.description}
                    </p>
                    
                    {/* Hover reveal */}
                    <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${step.textColor}
                      transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${step.color} 
                    opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-3xl`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm flex-shrink-0">
                <Heart className="w-6 h-6 text-white fill-white/50" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Ready to start your journey?</h3>
                <p className="text-blue-100 text-sm">Find your perfect companion today</p>
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
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Banner2;