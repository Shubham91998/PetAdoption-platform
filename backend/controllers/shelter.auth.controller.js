const Shelter = require("../models/Shelter");
const bcrypt = require("bcrypt");
const { createTokenForUser, validateToken } = require("../services/auth.service");

// Shelter Signup/Registration
const shelterRegister = async (req, res) => {
  try {
    const {
      shelterName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
      state,
      zipCode,
      description,
      registrationNumber,
    } = req.body;

    // Validate input
    if (!shelterName || !email || !password || !phone || !address || !city || !state || !zipCode || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if shelter already exists
    const existingShelter = await Shelter.findOne({ email });
    if (existingShelter) {
      return res.status(400).json({ message: "Shelter with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new shelter
    const fallbackCoordinates = [77.1025, 28.7041];

    const newShelter = new Shelter({
      shelterName,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      state,
      zipCode,
      description,
      registrationNumber,
      coordinates: {
        type: "Point",
        coordinates: fallbackCoordinates,
      },
      verificationStatus: "pending",
      isVerified: false,
    });

    await newShelter.save();

    // Generate token
    const token = createTokenForUser(newShelter);

    res.cookie("shelterToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Shelter registered successfully",
      shelter: {
        _id: newShelter._id,
        shelterName: newShelter.shelterName,
        email: newShelter.email,
        city: newShelter.city,
        isVerified: newShelter.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Error during shelter registration:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Shelter Login
const shelterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find shelter
    const shelter = await Shelter.findOne({ email });
    if (!shelter) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, shelter.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = createTokenForUser(shelter);

    res.cookie("shelterToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      shelter: {
        _id: shelter._id,
        shelterName: shelter.shelterName,
        email: shelter.email,
        city: shelter.city,
        isVerified: shelter.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Error during shelter login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Current Shelter Profile
const getShelterProfile = async (req, res) => {
  try {
    const shelterToken = req.cookies.shelterToken || req.headers.authorization?.split(" ")[1];
    
    if (!shelterToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = validateToken(shelterToken);
    const shelter = await Shelter.findById(decoded._id)
      .populate("reviews")
      .populate("posts");

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    res.status(200).json({
      message: "Shelter profile fetched successfully",
      shelter,
    });
  } catch (error) {
    console.error("Error fetching shelter profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Shelter Profile
const updateShelterProfile = async (req, res) => {
  try {
    const shelterId = req.user?._id;

    if (!shelterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      shelterName,
      description,
      story,
      phone,
      alternatePhone,
      address,
      city,
      state,
      zipCode,
      website,
      socialMedia,
      foundedYear,
      operatingHours,
      adoptionProcess,
      facilities,
      donationDetails,
    } = req.body;

    const updateData = {};
    if (shelterName) updateData.shelterName = shelterName;
    if (description) updateData.description = description;
    if (story) updateData.story = story;
    if (phone) updateData.phone = phone;
    if (alternatePhone) updateData.alternatePhone = alternatePhone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (zipCode) updateData.zipCode = zipCode;
    if (website) updateData.website = website;
    if (socialMedia) updateData.socialMedia = socialMedia;
    if (foundedYear) updateData.foundedYear = foundedYear;
    if (operatingHours) updateData.operatingHours = operatingHours;
    if (adoptionProcess) updateData.adoptionProcess = adoptionProcess;
    if (facilities) updateData.facilities = facilities;
    if (donationDetails) updateData.donationDetails = donationDetails;

    const updatedShelter = await Shelter.findByIdAndUpdate(shelterId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Shelter profile updated successfully",
      shelter: updatedShelter,
    });
  } catch (error) {
    console.error("Error updating shelter profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Shelter Logout
const shelterLogout = (req, res) => {
  try {
    res.clearCookie("shelterToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  shelterRegister,
  shelterLogin,
  getShelterProfile,
  updateShelterProfile,
  shelterLogout,
};
