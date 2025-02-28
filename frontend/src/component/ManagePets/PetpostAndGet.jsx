import React, { useEffect, useState } from "react";
import FindDetails from "../FindDetails"
import axios from "axios";

const validStatuses = [
  "Submitted",
  "Under Review",
  "Home Visit Scheduled",
  "Meet-and-Greet",
  "Reference Checks",
  "Adoption Agreement",
  "Adoption Fee Payment",
  "Post-Adoption Support",
  "Follow-Up",
  "Community Engagement",
  "Rejected",
];

const PetAdoptionRequests = () => {
  const [petRequests, setPetRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pets/api/pet-requests`);
        setPetRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching pet requests:", error);
        setError("Failed to fetch pet requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchPetRequests();
  }, []);

  const handleUpdateStatus = async (id) => {
    if (!selectedStatus[id]) return alert("Please select a status!");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/pets/pet-requests/${id}/update-status`,
        { processStatus: selectedStatus[id] }
      );

      setPetRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, processStatus: selectedStatus[id] } : request
        )
      );

      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mt-20 mb-4">Pet Adoption Requests</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">User ID</th>
            <th className="border border-gray-300 p-2">Pet ID</th>
            <th className="border border-gray-300 p-2">Current Status</th>
            <th className="border border-gray-300 p-2">Update Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {petRequests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{request.userId}</td>
              <td className="border border-gray-300 p-2">{request.petId}</td>
              <td className="border border-gray-300 p-2 font-bold">{request.processStatus}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={selectedStatus[request._id] || ""}
                  onChange={(e) =>
                    setSelectedStatus({ ...selectedStatus, [request._id]: e.target.value })
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="" disabled>Select Status</option>
                  {validStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleUpdateStatus(request._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <FindDetails />
    </div>
    </>
  );
};

export default PetAdoptionRequests;
