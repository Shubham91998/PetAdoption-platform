import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  PawPrint,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ChevronRight,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Adopt a Pet", path: "/adopt" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Pet Care Blog", path: "/blog" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
    { icon: Youtube, href: "#", color: "hover:bg-red-600" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="absolute top-10 right-10 opacity-5 rotate-12">
          <PawPrint size={60} className="text-amber-400" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-5 -rotate-12">
          <PawPrint size={40} className="text-amber-400" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500/20 p-2 rounded-xl">
                <PawPrint className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold">
                <span className="text-amber-400">The</span>
                <span className="text-white">PetNest</span>
              </h2>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Your trusted{" "}
              <span className="text-rose-400 font-semibold">pet adoption platform</span>,
              helping you find a perfect pet and create lasting bonds with your
              furry friend!
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Subscribe to our newsletter
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm 
                    placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 
                    focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-semibold 
                    transition-all hover:scale-105 active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-400 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 
                      flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-400/50 group-hover:text-amber-400 
                      group-hover:translate-x-1 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-400 rounded-full"></span>
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 
                  group-hover:scale-110 transition-transform" />
                <span className="text-sm text-slate-300">
                  Galgotias University, <br />
                  Uttar Pradesh, India
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 
                  group-hover:scale-110 transition-transform" />
                <a href="tel:+919576430463" className="text-sm text-slate-300 hover:text-amber-400 transition-colors">
                  +91-9576430463
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 
                  group-hover:scale-110 transition-transform" />
                <a href="mailto:kshubham5642@gmail.com" className="text-sm text-slate-300 hover:text-amber-400 transition-colors break-all">
                  kshubham5642@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social & Support */}
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-400 rounded-full"></span>
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 
                      flex items-center justify-center text-slate-300 hover:text-white 
                      transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Support Badge */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" />
                <div>
                  <p className="text-sm font-semibold text-white">24/7 Support</p>
                  <p className="text-xs text-slate-400">We're here to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} ThePetNest | Designed with 
              <Heart className="inline w-4 h-4 text-rose-400 mx-1 fill-rose-400/30" />
              by <span className="text-amber-400 font-medium">Shubham Kumar</span>
            </p>
            
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <span className="w-px h-4 bg-slate-600"></span>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              <span className="w-px h-4 bg-slate-600"></span>
              <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;