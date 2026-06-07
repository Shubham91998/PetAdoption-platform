const express = require("express");
const { getPet, petUpload, submitPetRequest, deletePet } = require("../controllers/pet");
const {
    getAllPetRequests,
    verifyPetRequest,
    rejectPetRequest,
    processStatusInformation,
    getUserPetRequest, 
} = require("../controllers/adopter");



const upload = require("../middleware/multer");

const router = express.Router();


router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pet-adoption-tan-six.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.status(200).json({});
    }
    next();
});
router.get("/api/pet-requests/:userId", getUserPetRequest);

router.get("/api/pet-requests", getAllPetRequests);

router.put("/pet-requests/:id/verify", verifyPetRequest);

router.put("/pet-requests/:id/reject", rejectPetRequest);

router.get("/allpets", getPet);

router.post("/petrequest", submitPetRequest);

router.put("/pet-requests/:id/update-status", processStatusInformation);

router.post("/petpost", upload.fields([{ name: "image", maxCount: 1 }]), petUpload);
router.delete("/deletepet/:id", deletePet)
module.exports = router;
