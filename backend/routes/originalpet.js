const express = require("express");


const {addPet, getOriginalPet, finddetails} = require("../controllers/originalPrt.js")

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
router.post("/addpet", addPet)
router.get("/getallpet", getOriginalPet)
router.get("/finddetails/:id", finddetails)

module.exports = router;
