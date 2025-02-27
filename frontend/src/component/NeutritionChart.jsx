import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const NutritionChart = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/create", userInfo);
      
      console.log("Response from server:", res.data);
      if (res.data) {
        console.log(res.data);
        toast.success("Signup successful! Downloading the chart...");
        downloadPDF(); 
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const downloadPDF = () => {
    fetch("/Pet-Nutrition.pdf") 
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
        alink.download = "Pet-Nutrition.pdf";
        alink.click();
      })
      .catch((error) => {
        toast.error("Error downloading the PDF: " + error.message);
      });
  };

  return (
    <div>
      <div className="grid grid-rows-2 gap-10 sm:flex py-10 bg-orange-500 md:px-32 md:justify-between">
        <div className="pl-7 sm:px-5 pb-5">
          <h2 className="py-3 font-serif text-2xl">
            <b>Pet Nutrition Chart</b>
          </h2>
          <img
            className="w-full sm:w-72 h-72 rounded-md object-cover"
            src="image/dog nutrition.webp"
            alt="Pet Nutrition Chart"
          />
        </div>

        <div className="px-10 mx-5 pt-5 sm:px-5 bg-white rounded-md">
          <h2>Fill up the form to get the FREE nutrition chart!</h2>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="py-10 grid grid-rows-2 gap-5">
              <input
                className="border border-slate-400 rounded-md h-10 px-3"
                type="text"
                {...register("fullname", { required: true })}
                placeholder="Full Name"
              />
              {errors.fullname && (
                <span className="text-red-500">This field is required</span>
              )}
              <input
                className="border border-slate-400 rounded-md h-10 px-3"
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
              <input
                className="border border-slate-400 rounded-md h-10 px-3"
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <button
              type='submit'
              className="bg-blue-500 py-2 px-5 sm:px-10 rounded-lg mx-10 text-white"
            >
              Submit & Download
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;