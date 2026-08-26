// frontend/src/pages/UserBookings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingStars from '../GroomingPage/components/RatingStars.jsx';
import Chat from './Chat';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserBookings();
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings/user/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Booking cancelled successfully');
      fetchUserBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const submitReview = async (bookingId, rating, review) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/reviews/${bookingId}`,
        { rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Review submitted successfully!');
      fetchUserBookings();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
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

  if (loading) {
    return <div className="text-center py-12">Loading your bookings...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Grooming Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">No bookings yet.</p>
            <button
              onClick={() => window.location.href = '/groomers'}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Find Groomers
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.provider?.profilePhoto || 'https://via.placeholder.com/60'}
                        alt={booking.provider?.fullName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{booking.provider?.fullName}</h3>
                        <p className="text-gray-600">{booking.service}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Pet Name</p>
                      <p className="font-medium">{booking.petName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Pet Type</p>
                      <p className="font-medium">{booking.petType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-medium">{booking.bookingTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-medium">₹{booking.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Address</p>
                      <p className="font-medium truncate">{booking.address}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 mt-4">
                    {booking.status === 'Pending' && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowChat(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Chat with Provider
                    </button>

                    {booking.status === 'Completed' && (
                      <RatingStars
                        onSubmit={(rating, review) => submitReview(booking._id, rating, review)}
                        existingRating={booking.review}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Modal */}
        {showChat && selectedBooking && user && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh]">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-semibold">Chat with {selectedBooking.provider?.fullName}</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Chat
                user={user}
                provider={selectedBooking.provider}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;