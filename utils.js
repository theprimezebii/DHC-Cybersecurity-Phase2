const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) return next();
  return res.status(403).json({ error: 'Invalid or missing API key' });
}
module.exports = { hashPassword, generateToken, verifyToken, apiKeyAuth };
