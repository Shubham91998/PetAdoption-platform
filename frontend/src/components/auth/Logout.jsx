import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth.jsx";

const Logout = () => {
  const { authUser, setAuthUser } = useAuth();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser) {
      const currentTime = new Date().getTime();
      const loginTime = storedUser.loginTime;
      const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

      if (currentTime - loginTime > oneDay) {
        handleLogout(); // Auto logout after 1 day
      }
    }
  }, []);

  const handleLogout = () => {
    try {
      setAuthUser(null);
      localStorage.removeItem("user");
      toast.success("Session expired! Please log in again.");
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
