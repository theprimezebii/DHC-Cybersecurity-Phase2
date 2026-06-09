const { verifyToken } = require('./utils');
function authMiddleware(req, res, next) {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).send('Access denied');
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
}
module.exports = authMiddleware;
