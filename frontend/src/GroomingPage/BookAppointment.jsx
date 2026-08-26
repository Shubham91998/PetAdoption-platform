// frontend/src/pages/BookAppointment.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    service: '',
    bookingDate: '',
    bookingTime: '',
    ownerName: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

  useEffect(() => {
    fetchProvider();
  }, [providerId]);

  const fetchProvider = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/providers/${providerId}`);
      setProvider(response.data);
      setFormData(prev => ({ ...prev, service: response.data.servicesOffered[0] }));
    } catch (error) {
      console.error('Error fetching provider:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const bookingData = {
        ...formData,
        price: provider.priceList[formData.service]
      };
      
      await axios.post(
        `http://localhost:5000/api/bookings/${providerId}`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert('Booking request sent successfully!');
      navigate('/user-bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!provider) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold">Book Grooming Appointment</h1>
            <p className="mt-2">with {provider.fullName}</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pet Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Pet Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="petName"
                    placeholder="Pet Name *"
                    value={formData.petName}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  />
                  <select
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  >
                    <option value="">Select Pet Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                  </select>
                  <input
                    type="text"
                    name="breed"
                    placeholder="Breed (Optional)"
                    value={formData.breed}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age (months)"
                    value={formData.age}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Select Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.servicesOffered.map(service => (
                    <label
                      key={service}
                      className={`border rounded-lg p-3 cursor-pointer transition ${
                        formData.service === service
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service}
                        checked={formData.service === service}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex justify-between">
                        <span className="font-medium">{service}</span>
                        <span className="text-blue-600">₹{provider.priceList[service]}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="border rounded-lg p-3"
                    required
                  />
                  <input
                    type="time"
                    name="bookingTime"
                    value={formData.bookingTime}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Your Name *"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    required
                  />
                  <textarea
                    name="address"
                    placeholder="Address for Service *"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded-lg p-3 md:col-span-2"
                    rows="3"
                    required
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Special Instructions</h3>
                <textarea
                  name="specialInstructions"
                  placeholder="Any special instructions or notes about your pet?"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                  rows="3"
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm">
                  <p>Service: {formData.service}</p>
                  <p>Price: ₹{formData.service && provider.priceList[formData.service]}</p>
                  {provider.homeVisitAvailable && (
                    <p className="text-green-600">✓ Home visit available</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Booking...' : `Book Now - ₹${formData.service && provider.priceList[formData.service]}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;