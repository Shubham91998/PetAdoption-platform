const { validateToken } = require("../services/auth.service");
const Shelter = require("../models/Shelter");

// Check if shelter is authenticated
const isShelterAuthenticated = (req, res, next) => {
  try {
    const shelterToken = req.cookies.shelterToken || req.headers.authorization?.split(" ")[1];

    if (!shelterToken) {
      return res.status(401).json({ message: "No token provided. Please login as a shelter." });
    }

    const decoded = validateToken(shelterToken);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Check if shelter is verified
const isShelterVerified = async (req, res, next) => {
  try {
    const shelterId = req.user?._id;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    if (!shelter.isVerified || shelter.verificationStatus !== "approved") {
      return res.status(403).json({
        message: "Your shelter is not verified yet. Please complete the verification process.",
        verificationStatus: shelter.verificationStatus,
      });
    }

    next();
  } catch (error) {
    console.error("Error checking verification:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Check if shelter owns the resource
const isShelterOwner = (req, res, next) => {
  try {
    const shelterId = req.user?._id;
    const resourceShelterId = req.params.shelterId || req.body.shelterId;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (shelterId.toString() !== resourceShelterId.toString()) {
      return res.status(403).json({ message: "Not authorized to access this resource" });
    }

    next();
  } catch (error) {
    console.error("Error checking ownership:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function checkForShelterAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      res.locals.shelter = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      res.locals.shelter = userPayload;
      return next();
    } catch (error) {
      res.locals.shelter = null;
      return next();
    }
  };
}

module.exports = {
  isShelterAuthenticated,
  isShelterVerified,
  isShelterOwner,
  checkForShelterAuthenticationCookie,
};
