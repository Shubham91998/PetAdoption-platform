const express = require("express");
const {login, signup, nutrition} = require("../controllers/user");

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

router.post("/signup", signup);
router.post("/create", nutrition);
router.post("/login", login)

module.exports = router;
