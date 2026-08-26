import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, PawPrint, Upload, ArrowRight, ChevronRight, Sparkles, Shield, Clock } from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      title: "Find Your Perfect Companion",
      subtitle: "Every Pet Deserves a Good Home. #AdoptLove",
      badge: "🐾 10K+ Happy Adoptions",
    },
    {
      title: "Give a Pet a Second Chance",
      subtitle: "Your love can change a life forever. #AdoptDontShop",
      badge: "❤️ 5K+ Pets Rescued",
    },
    {
      title: "Join the Adoption Movement",
      subtitle: "Be the reason a pet finds their forever home. #FureverFriends",
      badge: "⭐ 4.9/5 Adopter Rating",
    },
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 10 + 10 + "s",
            }}
          />
        ))}
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent"></div>

      <div className="relative max-w-screen-2xl mx-auto h-[80vh] min-h-[500px] max-h-[700px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/image/Banner.webp"
            alt="Pet Adoption Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-slideDown">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-medium text-white/90">
                {slides[currentSlide].badge}
              </span>
            </div>

            {/* Title with Animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-slideDown" style={{ animationDelay: "0.1s" }}>
              {slides[currentSlide].title}
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent mt-2">
                #AdoptLove
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-2xl mb-8 animate-slideDown" style={{ animationDelay: "0.2s" }}>
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slideDown" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/AvailablePet"
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                  text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold 
                  shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40
                  transition-all duration-300 transform hover:-translate-y-1
                  flex items-center gap-2"
              >
                <Heart className="w-5 h-5 group-hover:fill-white transition-colors" />
                <span>Adopt Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/Form"
                className="group bg-white/10 backdrop-blur-sm border border-white/30 
                  hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold
                  transition-all duration-300 transform hover:-translate-y-1
                  flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Your Pet</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 animate-slideDown" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 text-blue-200/80">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Trusted Platform</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200/80">
                <Clock className="w-4 h-4" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200/80">
                <PawPrint className="w-4 h-4" />
                <span className="text-sm">10K+ Pets Adopted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "w-8 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right side decorative image */}
        <div className="absolute bottom-12 right-8 lg:right-16 hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-rose-400/20 rounded-full blur-2xl animate-pulse"></div>
            <img
              className="relative w-48 h-auto object-contain drop-shadow-2xl"
              src="/image/heading3.png"
              alt="Pet Adoption"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          75% { transform: translateY(10px) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Banner;