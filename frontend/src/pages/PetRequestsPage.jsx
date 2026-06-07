import { useEffect, useState } from "react";
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
  "Accepted",
];

const PetAdoptionRequests = () => {
  const [petRequests, setPetRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [lookupValue, setLookupValue] = useState("");
  const [lookupType, setLookupType] = useState("petId"); // "petId" or "userId"
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupMessage, setLookupMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleHideRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this request from the table?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/pets/pet-requests/${id}/hide`,
      );

      // Remove from UI immediately
      setPetRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id),
      );

      // Show success message
      setSuccessMessage("Request hidden successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      console.log("Request hidden successfully:", response.data);
    } catch (error) {
      console.error("Error hiding request:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to hide request. Please try again.";
      alert(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pet adoption requests
  useEffect(() => {
    const fetchPetRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pets/api/pet-requests`,
        );
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

  // Handle status update
  const handleUpdateStatus = async (id) => {
    const selected = selectedStatus[id]?.trim();
    if (!selected) return alert("Please select a status!");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/pets/pet-requests/${id}/update-status`,
        { processStatus: selected },
      );

      const updatedStatus = response.data?.data?.processStatus || selected;

      // Update the status in the local state
      setPetRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id
            ? { ...request, processStatus: updatedStatus }
            : request,
        ),
      );

      alert("Status updated successfully!");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Failed to update status: ${error.response.data.message}`);
      } else {
        alert("Failed to update status.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Under Review":
      case "Home Visit Scheduled":
      case "Meet-and-Greet":
      case "Reference Checks":
      case "Adoption Agreement":
      case "Adoption Fee Payment":
      case "Post-Adoption Support":
      case "Follow-Up":
      case "Community Engagement":
        return "bg-yellow-100 text-yellow-800";
      case "Submitted":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLookup = () => {
    const term = lookupValue.trim();
    if (!term) {
      setLookupMessage("Please enter a pet ID or user ID.");
      setLookupResult(null);
      return;
    }

    if (lookupType === "petId") {
      const matchingRequests = petRequests.filter((r) => {
        const requestPetId =
          r.petId && typeof r.petId === "object" ? r.petId._id : r.petId;
        return String(requestPetId) === term;
      });

      if (matchingRequests.length === 0) {
        setLookupResult(null);
        setLookupMessage("No adoption requests found for this pet ID.");
        return;
      }

      setLookupResult({
        type: "pet",
        petId: term,
        petDetails:
          matchingRequests[0].petId &&
          typeof matchingRequests[0].petId === "object"
            ? matchingRequests[0].petId
            : null,
        requests: matchingRequests,
      });
      setLookupMessage("");
      return;
    }

    if (lookupType === "userId") {
      const matchingRequests = petRequests.filter((r) => {
        const requestUserId =
          r.userId && typeof r.userId === "object" ? r.userId._id : r.userId;
        return String(requestUserId) === term;
      });

      if (matchingRequests.length === 0) {
        setLookupResult(null);
        setLookupMessage("No adoption requests found for this user ID.");
        return;
      }

      setLookupResult({
        type: "user",
        userId: term,
        userDetails:
          matchingRequests[0].userId &&
          typeof matchingRequests[0].userId === "object"
            ? matchingRequests[0].userId
            : null,
        requests: matchingRequests,
      });
      setLookupMessage("");
      return;
    }

    setLookupResult(null);
    setLookupMessage("Unknown lookup type.");
  };
  

  

  const handleDeleteByLookup = async () => {
    if (!lookupResult) return;

    const petId =
      lookupResult.petId && typeof lookupResult.petId === "object"
        ? lookupResult.petId._id
        : lookupResult.petId;
    if (!petId) return alert("Unable to resolve pet ID for deletion.");

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/original/pets/delete/${petId}`);
      setLookupMessage(`Pet ${petId} deleted from website.`);
      setLookupResult(null);
      setPetRequests((prevRequests) =>
        prevRequests.filter((request) => {
          const requestPetId =
            request.petId && typeof request.petId === "object"
              ? request.petId._id
              : request.petId;
          return requestPetId !== petId;
        }),
      );
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("Failed to delete pet from website.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mt-20 mb-4">Pet Adoption Requests</h1>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md border border-green-300">
          ✓ {successMessage}
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Pet</th>
            <th className="border border-gray-300 p-2">Applied Date</th>
            <th className="border border-gray-300 p-2">Current Status</th>
            <th className="border border-gray-300 p-2">Update Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {petRequests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">
                {request.userId && typeof request.userId === "object"
                  ? request.userId._id
                  : request.userId}
              </td>
              <td className="border border-gray-300 p-2">
                {request.petId && typeof request.petId === "object"
                  ? request.petId._id
                  : request.petId}
              </td>
              <td className="border border-gray-300 p-2">
                {formatDate(request.createdAt)}
              </td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(request.processStatus)}`}
                >
                  {request.processStatus}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                <select
                  value={selectedStatus[request._id] || ""}
                  onChange={(e) =>
                    setSelectedStatus({
                      ...selectedStatus,
                      [request._id]: e.target.value,
                    })
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  {validStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                 <div className="flex items-center gap-4">
    <button
      onClick={() => handleUpdateStatus(request._id)}
      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
    >
      Submit
    </button>

    <button
      onClick={() => handleHideRequest(request._id)}
      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" 
    >
      Delete
    </button>
  </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Lookup Details</h2>

        {/* Lookup Type Selection */}
        <div className="mb-4">
          <label className="font-medium mr-4">Search by:</label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              value="petId"
              checked={lookupType === "petId"}
              onChange={(e) => {
                setLookupType(e.target.value);
                setLookupResult(null);
                setLookupMessage("");
              }}
              className="mr-2"
            />
            Pet ID
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="userId"
              checked={lookupType === "userId"}
              onChange={(e) => {
                setLookupType(e.target.value);
                setLookupResult(null);
                setLookupMessage("");
              }}
              className="mr-2"
            />
            User ID
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder={
              lookupType === "petId"
                ? "Enter Pet ID to lookup"
                : "Enter User ID to lookup"
            }
            value={lookupValue}
            onChange={(e) => setLookupValue(e.target.value)}
            className="w-full sm:w-1/2 p-2 border rounded-md"
          />
          <button
            onClick={handleLookup}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Fetch Details
          </button>
        </div>

        {lookupMessage && (
          <p className="text-sm text-red-600 mb-3">{lookupMessage}</p>
        )}

        {/* Pet ID Lookup Results */}
        {lookupResult && lookupResult.type === "pet" && (
          <div className="border-t pt-4">
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
             <div>
  <h3 className="font-semibold text-lg mb-2">Pet Details</h3>

  {lookupResult.petDetails ? (
    <>
      {lookupResult.petDetails.image && (
        <img
          src={lookupResult.petDetails.image}
          alt={lookupResult.petDetails.name || "pet"}
          className="w-64 h-64 object-cover rounded-lg mb-4 cursor-pointer hover:scale-105 transition"
          onClick={() => setSelectedImage(lookupResult.petDetails.image)}
        />
      )}

      <p>
        <strong>ID:</strong> {lookupResult.petDetails._id}
      </p>

      <p>
        <strong>Name:</strong>{" "}
        {lookupResult.petDetails.name || "N/A"}
      </p>

      <p>
        <strong>Breed:</strong>{" "}
        {lookupResult.petDetails.breed || "N/A"}
      </p>

      <p>
        <strong>Type:</strong>{" "}
        {lookupResult.petDetails.type || "N/A"}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {lookupResult.petDetails.category || "N/A"}
      </p>

      <p>
        <strong>Age:</strong>{" "}
        {lookupResult.petDetails.age || "N/A"}
      </p>
    </>
  ) : (
    <p>Pet details not available</p>
  )}
</div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                Users who applied for this pet ({lookupResult.requests.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">User ID</th>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Email</th>
                      <th className="border border-gray-300 p-2">Phone</th>
                      <th className="border border-gray-300 p-2">Address</th>
                      <th className="border border-gray-300 p-2">Status</th>
                      <th className="border border-gray-300 p-2">
                        Applied Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lookupResult.requests.map((request, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">
                          {request.userId && typeof request.userId === "object"
                            ? request.userId._id
                            : request.userId}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {request.userId?.fullname || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {request.userId?.email || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {request.userId?.phone || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {request.userId?.address || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(request.processStatus)}`}
                          >
                            {request.processStatus}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {request.createdAt
                            ? new Date(request.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4">
              {lookupResult.requests.some(
                (r) => r.processStatus === "Accepted",
              ) ? (
                <button
                  onClick={handleDeleteByLookup}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete Pet from Website
                </button>
              ) : (
                <p className="text-sm text-yellow-700">
                  ⚠️ Accept a request first to delete this pet from the website.
                </p>
              )}
            </div>
          </div>
        )}

        {/* User ID Lookup Results */}
        {lookupResult && lookupResult.type === "user" && (
          <div className="border-t pt-4">
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">User Details</h3>
                {lookupResult.userDetails ? (
                  <>
                    <p>
                      <strong>ID:</strong> {lookupResult.userDetails._id}
                    </p>
                    <p>
                      <strong>Full Name:</strong>{" "}
                      {lookupResult.userDetails.fullname || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {lookupResult.userDetails.email || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {lookupResult.userDetails.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {lookupResult.userDetails.address || "N/A"}
                    </p>
                  </>
                ) : (
                  <p>User details not available</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                Pets Applied by this User ({lookupResult.requests.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">Pet ID</th>
                      <th className="border border-gray-300 p-2">Pet Name</th>
                      <th className="border border-gray-300 p-2">Breed</th>
                      <th className="border border-gray-300 p-2">Type</th>
                      <th className="border border-gray-300 p-2">Status</th>
                      <th className="border border-gray-300 p-2">
                        Applied Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lookupResult.requests.map((request, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">
                          {request.petId && typeof request.petId === "object"
                            ? request.petId._id
                            : request.petId}
                        </td>

                        {/* Pet Name */}
                        <td className="border border-gray-300 p-2">
                          {request.petId?.name || "N/A"}
                        </td>

                        {/* Breed */}
                        <td className="border border-gray-300 p-2">
                          {request.petId?.breed || "N/A"}
                        </td>

                        {/* Type */}
                        <td className="border border-gray-300 p-2">
                          {request.petId?.type || "N/A"}
                        </td>

                        {/* Status */}
                        <td className="border border-gray-300 p-2">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
                              request.processStatus,
                            )}`}
                          >
                            {request.processStatus}
                          </span>
                        </td>

                        {/* Applied Date */}
                        <td className="border border-gray-300 p-2">
                          {request.createdAt
                            ? new Date(request.createdAt).toLocaleDateString(
                                "en-IN",
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full Screen Pet"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            />

            <button
              className="absolute top-5 right-5 text-white text-4xl font-bold"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );

};

export default PetAdoptionRequests;
