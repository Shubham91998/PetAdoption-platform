import React, { useState, useEffect } from "react";
import axios from "axios";

const Process = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false); // Track if the user has applied

  // Fetch user ID from localStorage
  const userString = localStorage.getItem("user");
  const userId = userString ? JSON.parse(userString)._id : null;

  // Fetch the application status
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!userId) {
        setLoading(false); // User is not logged in, no need to fetch status
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pets/api/pet-requests/${userId}`
        );

        if (response.data.data) {
          setStatus(response.data.data.processStatus); // Set the fetched status
          setHasApplied(true); // User has applied for adoption
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
        setError("Failed to fetch status.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [userId]);

  const steps = [
    { title: "1. Application Submission", description: "Fill out our online application form to express your interest in adopting a pet. Provide details about your living situation and preferences.", key: "Submitted" },
    { title: "2. Initial Review", description: "Our team will review your application to ensure it meets our basic requirements for pet adoption.", key: "Under Review" },
    { title: "3. Home Visit/Check", description: "We will schedule a home visit to assess your living environment and discuss pet ownership responsibilities.", key: "Home Visit Scheduled" },
    { title: "4. Meet-and-Greet", description: "Meet the pet you are interested in adopting. This is a great opportunity to see if you and the pet are a good match.", key: "Meet-and-Greet" },
    { title: "5. Reference Checks", description: "We will contact your references to learn more about your suitability as a pet owner.", key: "Reference Checks" },
    { title: "6. Adoption Agreement", description: "Sign an adoption agreement that outlines your responsibilities as a pet owner.", key: "Adoption Agreement" },
    { title: "7. Adoption Fee Payment", description: "Pay the adoption fee, which helps cover the pet's medical expenses and care.", key: "Adoption Fee Payment" },
    { title: "8. Post-Adoption Support", description: "Receive resources and support for your new pet, including training tips and veterinary contacts.", key: "Post-Adoption Support" },
    { title: "9. Follow-Up", description: "We will check in with you after adoption to ensure a smooth transition for you and your new pet.", key: "Follow-Up" },
    { title: "10. Community Engagement", description: "Join our community events and workshops to learn more about responsible pet ownership and share your success stories.", key: "Community Engagement" },
    { title: "❌ Rejected", description: "Unfortunately, your application has been rejected. Please contact us for more details.", key: "Rejected" }
  ];

  // Find the index of the current step
  const currentStepIndex = steps.findIndex(step => step.key === status);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg my-28">
      <h1 className="text-3xl font-bold text-center mb-6">Adoption Process</h1>

      {/* Show Status only if user has applied */}
      {hasApplied && (
        <div className="py-5">
          <h2 className="text-xl font-semibold">
            Current Status of Application:{" "}
            <span
              className={`px-3 py-1 rounded-lg ${
                status === "Rejected" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              {status}
            </span>
          </h2>
        </div>
      )}

      {/* Show All Steps to Everyone */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-4 border border-gray-300 rounded-lg ${
              status === "Rejected" && step.key === "Rejected"
                ? "bg-red-100 border-red-500"
                : index === currentStepIndex
                ? "bg-blue-100 border-blue-500"
                : ""
            }`}
          >
            <h2 className="text-xl font-semibold">{step.title}</h2>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
