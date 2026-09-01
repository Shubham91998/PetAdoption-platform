const Pet = require("../models/pet.model.js");
const PetRequest = require("../models/petAdoption.model.js");
const {uploadOnCloudinary} = require("../middleware/cloudnary.js");
const { asyncHandler } = require("../middleware/asyncHandlar.js");

const getPet = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching pets: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const submitPetRequest = async (req, res) => {
  try {
    const { userId, petId, currentLocation, address, reasonForAdoption } = req.body;

    if (!userId || !petId || !reasonForAdoption) {
      return res.status(400).json({ message: "Missing required fields: userId, petId, or reasonForAdoption." });
    }

    if (!currentLocation && !address) {
      return res.status(400).json({ message: "Please provide either current location or address." });
    }

    const currentAddress = currentLocation || address;

    const newPetRequest = new PetRequest({
      userId,
      petId,
      currentLocation: currentAddress, 
      reasonForAdoption,
    });

    await newPetRequest.save();

    res.status(201).json({
      message: "Pet request submitted successfully!",
      data: newPetRequest,
    });
  } catch (error) {
    console.error("Error submitting pet request:", error);
    res.status(500).json({ message: "Failed to submit pet request." });
  }
};


const petUpload = asyncHandler(async (req, res) => {
  const { name, breed, age, type, category,userid } = req.body;
  const petImagePath = req.files?.image[0]?.path;
  console.log("Pet image path:", petImagePath);
  if (!petImagePath) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const image = await uploadOnCloudinary(petImagePath);
  console.log(image.url)
  if (!image) {
    return res.status(400).json({ message: "Failed to upload image." });
  }

  const newPet = new Pet({
    name,
    breed,
    age,
    type,
    category,
    image: image.url,
    userid:userid
  });

  try {
    const savedPet = await newPet.save();
    res.status(201).json({ message: "Pet created successfully", pet: savedPet });
  } catch (error) {
    console.error("Error saving pet:", error); 
    res.status(400).json({ message: error.message });
  }
  
});

const deletePet = async(req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getPet,
  petUpload,
  submitPetRequest,
  deletePet,
};