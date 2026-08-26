import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Download, FileText, Mail, Lock, User, PawPrint, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const NutritionChart = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/create`, userInfo);
      
      console.log("Response from server:", res.data);
      if (res.data) {
        console.log(res.data);
        toast.success("Signup successful! Downloading the chart...");
        await downloadPDF();
        reset();
        toast.success("Pet Nutrition Chart downloaded successfully! 🎉");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    setIsDownloading(true);
    return fetch("/Pet-Nutrition.pdf")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Pet-Nutrition-Chart.pdf";
        document.body.appendChild(alink);
        alink.click();
        document.body.removeChild(alink);
        window.URL.revokeObjectURL(fileURL);
        setIsDownloading(false);
      })
      .catch((error) => {
        toast.error("Error downloading the PDF: " + error.message);
        setIsDownloading(false);
      });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-100/10 rounded-full blur-3xl"></div>
        
        {/* Floating decorations */}
        <div className="absolute top-20 left-10 opacity-5 rotate-12">
          <PawPrint size={80} className="text-amber-600" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 -rotate-12">
          <PawPrint size={60} className="text-orange-600" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-5">
          <Sparkles size={40} className="text-amber-600" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Info & Image */}
          <div className="space-y-6">
            {/* Header */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Free Resource</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight">
                Pet <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Nutrition</span>
                <br />
                <span className="text-3xl sm:text-4xl">Chart</span>
              </h2>
              
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Get your <strong className="text-amber-700">FREE</strong> comprehensive nutrition chart and learn how to keep your furry friend healthy and happy!
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200">
                  <CheckCircle className="w-4 h-4" />
                  Vet Approved
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200">
                  <CheckCircle className="w-4 h-4" />
                  Easy to Read
                </span>
                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium border border-purple-200">
                  <CheckCircle className="w-4 h-4" />
                  Instant Download
                </span>
              </div>
            </div>

            {/* Image Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-white/50">
                <img
                  className="w-full h-64 sm:h-80 object-cover"
                  src="image/dog nutrition.webp"
                  alt="Pet Nutrition Chart"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-slate-700">PDF Guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-3xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-4 py-1.5 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">Limited Time Offer</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Get Your <span className="text-amber-600">Free</span> Nutrition Chart
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Fill in the details below to download instantly
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
                        ${errors.fullname 
                          ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                          : 'border-slate-200 focus:ring-amber-400 focus:border-amber-400 hover:border-amber-300'
                        }`}
                      type="text"
                      {...register("fullname", { 
                        required: "Full name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })}
                      placeholder="Full Name"
                    />
                  </div>
                  {errors.fullname && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.fullname.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
                        ${errors.email 
                          ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                          : 'border-slate-200 focus:ring-amber-400 focus:border-amber-400 hover:border-amber-300'
                        }`}
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      placeholder="Email Address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
                        ${errors.password 
                          ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                          : 'border-slate-200 focus:ring-amber-400 focus:border-amber-400 hover:border-amber-300'
                        }`}
                      type="password"
                      {...register("password", { 
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                      placeholder="Create Password"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isDownloading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3.5 rounded-xl font-semibold 
                    hover:from-amber-600 hover:to-orange-600 transition-all duration-300 
                    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                    flex items-center justify-center gap-3 group"
                >
                  {isSubmitting || isDownloading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isDownloading ? 'Downloading...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      <span>Submit & Download</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-slate-400 mt-3">
                  By submitting, you agree to receive updates and special offers.
                  <br />
                  <span className="text-amber-500">✓</span> No spam, unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;