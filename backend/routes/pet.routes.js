const express = require("express");
const { getPet, petUpload, submitPetRequest, deletePet } = require("../controllers/pet.controller");
const {
    getAllPetRequests,
    verifyPetRequest,
    rejectPetRequest,
    processStatusInformation,
    getUserPetRequest,
    hideRequest,
    getDashboardStats,
} = require("../controllers/adopter.controller");

const upload = require("../middleware/multer");

const router = express.Router();
router.get("/api/pet-requests/:userId", getUserPetRequest);

router.get("/api/pet-requests", getAllPetRequests);

router.put("/pet-requests/:id/verify", verifyPetRequest);

router.put("/pet-requests/:id/reject", rejectPetRequest);

router.put("/pet-requests/:id/hide", hideRequest);

router.get("/allpets", getPet);

router.get("/api/dashboard-stats", getDashboardStats);

router.post("/petrequest", submitPetRequest);

router.put("/pet-requests/:id/update-status", processStatusInformation);

router.post("/petpost", upload.fields([{ name: "image", maxCount: 1 }]), petUpload);
router.delete("/deletepet/:id", deletePet)
module.exports = router;
