const PetRequest = require("../models/petAdoption.model.js");

const getUserPetRequest = async (req, res) => {
  try {
    const petRequest = await PetRequest.findOne({ 
      userId: req.params.userId,
      isVisible: true 
    });

    if (!petRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, data: petRequest });
  } catch (error) {
    console.error("Error fetching user request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


//  Update process status for a pet request
const processStatusInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const { processStatus } = req.body;
    // Log incoming payload for debugging
    console.log('processStatusInformation called with:', { id, body: req.body });
    const normalizedStatus = typeof processStatus === 'string' ? processStatus.trim() : processStatus;

    const statusMap = {
      submitted: "Submitted",
      "under review": "Under Review",
      "home visit scheduled": "Home Visit Scheduled",
      "meet-and-greet": "Meet-and-Greet",
      "reference checks": "Reference Checks",
      "adoption agreement": "Adoption Agreement",
      "adoption fee payment": "Adoption Fee Payment",
      "post-adoption support": "Post-Adoption Support",
      "follow-up": "Follow-Up",
      "community engagement": "Community Engagement",
      accepted: "Accepted",
      rejected: "Rejected",
    };

    const normalizedKey = typeof normalizedStatus === 'string' ? normalizedStatus.toLowerCase() : normalizedStatus;
    const canonicalStatus = statusMap[normalizedKey];

    if (!canonicalStatus) {
      console.error("Invalid status update:", { id, processStatus, normalizedStatus, normalizedKey });
      return res.status(400).json({ message: `Invalid status selected: ${String(normalizedStatus)}` });
    }

    const updatedRequest = await PetRequest.findByIdAndUpdate(
      id,
      { processStatus: canonicalStatus }, 
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Pet request not found." });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//  Fetch all pet adoption requests (only visible ones)
const getAllPetRequests = async (req, res) => {
  try {
    // Populate petId and userId so frontend can access pet/user details for lookup
    // Only return visible requests (soft delete filter)
    const petRequests = await PetRequest.find(
      { isVisible: true },
      "userId petId processStatus createdAt currentLocation reasonForAdoption isVisible"
    ).populate([
      {
        path: "petId",
        select: "type name image breed category age",
      },
      {
        path: "userId",
        select: "fullname email phone address",
      },
    ]);

    res.status(200).json({
      success: true,
      data: petRequests,
    });
  } catch (error) {
    console.error("Error fetching pet requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pet requests.",
    });
  }
};

//  Verify a pet adoption request
const verifyPetRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await PetRequest.findByIdAndUpdate(
      id,
      { processStatus: "Verified" }, 
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Pet request not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet request verified successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error verifying pet request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify pet request.",
    });
  }
};

// ✅ Reject a pet adoption request
const rejectPetRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await PetRequest.findByIdAndUpdate(
      id,
      { processStatus: "Rejected" }, 
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Pet request not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet request rejected successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error rejecting pet request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject pet request.",
    });
  }
};

// ✅ Hide a pet adoption request (soft delete)
const hideRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await PetRequest.findByIdAndUpdate(
      id,
      { isVisible: false },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Pet request not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet request hidden successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error hiding pet request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to hide pet request.",
    });
  }
};


// Add to adopter.controller.js
const getDashboardStats = async (req, res) => {
  try {
    // Total applications (sabhi requests)
    const totalApplications = await PetRequest.countDocuments();

    // Total adopted pets (Accepted requests)
    const totalAdopted = await PetRequest.countDocuments({
      processStatus: "Accepted",
    });

    res.status(200).json({
      success: true,
      data: {
        totalApplications,
        totalAdopted,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getAllPetRequests,
  verifyPetRequest,
  rejectPetRequest,
  processStatusInformation,
  getUserPetRequest,
  hideRequest,
  getDashboardStats,
};
