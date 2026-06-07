import React from 'react'
import toast from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutePro = () => {
 const user = JSON.parse(localStorage.getItem("user"));
 if (!user || user.userType !== "admin") {
    alert("Invalid admin!")
    return <Navigate to="/" />;
}

return <Outlet />;

}

export default AdminRoutePro
