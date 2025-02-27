import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import {ClipLoader} from 'react-spinners';

const AdoptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    // Retrieve user ID from local storage
    const userString = localStorage.getItem("user");
    
    let userId = null;
  
    try {
      const user = userString?JSON.parse(userString) : null;
      console.log(user)
      userId = user? user._id : null;
      console.log(userId)
       // Assuming user object has an _id field
    } catch (error) {
      console.error("Error parsing user from local storage:", error);
      toast.error("Failed to retrieve user information.");
      setIsSubmitting(false)
      return; // Exit if user information is invalid
    }
  
    if (!userId) {
      toast.error("User  not logged in. Please log in to submit a pet adoption request.");
      setIsSubmitting(false)
      return; // Exit if user ID is not found
    }
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("breed", data.breed);
    formData.append("age", data.age);
    formData.append("type", data.type);
    formData.append("category", data.category);
    formData.append("image", data.image[0]); // Access the file from the input

    // Include user ID in the form data
    formData.append("userid", userId);
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/pets/petpost`, formData);
      console.log(res.data);
      toast.success("Pet adoption request submitted successfully");
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
    finally{
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-3/5">
        <h2 className="text-2xl font-bold mb-6 text-center">Pet Upload Form</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name='name'
            {...register("name", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name='breed'
            {...register("breed", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.breed && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name='age'
            {...register("age", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.age && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="type">Pet Type</label>
          <select
            id="type"
            name='type'
            {...register("type", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select type</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
          <select
            id="category"
            name='category'
            {...register("category", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select category</option>
 <option value="Adoptable">Adoptable</option>
            <option value="Foster">Foster</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
          {errors.category && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name='image'
            accept="image/*"
            {...register("image", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.image && <span className="text-red-500">This field is required</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isSubmitting ? (<ClipLoader color='#ffffff' size={20} />) : ("Submit Adoption Request")}
          
        </button>
      </form>
    </div>
  );
};

export default AdoptionForm;