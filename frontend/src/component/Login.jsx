import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isAdmin, setIsAdmin] = useState(false); // State to toggle between user and admin login

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
      userType: isAdmin ? 'admin' : 'user', // Include userType in the request
      secretKey: isAdmin ? data.secretKey : undefined, // Include secretKey only for admin
    };

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Login successful");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setTimeout(() => {
            
            window.location.reload();
          }, 1000); // Save user data to localStorage
          document.getElementById("my_modal_3").close(); // Close the modal
          navigate(from, { replace: true }); // Redirect the user
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error(err.response.data.message || "Invalid email or password"); // Show error message
        } else {
          toast.error("Network error. Please try again.");
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close modal button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            {/* Toggle for Admin Login */}
            <div className="mt-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                  className="mr-2"
                />
                Login as Admin
              </label>
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
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
                  {...register("secretKey", { required: isAdmin })}
                />
                <br />
                {errors.secretKey && (
                  <span className="text-sm text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-around mt-6">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;