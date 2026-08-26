// frontend/src/pages/ProviderDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchProviderData();
    fetchBookings();
  }, []);

  const fetchProviderData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/providers/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProvider(response.data);
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings/provider/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Booking ${status.toLowerCase()} successfully`);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const updateAvailability = async (availability) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/providers/dashboard',
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProvider({ ...provider, availability });
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Accepted: 'bg-blue-100 text-blue-800',
      Rejected: 'bg-red-100 text-red-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return booking.status === 'Pending' || booking.status === 'Accepted';
    }
    if (activeTab === 'completed') {
      return booking.status === 'Completed';
    }
    if (activeTab === 'cancelled') {
      return booking.status === 'Cancelled' || booking.status === 'Rejected';
    }
    return true;
  });

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Provider Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your grooming services</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={provider?.availability}
                onChange={(e) => updateAvailability(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="Available">🟢 Available</option>
                <option value="Busy">🟡 Busy</option>
                <option value="Offline">🔴 Offline</option>
              </select>
              <img
                src={provider?.profilePhoto}
                alt={provider?.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600">Total Bookings</p>
              <p className="text-2xl font-bold">{provider?.totalBookings}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600">Rating</p>
              <p className="text-2xl font-bold">{provider?.rating?.toFixed(1) || 0} ★</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600">Total Reviews</p>
              <p className="text-2xl font-bold">{provider?.totalReviews}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600">Service Radius</p>
              <p className="text-2xl font-bold">{provider?.serviceRadius} km</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'upcoming'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upcoming Bookings
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'completed'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'cancelled'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Cancelled/Rejected
              </button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="divide-y">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No bookings found
              </div>
            ) : (
              filteredBookings.map(booking => (
                <div key={booking._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{booking.petName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Service: {booking.service}</p>
                        <p>Pet: {booking.petType} ({booking.breed || 'Unknown breed'})</p>
                        <p>Owner: {booking.ownerName}</p>
                        <p>Phone: {booking.phone}</p>
                        <p>Price: ₹{booking.price}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {booking.bookingTime}
                          </span>
                          <span className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {booking.address}
                          </span>
                        </div>
                        {booking.specialInstructions && (
                          <p className="mt-2 text-yellow-600">
                            Note: {booking.specialInstructions}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {booking.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateBookingStatus(booking._id, 'Accepted')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, 'Rejected')}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
                        >
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </button>
                      </div>
                    )}
                    {booking.status === 'Accepted' && (
                      <button
                        onClick={() => updateBookingStatus(booking._id, 'Completed')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;