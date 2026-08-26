// frontend/src/components/ProviderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Home } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={provider.profilePhoto}
        alt={provider.fullName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{provider.fullName}</h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{provider.rating?.toFixed(1) || 0}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>{provider.city}, {provider.distance && `${provider.distance} km away`}</span>
          </div>
          {provider.homeVisitAvailable && (
            <div className="flex items-center text-green-600">
              <Home size={14} className="mr-1" />
              <span>Home Visit Available</span>
            </div>
          )}
          <p className="text-xs text-gray-500">{provider.experience} years experience</p>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {provider.servicesOffered.slice(0, 3).map(service => (
            <span key={service} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {service}
            </span>
          ))}
          {provider.servicesOffered.length > 3 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              +{provider.servicesOffered.length - 3}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/groomer/${provider._id}`}
            className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Profile
          </Link>
          <Link
            to={`/book/${provider._id}`}
            className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;