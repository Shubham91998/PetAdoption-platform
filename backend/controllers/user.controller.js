const User = require("../models/user.model");
const Nutrition = require("../models/nutrition.model");
const bcrypt = require("bcrypt");
const { createTokenForUser, validateToken } = require("../services/auth.service");
const { USER_TYPES } = require("../utils/constants");

const signup = async (req, res) => {
  try {
    const { fullname, address, phone, email, password, userType, secretKey } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (userType === USER_TYPES.ADMIN) {
      const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
      if (secretKey !== ADMIN_SECRET_KEY) {
        return res.status(400).json({ message: "Invalid admin secret key" });
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      fullname,
      address,
      phone,
      email,
      password: hashPassword,
      userType: userType || USER_TYPES.USER,
    });

    await createdUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        userType: createdUser.userType,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const nutrition = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingNutritionUser = await Nutrition.findOne({ email });

    if (existingNutritionUser) {
      return res
        .status(400)
        .json({ message: "Nutrition user already exists, please try another email!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdNutritionUser = new Nutrition({
      fullname,
      email,
      password: hashPassword,
    });

    await createdNutritionUser.save();
    res.status(201).json({
      message: "Nutrition user created successfully",
      user: {
        _id: createdNutritionUser._id,
        fullname: createdNutritionUser.fullname,
        email: createdNutritionUser.email,
      },
    });
  } catch (error) {
    console.error("Error during nutrition user creation:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, userType, secretKey } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (userType === USER_TYPES.ADMIN) {
      const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
      if (secretKey !== ADMIN_SECRET_KEY) {
        return res.status(400).json({ message: "Invalid admin secret key" });
      }
    }

    const token = createTokenForUser(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        userType: user.userType,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token is missing." });
  }

  try {
    req.user = validateToken(token);
    return next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Invalid token." });
  }
};

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      res.locals.user = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {
      console.error("Failed to validate token:", error);
      req.user = null;
      res.locals.user = null;
    }

    return next();
  };
}

module.exports = {
  signup,
  login,
  nutrition,
  isAuthentication,
  checkForAuthenticationCookie,
};