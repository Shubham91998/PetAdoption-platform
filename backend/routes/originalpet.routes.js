const express = require("express");

const { addPet, getOriginalPet, deleteOriginalPet, finddetails } = require("../controllers/originalPet.controller");

const router = express.Router();

router.post("/addpet", addPet)
router.get("/getallpet", getOriginalPet)
router.get("/finddetails/:id", finddetails)
router.delete("/delete/:id", deleteOriginalPet)

module.exports = router;
