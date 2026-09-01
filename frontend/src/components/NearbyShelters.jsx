import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Star, MapPinIcon, Phone, Globe } from 'lucide-react';

const NearbyShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Could not get user location:', error);
          // Set a default location (you can change this)
          setUserLocation({
            latitude: 28.6139,
            longitude: 77.209,
          });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyShelters();
    }
  }, [userLocation]);

  const fetchNearbyShelters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shelters/nearby`,
        {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            distance: 50, // 50 km radius
          },
        }
      );
      setShelters(response.data.shelters || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching nearby shelters:', err);
      setError('Could not load nearby shelters');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🏠 Nearby Shelters</h3>
        <p className="text-gray-600">Find shelters near you and discover amazing animals ready for adoption</p>
      </div>

      {shelters.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-blue-800">No shelters found in your area. Try expanding your search radius.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelters.map((shelter) => (
            <div
              key={shelter._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Cover Image */}
              <div className="h-40 bg-gradient-to-r from-orange-400 to-orange-600 relative overflow-hidden">
                {shelter.coverImage && (
                  <img
                    src={shelter.coverImage}
                    alt={shelter.shelterName}
                    className="w-full h-full object-cover"
                  />
                )}
                {shelter.averageRating && (
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-800">{shelter.averageRating}</span>
                  </div>
                )}
              </div>

              {/* Profile Image & Content */}
              <div className="p-4">
                {/* Profile Image */}
                {shelter.profileImage && (
                  <img
                    src={shelter.profileImage}
                    alt={shelter.shelterName}
                    className="w-16 h-16 rounded-full border-4 border-white -mt-12 mb-3 object-cover"
                  />
                )}

                {/* Name and Verification */}
                <div className="mb-3">
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    {shelter.shelterName}
                    {shelter.isVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Verified</span>
                    )}
                  </h4>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                  <div>
                    <p>{shelter.city}, {shelter.state}</p>
                    <p className="text-xs text-gray-500">{shelter.zipCode}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <a href={`tel:${shelter.phone}`} className="text-sm text-orange-600 hover:underline">
                    {shelter.phone}
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-gray-200 text-center text-xs">
                  <div>
                    <p className="font-bold text-gray-800">{shelter.availablePets?.length || 0}</p>
                    <p className="text-gray-600">Animals</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{shelter.totalAdoptions || 0}</p>
                    <p className="text-gray-600">Adoptions</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{shelter.totalReviews || 0}</p>
                    <p className="text-gray-600">Reviews</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {shelter.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={`/shelter/${shelter._id}`}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg text-center transition-colors"
                  >
                    View Profile
                  </a>
                  {shelter.website && (
                    <a
                      href={shelter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyShelters;
