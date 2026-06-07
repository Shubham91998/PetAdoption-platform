require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || '$uperman@1234';

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    userType: user.userType,
  };

  return jwt.sign(payload, secret, { expiresIn: '1d' });
}

function validateToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  createTokenForUser,
  validateToken,
};