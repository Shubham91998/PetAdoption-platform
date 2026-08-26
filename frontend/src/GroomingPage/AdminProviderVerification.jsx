// frontend/src/pages/AdminProviderVerification.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProviderVerification = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Pending');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/providers/applications?status=${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this provider?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/providers/applications/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Provider approved successfully!');
      fetchApplications();
    } catch (error) {
      console.error('Error approving provider:', error);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this application?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/providers/applications/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application rejected');
      fetchApplications();
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Provider Applications</h1>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          {['Pending', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map(app => (
            <div key={app._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={app.profilePhoto}
                      alt={app.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{app.fullName}</h3>
                      <p className="text-gray-600">{app.email}</p>
                      <p className="text-gray-600">{app.phone}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.applicationStatus)}`}>
                    {app.applicationStatus}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p><strong>Experience:</strong> {app.experience} years</p>
                  <p><strong>Specialization:</strong> {app.specialization.join(', ')}</p>
                  <p><strong>Services:</strong> {app.servicesOffered.join(', ')}</p>
                  <p><strong>Location:</strong> {app.city}, {app.state}</p>
                  <p><strong>Home Visit:</strong> {app.homeVisitAvailable ? 'Yes' : 'No'}</p>
                </div>

                {/* Certificates Preview */}
                {app.certificates.length > 0 && (
                  <div className="mb-4">
                    <p className="font-semibold mb-2">Certificates:</p>
                    <div className="flex space-x-2">
                      {app.certificates.map((cert, idx) => (
                        <a
                          key={idx}
                          href={cert}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Certificate {idx + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {app.applicationStatus === 'Pending' && (
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Details */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Application Details</h2>
                <div className="space-y-3">
                  <p><strong>Full Name:</strong> {selectedApp.fullName}</p>
                  <p><strong>Email:</strong> {selectedApp.email}</p>
                  <p><strong>Phone:</strong> {selectedApp.phone}</p>
                  <p><strong>Experience:</strong> {selectedApp.experience} years</p>
                  <p><strong>Specialization:</strong> {selectedApp.specialization.join(', ')}</p>
                  <p><strong>Services Offered:</strong> {selectedApp.servicesOffered.join(', ')}</p>
                  <p><strong>Price List:</strong></p>
                  <ul className="list-disc pl-5">
                    {Object.entries(selectedApp.priceList).map(([service, price]) => (
                      <li key={service}>{service}: ₹{price}</li>
                    ))}
                  </ul>
                  <p><strong>Address:</strong> {selectedApp.address}</p>
                  <p><strong>City:</strong> {selectedApp.city}</p>
                  <p><strong>State:</strong> {selectedApp.state}</p>
                  <p><strong>Pincode:</strong> {selectedApp.pincode}</p>
                  <p><strong>Service Radius:</strong> {selectedApp.serviceRadius} km</p>
                  <p><strong>Home Visit Available:</strong> {selectedApp.homeVisitAvailable ? 'Yes' : 'No'}</p>
                  <p><strong>Applied on:</strong> {new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProviderVerification;