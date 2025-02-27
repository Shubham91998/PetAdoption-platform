import React, { useState } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/original/pets/finddetails/${userId}`);
      console.log(response.data)
      // Ensure pets and petRequests are always arrays
      setUserData({
        ...response.data,
        pets: response.data.pets || [], // Default to empty array if undefined
        petRequests: response.data.petRequests || [], // Default to empty array if undefined
      });
  
      setError("");
    } catch (err) {
      setError("User not found or an error occurred.");
      setUserData(null);
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="mx-5 my-5">Find User and Pet Details</h1>
      <form onSubmit={handleSubmit}>
        <input
        className="border rounded-md border-5 p-2 pr-10 mx-5 border-blue-600 focus:outline-none focus:ring-2"
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button className="bg-blue-400 rounded-lg mx-5 px-7 py-2 text-white text-lg hover:bg-blue-600" type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div>
          <h2>User Details</h2>
          <p>
            <strong>Full Name:</strong> {userData.user.fullname}
          </p>
          <p>
            <strong>Address:</strong> {userData.user.address}
          </p>
          <p>
            <strong>Phone:</strong> {userData.user.phone}
          </p>
          <p>
            <strong>Email:</strong> {userData.user.email}
          </p>

          <h2>Pet Details</h2>
{userData?.pets?.length > 0 ? (
  userData.pets.map((pet, index) => (
    <div key={index} style={{ marginBottom: "20px" }}>
      <p><strong>Pet Name:</strong> {pet.name}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Category:</strong> {pet.category}</p>
      <img src={pet.image} alt={pet.name} style={{ width: "200px" }} />
    </div>
  ))
) : (
  <p>No pets found for this user.</p>
)}

<h2>Pet Requests</h2>
{userData?.petRequests?.length > 0 ? (
  userData.petRequests.map((request, index) => (
    <div key={index} style={{ marginBottom: "20px" }}>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Process Status:</strong> {request.processStatus}</p>
      <p><strong>Reason for Adoption:</strong> {request.reasonForAdoption}</p>
      <p><strong>Current Location:</strong> {request.currentLocation}</p>
    </div>
  ))
) : (
  <p>No pet requests found for this user.</p>
)}

        </div>
      )}
    </div>
  );
}

export default App;