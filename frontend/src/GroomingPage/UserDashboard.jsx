// frontend/src/GroomingPage/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Scissors, MessageCircle, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { bookingService } from '../GroomingPage/services/bookingService.js';

const UserDashboard = () => {
  const { authUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalSpent: 0
  });

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const data = await bookingService.getUserBookings();
      setBookings(data);
      
      // Calculate stats
      const completed = data.filter(b => b.status === 'Completed');
      const pending = data.filter(b => b.status === 'Pending');
      const totalSpent = completed.reduce((sum, b) => sum + b.price, 0);
      
      setStats({
        totalBookings: data.length,
        completedBookings: completed.length,
        pendingBookings: pending.length,
        totalSpent: totalSpent
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRecentBookings = () => {
    return bookings.slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {authUser?.name}!</h1>
          <p className="text-blue-100">Manage your pet grooming appointments and track your bookings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
              <Calendar className="text-blue-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedBookings}</p>
              </div>
              <Star className="text-green-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </div>
              <Clock className="text-yellow-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-purple-600">₹{stats.totalSpent}</p>
              </div>
              <Scissors className="text-purple-600" size={40} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/groomers" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Book New Service</h3>
                <p className="text-gray-600">Find professional groomers near you</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition">
                <Scissors className="text-blue-600" size={24} />
              </div>
            </div>
          </Link>
          
          <Link to="/my-bookings" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">View All Bookings</h3>
                <p className="text-gray-600">Track your appointment history</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition">
                <Calendar className="text-green-600" size={24} />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          {loading ? (
            <div className="text-center py-8">Loading bookings...</div>
          ) : getRecentBookings().length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No bookings yet</p>
              <Link to="/groomers" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Book Your First Grooming Service
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {getRecentBookings().map(booking => (
                <div key={booking._id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.service}</h3>
                      <p className="text-gray-600">with {booking.provider?.fullName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                      </p>
                      <p className="text-sm mt-1">Pet: {booking.petName} ({booking.petType})</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                      <p className="text-lg font-semibold mt-2">₹{booking.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-3">
                    <Link 
                      to={`/chat/${booking.provider?._id}`}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <MessageCircle size={16} className="mr-1" />
                      Message Provider
                    </Link>
                    {booking.status === 'Completed' && !booking.review && (
                      <button className="text-green-600 hover:text-green-700">
                        Write a Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;