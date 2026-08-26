// frontend/src/pages/BecomeProvider.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const BecomeProvider = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    specialization: [],
    servicesOffered: [],
    priceList: {},
    homeVisitAvailable: false,
    address: '',
    city: '',
    state: '',
    pincode: '',
    serviceRadius: 10,
    lat: '',
    lng: ''
  });

  const [files, setFiles] = useState({
    profilePhoto: null,
    governmentId: null,
    certificates: []
  });

  const serviceOptions = [
    'Basic Bath', 'Full Grooming', 'Hair Trimming',
    'Nail Clipping', 'Ear Cleaning', 'Tick & Flea Treatment', 'Spa Treatment'
  ];

  const specializationOptions = ['Dogs', 'Cats', 'Small Pets', 'Exotic Pets'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter(s => s !== service)
        : [...prev.servicesOffered, service]
    }));
  };

  const handleSpecializationToggle = (spec) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }));
  };

  const handlePriceChange = (service, price) => {
    setFormData(prev => ({
      ...prev,
      priceList: { ...prev.priceList, [service]: parseFloat(price) }
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'certificates') {
      setFiles(prev => ({ ...prev, certificates: Array.from(files) }));
    } else {
      setFiles(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData(prev => ({
          ...prev,
          lat: e.latlng.lat,
          lng: e.latlng.lng
        }));
      }
    });
    return formData.lat && formData.lng ? (
      <Marker position={[formData.lat, formData.lng]} />
    ) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'specialization' || key === 'servicesOffered') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'priceList') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    data.append('profilePhoto', files.profilePhoto);
    data.append('governmentId', files.governmentId);
    files.certificates.forEach(file => {
      data.append('certificates', file);
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/providers/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Application submitted successfully! Admin will review it.');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Become a Grooming Provider</h1>
          <p className="text-gray-600 mb-8">Join our platform and grow your pet grooming business</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
              </div>
            </div>

            {/* Files Upload */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Documents</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Profile Photo *</label>
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="border rounded-lg p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Government ID (Aadhaar/PAN) *</label>
                  <input
                    type="file"
                    name="governmentId"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="border rounded-lg p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Certificates (Multiple)</label>
                  <input
                    type="file"
                    name="certificates"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    multiple
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {serviceOptions.map(service => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.servicesOffered.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="rounded"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
              {formData.servicesOffered.map(service => (
                <div key={service} className="mb-3">
                  <label className="block mb-1">{service} Price (₹)</label>
                  <input
                    type="number"
                    value={formData.priceList[service] || ''}
                    onChange={(e) => handlePriceChange(service, e.target.value)}
                    className="border rounded-lg p-2 w-full"
                    placeholder={`Enter price for ${service}`}
                    required
                  />
                </div>
              ))}
            </div>

            {/* Specialization */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Specialization</h2>
              <div className="grid grid-cols-2 gap-2">
                {specializationOptions.map(spec => (
                  <label key={spec} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.specialization.includes(spec)}
                      onChange={() => handleSpecializationToggle(spec)}
                      className="rounded"
                    />
                    <span>{spec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
                <input
                  type="number"
                  name="serviceRadius"
                  placeholder="Service Radius (km)"
                  value={formData.serviceRadius}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Select Your Service Location on Map</label>
                <div style={{ height: '400px' }}>
                  <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Home Visit */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="homeVisitAvailable"
                  checked={formData.homeVisitAvailable}
                  onChange={handleChange}
                  className="rounded"
                />
                <span>I offer home visit services</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;