// frontend/src/pages/Groomers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProviderCard from '../GroomingPage/components/ProviderCard.jsx';
import FilterSidebar from '../GroomingPage/components/FilterSidebar.jsx';

const Groomers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({
    radius: 10,
    rating: 0,
    maxPrice: 2000,
    homeVisit: false,
    search: ''
  });
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyProviders();
    }
  }, [location, filters]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setShowLocationPrompt(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setShowLocationPrompt(true);
        }
      );
    }
  };

  const fetchNearbyProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/providers/nearby', {
        params: {
          lat: location.lat,
          lng: location.lng,
          radius: filters.radius
        }
      });
      
      let filteredProviders = response.data.providers;
      
      // Apply filters
      if (filters.rating > 0) {
        filteredProviders = filteredProviders.filter(p => p.rating >= filters.rating);
      }
      if (filters.homeVisit) {
        filteredProviders = filteredProviders.filter(p => p.homeVisitAvailable);
      }
      if (filters.search) {
        filteredProviders = filteredProviders.filter(p => 
          p.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.city.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      setProviders(filteredProviders);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNearbyProviders();
  };

  if (showLocationPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-2xl font-bold mb-4">Enable Location Access</h2>
          <p className="text-gray-600 mb-6">
            We need your location to find nearby groomers in your area.
          </p>
          <button
            onClick={getUserLocation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Allow Location Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Groomers Near You</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name, city, or service..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="flex-1 border rounded-lg p-3"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar filters={filters} setFilters={setFilters} />

          {/* Providers Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">Loading groomers...</div>
            ) : providers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No groomers found in your area.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {providers.map(provider => (
                  <ProviderCard key={provider._id} provider={provider} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groomers;