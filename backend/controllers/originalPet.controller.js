const mongoose = require("mongoose");

const OriginalPet = require("../models/originalPet.model.js");
const User = require("../models/user.model.js");
const PetRequest = require("../models/petAdoption.model.js");

// add a new pet to the database
const addPet = async (req, res) => {
  const { name, breed, age, type, category, image, userid } = req.body;

  try {
    
    if (!name || !breed || !age || !type || !category || !image || !userid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const newPet = new OriginalPet({
      name,
      breed,
      age,
      type,
      category,
      image,
      userid : new mongoose.Types.ObjectId(userid),
    });

    await newPet.save();

    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getOriginalPet = async (req, res) => {
    try {
      const pets = await OriginalPet.find({});
      res.status(200).json(pets);
    } catch (error) {
      console.error("Error fetching pets: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const deleteOriginalPet = async (req, res) => {
  try {
    const pet = await OriginalPet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error("Error deleting pet: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// find details with userId for verify and update
const finddetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pets = await OriginalPet.find({ userid: userId }).lean();
    const petRequests = await PetRequest.find({ userId: userId })
      .populate({
        path: "petId",
        select: "name breed age type category image",
      })
      .lean();

    res.json({ user, pets, petRequests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { addPet, getOriginalPet, deleteOriginalPet, finddetails };