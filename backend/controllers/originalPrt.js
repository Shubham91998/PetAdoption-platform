const mongoose = require("mongoose")

const OriginalPet = require("../models/originalPet"); 
const User = require("../models/user"); 
const PetRequest = require("../models/petAdoption"); 

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

// find details with userId for verify and update
const finddetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const dummy = await PetRequest.find({userId: userId}).populate("petId")
    const pets = dummy.map(r=>r.petId)[0]
    console.log(pets)
    


    const petRequests = await PetRequest.find({ userId: userId }).populate("petId"); 

    res.json({ user, pets, petRequests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { addPet ,getOriginalPet, finddetails};