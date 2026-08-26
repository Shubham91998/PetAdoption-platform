// frontend/src/pages/GroomerProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Star, Clock, Award, Home, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';

const GroomerProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProviderDetails();
    fetchProviderReviews();
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, [id]);

  const fetchProviderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/providers/${id}`);
      setProvider(response.data);
    } catch (error) {
      console.error('Error fetching provider details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProviderReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/provider/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading groomer profile...</div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">Groomer not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="absolute -bottom-16 left-8">
              <img
                src={provider.profilePhoto}
                alt={provider.fullName}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{provider.fullName}</h1>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={20} />
                    <span className="ml-1 font-semibold">{provider.rating?.toFixed(1) || 0}</span>
                    <span className="text-gray-600 ml-1">({provider.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{provider.city}, {provider.state}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span>{provider.experience} years experience</span>
                  </div>
                </div>
              </div>
              <Link
                to={`/book/${provider._id}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <Calendar size={18} className="mr-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 mb-4">
                Professional pet groomer with {provider.experience} years of experience. 
                Specializing in {provider.specialization.join(', ')}.
              </p>
              {provider.homeVisitAvailable && (
                <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg">
                  <Home size={20} className="mr-2" />
                  <span>Home visit service available in your area</span>
                </div>
              )}
            </div>

            {/* Services & Pricing */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Services & Pricing</h2>
              <div className="space-y-3">
                {provider.servicesOffered.map(service => (
                  <div key={service} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{service}</p>
                      {provider.homeVisitAvailable && (
                        <p className="text-sm text-green-600">✓ Home visit available</p>
                      )}
                    </div>
                    <p className="text-xl font-semibold text-blue-600">₹{provider.priceList[service]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            {provider.certificates && provider.certificates.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Certificates</h2>
                <div className="grid grid-cols-2 gap-4">
                  {provider.certificates.map((cert, idx) => (
                    <a
                      key={idx}
                      href={cert}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <Award size={20} className="text-blue-600 mr-2" />
                      <span>Certificate {idx + 1}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews ({reviews.length})</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review._id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">{review.user?.name || 'Anonymous'}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 mr-3" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 mr-3" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-3 mt-1" />
                  <span>{provider.address}, {provider.city}, {provider.state} - {provider.pincode}</span>
                </div>
              </div>
              {user && (
                <Link
                  to={`/chat/${provider._id}`}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                >
                  <Phone size={16} className="mr-2" />
                  Chat Now
                </Link>
              )}
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  provider.availability === 'Available' ? 'bg-green-500' :
                  provider.availability === 'Busy' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="capitalize">{provider.availability}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Service radius: {provider.serviceRadius} km
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{provider.totalBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold">{provider.totalReviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{new Date(provider.createdAt).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroomerProfile;