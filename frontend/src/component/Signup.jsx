import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Login from './Login';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isAdmin, setIsAdmin] = useState(false); // State to toggle admin registration

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      address: data.address,
      phone: data.phone,
      email: data.email,
      password: data.password,
      userType: isAdmin ? 'admin' : 'user', // Include userType in the request
      secretKey: isAdmin ? data.secretKey : undefined, // Include secretKey only for admin
    };

    try {
      const res = await axios.post('http://localhost:4001/user/signup', userInfo);
      if (res.data) {
        toast.success('Signup Successful');
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user data to localStorage
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error(err.response.data.message || 'An error occurred during signup.'); // Show error message
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* Close modal button */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>

              {/* Admin Toggle */}
              <div className="mt-4 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                    className="mr-2"
                  />
                  Register as Admin
                </label>
              </div>

              {/* Full Name */}
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register('fullname', { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Address */}
              <div className="mt-4 space-y-2">
                <span>Address</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your Address"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register('address', { required: true })}
                />
                <br />
                {errors.address && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Phone */}
              <div className="mt-4 space-y-2">
                <span>Mobile No.</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your Mobile No."
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register('phone', {
                    required: true,
                    pattern: /^[0-9]+$/, // Ensure phone contains only digits
                  })}
                />
                <br />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    {errors.phone.type === 'pattern'
                      ? 'Phone number must contain only digits'
                      : 'This field is required'}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register('email', { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password" // Changed to password type
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register('password', { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Secret Key (Only for Admin) */}
              {isAdmin && (
                <div className="mt-4 space-y-2">
                  <span>Secret Key</span>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter admin secret key"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register('secretKey', { required: isAdmin })}
                  />
                  <br />
                  {errors.secretKey && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>
              )}

              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
                <p className="text-xl">
                  Have an account?{' '}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() => document.getElementById('my_modal_3').showModal()}
                  >
                    Login
                  </button>{' '}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;